/**
 * cards.js
 * Handles prototype data injection and layout rendering.
 */

document.addEventListener('DOMContentLoaded', async () => {
    
    // Target the layout grid container
    const gridContainer = document.getElementById('grid-prototipos');
    if (!gridContainer) return;

    // Fetch data using central API client
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

    // Build card HTML elements
    gridContainer.innerHTML = prototipos.map(proto => {
        
        // Process transaction types (highest display priority)
        const transactions = proto.tipoTransaccion ? proto.tipoTransaccion.split(',').map(t => t.trim()) : ['Préstamo'];
        
        // Extract tags from payload
        const catTag = proto.etiquetas?.find(e => e.tipo === 'categoria')?.valor;
        const carTag = proto.etiquetas?.find(e => e.tipo === 'carrera')?.valor;
        const divTag = proto.etiquetas?.find(e => e.tipo === 'division')?.valor;

        // Priority-based tags assembly
        let tagsHTML = '';
        
        transactions.forEach(t => {
            let modifier = 'badge-tag--loan';
            if (t === 'Donación') modifier = 'badge-tag--donation';
            if (t === 'Intercambio') modifier = 'badge-tag--exchange';
            tagsHTML += `<span class="badge-tag ${modifier}">${t}</span>`;
        });

        if (catTag) tagsHTML += `<span class="badge-tag badge-tag--category">${catTag}</span>`;
        if (carTag) tagsHTML += `<span class="badge-tag badge-tag--career">${carTag}</span>`;
        if (divTag) tagsHTML += `<span class="badge-tag badge-tag--division">${divTag}</span>`;

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
});