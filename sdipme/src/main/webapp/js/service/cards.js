/**
 * cards.js
 * Motor del catálogo: renderizado de tarjetas, búsqueda en tiempo real, 
 * filtrado por etiquetas dinámicas y control de visibilidad.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log(">>> [UI CARDS] DOM Cargado. Inicializando catálogo...");

    const gridContainer = document.getElementById('grid-prototipos');
    const searchInput = document.getElementById('searchInput');
    const filterContainer = document.getElementById('filterContainer');

    if (!gridContainer) return;

    if (typeof api.getPrototipos !== 'function') {
        gridContainer.innerHTML = `<p class="text-center text-danger w-100 py-4">Error de caché. Presiona <b>Ctrl + F5</b>.</p>`;
        return;
    }

    let allPrototipos = [];
    let pendientes = [];
    let activeFilters = new Set(['all']);

    // Mapeo estático para calcular la división en base a la carrera
    const divisionMap = {
        'DACEA': ['Administración', 'Contaduría', 'Negocios', 'Capital Humano', 'Desarrollo de Negocios'],
        'DATID': ['Software', 'Redes', 'Diseño Digital', 'Sistemas', 'Infraestructura'],
        'DAMI': ['Mecatrónica', 'Mantenimiento', 'Industrial', 'Nanotecnología'],
        'DATEFI': ['Terapia Física', 'Rehabilitación']
    };

    function determinarDivision(nombreCarrera) {
        if (!nombreCarrera) return null;
        for (const [division, carreras] of Object.entries(divisionMap)) {
            if (carreras.some(c => nombreCarrera.toLowerCase().includes(c.toLowerCase()))) {
                return division;
            }
        }
        return 'OTRA'; 
    }

    const initDashboard = async () => {
        try {
            const [resPrototipos, resPendientes, resPerfil] = await Promise.all([
                api.getPrototipos(),
                api.getMisPendientes(),
                api.obtenerPerfil()
            ]);

            if (!resPrototipos.ok) {
                gridContainer.innerHTML = `<p class="text-center text-muted w-100 py-4">No se pudo cargar el catálogo de prototipos.</p>`;
                return;
            }

            pendientes = resPendientes.ok && Array.isArray(resPendientes.data) ? resPendientes.data : [];
            const miMatricula = resPerfil.ok && resPerfil.data ? resPerfil.data.matricula : null;

            // 1. Filtrado base de seguridad (Ocultar propios y cuentas suspendidas/bloqueadas)
            const prototiposValidos = resPrototipos.data.filter(proto => {
                const matriculaOferente = proto.matriculaOferente || proto.matricula || '';
                const esMio = miMatricula && matriculaOferente === miMatricula;
                
                // Si el backend expone el estado del oferente, lo evaluamos. (Se recomienda filtrar en SQL).
                const estado = (proto.estadoOferente || proto.estadoCuentaOferente || 'ACTIVO').toUpperCase();
                const estaBloqueado = estado === 'SUSPENDIDO' || estado === 'BLOQUEADO';
                
                return !esMio && !estaBloqueado;
            });

            if (prototiposValidos.length === 0) {
                gridContainer.innerHTML = `
                    <div class="w-100 text-center py-5" style="grid-column: 1 / -1;">
                        <i class="bx bx-package" style="font-size: 4rem; color: var(--color-text-hint);"></i>
                        <p class="text-muted mt-2 fw-bold">No hay prototipos disponibles por el momento.</p>
                    </div>`;
                return;
            }

            // 2. Preparar motor de filtros añadiendo división calculada
            allPrototipos = prototiposValidos.map(proto => {
                const carTag = proto.etiquetas?.find(e => e.tipo === 'carrera')?.valor || proto.carrera || proto.nombreCarrera;
                const divTag = proto.etiquetas?.find(e => e.tipo === 'division')?.valor || determinarDivision(carTag);
                const catTag = proto.etiquetas?.find(e => e.tipo === 'categoria')?.valor || proto.categoria;
                
                return {
                    ...proto,
                    _carrera: carTag,
                    _division: divTag,
                    _categoria: catTag
                };
            });

            construirBotonesFiltro();
            aplicarFiltrosTiempoReal();

        } catch (error) {
            console.error(">>> [JS ERROR] Fallo crítico al procesar tarjetas:", error);
            gridContainer.innerHTML = `<p class="text-center text-danger w-100 py-4">Error interno al cargar la vista.</p>`;
        }
    };

    // Construcción de la botonera dinámica
    const construirBotonesFiltro = () => {
        if (!filterContainer) return;

        const etiquetasUnicas = new Set();

        allPrototipos.forEach(p => {
            // Transacciones
            if (p.tipoTransaccion) {
                p.tipoTransaccion.split(',').forEach(t => etiquetasUnicas.add(t.trim()));
            } else if (p.tipo) {
                etiquetasUnicas.add(p.tipo);
            }
            
            // Resto de etiquetas
            if (p._categoria) etiquetasUnicas.add(p._categoria);
            if (p._carrera) etiquetasUnicas.add(p._carrera);
            if (p._division && p._division !== 'OTRA') etiquetasUnicas.add(p._division);
        });

        filterContainer.innerHTML = `<button class="smart-filter__btn smart-filter__btn--active" data-tag="all">Todos</button>`;
        
        Array.from(etiquetasUnicas).sort().forEach(tag => {
            if (tag && tag.trim() !== '') {
                const btn = document.createElement('button');
                btn.className = 'smart-filter__btn';
                btn.setAttribute('data-tag', tag);
                btn.innerText = tag;
                filterContainer.appendChild(btn);
            }
        });

        filterContainer.querySelectorAll('.smart-filter__btn').forEach(btn => {
            btn.addEventListener('click', (e) => manejarSeleccionFiltro(e.target));
        });
    };

    const manejarSeleccionFiltro = (btn) => {
        const tag = btn.getAttribute('data-tag');

        if (tag === 'all') {
            activeFilters.clear();
            activeFilters.add('all');
        } else {
            activeFilters.delete('all');
            
            if (activeFilters.has(tag)) {
                activeFilters.delete(tag);
            } else {
                activeFilters.add(tag);
            }

            if (activeFilters.size === 0) {
                activeFilters.add('all');
            }
        }

        document.querySelectorAll('.smart-filter__btn').forEach(b => {
            b.classList.toggle('smart-filter__btn--active', activeFilters.has(b.getAttribute('data-tag')));
        });

        aplicarFiltrosTiempoReal();
    };

    // Búsqueda inteligente
    const aplicarFiltrosTiempoReal = () => {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

        const filtrados = allPrototipos.filter(p => {
            // A. Evaluación de texto
            const titulo = (p.titulo || '').toLowerCase();
            const matricula = (p.matriculaOferente || p.matricula || '').toLowerCase();
            const pasaBusquedaTexto = titulo.includes(query) || matricula.includes(query);

            // B. Evaluación de etiquetas seleccionadas
            let pasaEtiquetas = activeFilters.has('all');
            if (!pasaEtiquetas) {
                const transaccionesArray = p.tipoTransaccion ? p.tipoTransaccion.split(',').map(t=>t.trim()) : [p.tipo];
                const etiquetasPrototipo = [...transaccionesArray, p._categoria, p._carrera, p._division].filter(Boolean);
                
                // Muestra la tarjeta si incluye TODAS las etiquetas activas (Filtro restrictivo 'AND')
                // Cambia 'every' por 'some' si quieres que el filtro sea permisivo ('OR')
                pasaEtiquetas = Array.from(activeFilters).some(filtroRequerido => etiquetasPrototipo.includes(filtroRequerido));
            }

            return pasaBusquedaTexto && pasaEtiquetas;
        });

        renderizarTarjetas(filtrados);
    };

    const renderizarTarjetas = (listaPrototipos) => {
        gridContainer.innerHTML = '';

        if (listaPrototipos.length === 0) {
            gridContainer.innerHTML = `
                <div class="w-100 text-center py-5" style="grid-column: 1 / -1;">
                    <i class="bx bx-search-alt" style="font-size: 4rem; color: var(--color-text-hint);"></i>
                    <p class="text-muted mt-2 fw-bold">No se encontraron resultados para los filtros seleccionados.</p>
                </div>
            `;
            return;
        }

        const html = listaPrototipos.map((proto) => {
            // Desglose de transacciones (Préstamo, Intercambio, Donación)
            const transactions = proto.tipoTransaccion ? proto.tipoTransaccion.split(',').map(t => t.trim()) : (proto.tipo ? [proto.tipo] : ['Préstamo']);
            const secondaryTags = [];
            
            if (proto._categoria) secondaryTags.push({ tipo: 'badge-tag--category', valor: proto._categoria });
            if (proto._carrera) secondaryTags.push({ tipo: 'badge-tag--career', valor: proto._carrera });
            if (proto._division && proto._division !== 'OTRA') secondaryTags.push({ tipo: 'badge-tag--division', valor: proto._division });

            const MAX_TOTAL_BADGES = 3;
            const maxSecondaryAllowed = Math.max(0, MAX_TOTAL_BADGES - transactions.length);
            let tagsHTML = '';

            transactions.forEach(t => {
                let modifier = t === 'Donación' ? 'badge-tag--donation' : (t === 'Intercambio' ? 'badge-tag--exchange' : 'badge-tag--loan');
                tagsHTML += `<span class="badge-tag ${modifier}">${t}</span>`;
            });

            const visibleSecondary = secondaryTags.slice(0, maxSecondaryAllowed);
            visibleSecondary.forEach(st => { tagsHTML += `<span class="badge-tag ${st.tipo}">${st.valor}</span>`; });
            
            if (secondaryTags.length > maxSecondaryAllowed) { 
                tagsHTML += `<span class="badge-tag badge-tag--more">+Otros...</span>`; 
            }

            const imgSrc = proto.urlImagen || proto.imagen_url || '../assets/svg/logo.svg';
            const score = proto.reputacion ? Number(proto.reputacion).toFixed(1) : '5.0';

            const MAX_DESC_LENGTH = 85;
            let descTexto = proto.descripcionCorta || proto.descripcion || '';
            if (descTexto.length > MAX_DESC_LENGTH && !descTexto.endsWith('...')) {
                descTexto = descTexto.substring(0, MAX_DESC_LENGTH).trim() + '...';
            }

            const currentId = proto.id || proto.idPrototipo;
            const isPending = pendientes.includes(currentId);
            const pendingClass = isPending ? 'is-pending' : '';
            const overlayHTML = isPending ? `<div class="prototype-card__overlay"><i class='bx bx-cog bx-spin'></i><span>En espera</span></div>` : '';

            return `
                <article class="prototype-card ${pendingClass} animate__animated animate__fadeIn" data-id="${currentId}">
                    ${overlayHTML}
                    <div class="prototype-card__media">
                        <img src="${imgSrc}" alt="${proto.titulo}" class="prototype-card__img" loading="lazy" />
                    </div>
                    <div class="prototype-card__body">
                        <div class="prototype-card__tags">${tagsHTML}</div>
                        <h3 class="prototype-card__title">${proto.titulo}</h3>
                        <p class="prototype-card__description">${descTexto}</p>
                        <div class="prototype-card__footer">
                            <span class="prototype-card__matricula">${proto.matriculaOferente || proto.matricula || ''}</span>
                            <div class="prototype-card__rating">
                                <i class="bx bxs-star prototype-card__star-icon"></i>
                                <span class="prototype-card__score">${score}</span>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        gridContainer.innerHTML = html;
    };

    if (searchInput) {
        searchInput.addEventListener('input', aplicarFiltrosTiempoReal);
    }

    initDashboard();
});