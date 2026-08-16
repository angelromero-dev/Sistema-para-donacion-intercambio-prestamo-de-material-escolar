/**
 * cards.js
 * Motor del catálogo: renderizado de tarjetas, búsqueda en tiempo real, 
 * filtrado por etiquetas dinámicas de BD y control de visibilidad.
 */

document.addEventListener('DOMContentLoaded', () => {
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

    const initDashboard = async () => {
        try {
            // Peticiones en paralelo incluyendo los catálogos
            const [resPrototipos, resPendientes, resPerfil, resCatalogos] = await Promise.all([
                api.getPrototipos(),
                api.getMisPendientes(),
                api.obtenerPerfil(),
                api.getCatalogos()
            ]);

            pendientes = resPendientes.ok && Array.isArray(resPendientes.data) ? resPendientes.data : [];
            const miMatricula = resPerfil.ok && resPerfil.data ? resPerfil.data.matricula : null;
            
            // Construir los botones inmediatamente consultando la BD, haya prototipos o no.
            const catalogosData = resCatalogos.ok ? resCatalogos.data : null;
            construirBotonesFiltro(catalogosData);

            if (!resPrototipos.ok || !Array.isArray(resPrototipos.data)) {
                mostrarMensajeVacio("Error al cargar el catálogo de prototipos.");
                return;
            }

            // Filtrado base: ocultar prototipos del usuario activo y de cuentas bloqueadas
            const prototiposValidos = resPrototipos.data.filter(proto => {
                const matriculaOferente = proto.matriculaOferente || proto.matricula || '';
                const esMio = miMatricula && matriculaOferente === miMatricula;
                const estado = (proto.estadoOferente || proto.estadoCuentaOferente || 'ACTIVO').toUpperCase();
                const estaBloqueado = estado === 'SUSPENDIDO' || estado === 'BLOQUEADO';
                
                return !esMio && !estaBloqueado;
            });

            allPrototipos = prototiposValidos.map(proto => {
                const carTag = proto.etiquetas?.find(e => e.tipo === 'carrera')?.valor || proto.carrera || proto.nombreCarrera;
                const divTag = proto.etiquetas?.find(e => e.tipo === 'division')?.valor || proto.division;
                const catTag = proto.etiquetas?.find(e => e.tipo === 'categoria')?.valor || proto.categoria;
                
                return {
                    ...proto,
                    _carrera: carTag,
                    _division: divTag,
                    _categoria: catTag
                };
            });

            aplicarFiltrosTiempoReal();

        } catch (error) {
            console.error(">>> [JS ERROR] Fallo crítico al procesar vista:", error);
            mostrarMensajeVacio("Error interno al cargar la vista.");
        }
    };

    const construirBotonesFiltro = (catalogos) => {
        if (!filterContainer) return;

        filterContainer.innerHTML = `<button class="smart-filter__btn smart-filter__btn--active" data-tag="all">Todos</button>`;
        
        // Transacciones estáticas
        const transacciones = ['Préstamo', 'Intercambio', 'Donación'];
        transacciones.forEach(t => agregarBoton(t));

        // Etiquetas dinámicas de la base de datos
        if (catalogos) {
            if (catalogos.divisiones) catalogos.divisiones.forEach(d => agregarBoton(d.nombre));
            if (catalogos.carreras) catalogos.carreras.forEach(c => agregarBoton(c.nombre));
            if (catalogos.categorias) catalogos.categorias.forEach(c => agregarBoton(c.nombre));
        }

        filterContainer.querySelectorAll('.smart-filter__btn').forEach(btn => {
            btn.addEventListener('click', (e) => manejarSeleccionFiltro(e.target));
        });
    };

    const agregarBoton = (texto) => {
        if (!texto || texto.trim() === '') return;
        const btn = document.createElement('button');
        btn.className = 'smart-filter__btn';
        btn.setAttribute('data-tag', texto);
        btn.innerText = texto;
        filterContainer.appendChild(btn);
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

    const aplicarFiltrosTiempoReal = () => {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

        const filtrados = allPrototipos.filter(p => {
            const titulo = (p.titulo || '').toLowerCase();
            const matricula = (p.matriculaOferente || p.matricula || '').toLowerCase();
            const pasaBusquedaTexto = titulo.includes(query) || matricula.includes(query);

            let pasaEtiquetas = activeFilters.has('all');
            if (!pasaEtiquetas) {
                const transaccionesArray = p.tipoTransaccion ? p.tipoTransaccion.split(',').map(t=>t.trim()) : [p.tipo];
                const etiquetasPrototipo = [...transaccionesArray, p._categoria, p._carrera, p._division].filter(Boolean);
                
                pasaEtiquetas = Array.from(activeFilters).some(filtroRequerido => etiquetasPrototipo.includes(filtroRequerido));
            }

            return pasaBusquedaTexto && pasaEtiquetas;
        });

        renderizarTarjetas(filtrados);
    };

    const renderizarTarjetas = (listaPrototipos) => {
        gridContainer.innerHTML = '';

        if (listaPrototipos.length === 0) {
            mostrarMensajeVacio("No se encontraron resultados para los filtros seleccionados.");
            return;
        }

        const html = listaPrototipos.map((proto) => {
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

            const imgSrc = proto.urlImagen || proto.imagen_url || '../assets/images/NoImage.png';
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
                <article class="prototype-card ${pendingClass} animate__animated animate__fadeIn" 
                         data-id="${currentId}"
                         data-matricula="${proto.matriculaOferente || proto.matricula || ''}"
                         data-carrera="${proto._carrera || ''}"
                         data-foto="${proto.fotoPerfil || proto.foto_perfil || ''}"
                         data-reputacion="${score}">
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

    const mostrarMensajeVacio = (mensaje) => {
        gridContainer.innerHTML = `
            <div class="w-100 text-center py-5" style="grid-column: 1 / -1;">
                <i class="bx bx-search-alt" style="font-size: 4rem; color: var(--color-text-hint);"></i>
                <p class="text-muted mt-2 fw-bold">${mensaje}</p>
            </div>
        `;
    };

    if (searchInput) {
        searchInput.addEventListener('input', aplicarFiltrosTiempoReal);
    }

    initDashboard();
});