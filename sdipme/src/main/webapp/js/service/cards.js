/**
 * cards.js
 * Service module responsible for prototype card rendering with strict tag limit.
 */

document.addEventListener('DOMContentLoaded', async () => {
    console.log(">>> [UI CARDS] DOM Cargado. Inicializando módulo de tarjetas...");
    
    const gridContainer = document.getElementById('grid-prototipos');
    if (!gridContainer) {
        console.error(">>> [UI CARDS FATAL] Contenedor '#grid-prototipos' no encontrado.");
        return;
    }

    if (typeof api.getPrototipos !== 'function') {
        console.error(">>> [UI CARDS FATAL] api.getPrototipos no disponible.");
        gridContainer.innerHTML = `<p class="text-center text-danger w-100 py-4">Error de caché: Tu navegador no actualizó el JS. Presiona <b>Ctrl + F5</b>.</p>`;
        return;
    }

    const response = await api.getPrototipos();

    if (!response.ok) {
        gridContainer.innerHTML = `<p class="text-center text-muted w-100 py-4">No se pudo cargar el catálogo de prototipos.</p>`;
        return;
    }

    const prototipos = response.data;

    if (!prototipos || prototipos.length === 0) {
        gridContainer.innerHTML = `<p class="text-center text-muted w-100 py-4">No hay prototipos disponibles por el momento.</p>`;
        return;
    }

    gridContainer.innerHTML = prototipos.map((proto) => {
        const transactions = proto.tipoTransaccion ? proto.tipoTransaccion.split(',').map(t => t.trim()) : ['Préstamo'];
        
        const secondaryTags = [];
        const catTag = proto.etiquetas?.find(e => e.tipo === 'categoria')?.valor;
        const carTag = proto.etiquetas?.find(e => e.tipo === 'carrera')?.valor;
        const divTag = proto.etiquetas?.find(e => e.tipo === 'division')?.valor;

        if (catTag) secondaryTags.push({ tipo: 'badge-tag--category', valor: catTag });
        if (carTag) secondaryTags.push({ tipo: 'badge-tag--career', valor: carTag });
        if (divTag) secondaryTags.push({ tipo: 'badge-tag--division', valor: divTag });

        const MAX_TOTAL_BADGES = 3;
        const maxSecondaryAllowed = Math.max(0, MAX_TOTAL_BADGES - transactions.length);
        
        let tagsHTML = '';

        transactions.forEach(t => {
            let modifier = 'badge-tag--loan';
            if (t === 'Donación') modifier = 'badge-tag--donation';
            if (t === 'Intercambio') modifier = 'badge-tag--exchange';
            tagsHTML += `<span class="badge-tag ${modifier}">${t}</span>`;
        });

        const visibleSecondary = secondaryTags.slice(0, maxSecondaryAllowed);
        visibleSecondary.forEach(st => {
            tagsHTML += `<span class="badge-tag ${st.tipo}">${st.valor}</span>`;
        });

        if (secondaryTags.length > maxSecondaryAllowed) {
            tagsHTML += `<span class="badge-tag badge-tag--more">+Otros...</span>`;
        }

        const imgSrc = proto.urlImagen || '../assets/svg/logo.svg';
        const score = proto.reputacion ? Number(proto.reputacion).toFixed(1) : '5.0';

        return `
            <article class="prototype-card" data-id="${proto.id}">
                <div class="prototype-card__media">
                    <img src="${imgSrc}" alt="${proto.titulo}" class="prototype-card__img" loading="lazy" />
                </div>
                
                <div class="prototype-card__body">
                    <div class="prototype-card__tags">
                        ${tagsHTML}
                    </div>
                    
                    <h3 class="prototype-card__title">${proto.titulo}</h3>
                    <p class="prototype-card__description">${proto.descripcionCorta}</p>
                    
                    <div class="prototype-card__footer">
                        <span class="prototype-card__matricula">${proto.matriculaOferente}</span>
                        <div class="prototype-card__rating">
                            <i class="bx bxs-star prototype-card__star-icon"></i>
                            <span class="prototype-card__score">${score}</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }).join('');
    
    console.log(">>> [UI CARDS OK] Renderizado de tarjetas completado sin recortes.");
});