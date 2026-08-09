/**
 * cards.js
 * Handles prototype data injection and layout rendering.
 */

document.addEventListener('DOMContentLoaded', async () => {
    
    // Find the responsive grid container
    const gridContainer = document.getElementById('grid-prototipos');
    if (!gridContainer) return;

    // 1. Fetch data from API
    const response = await api.getPrototipos();

    if (!response.ok) {
        gridContainer.innerHTML = `<p class="text-center text-muted">Error al cargar el catálogo de prototipos.</p>`;
        return;
    }

    const prototipos = response.data;

    if (prototipos.length === 0) {
        gridContainer.innerHTML = `<p class="text-center text-muted">Aún no hay prototipos disponibles.</p>`;
        return;
    }

    // 2. Render HTML
    gridContainer.innerHTML = prototipos.map(proto => {
        
        // Split transactions (Highest priority)
        const transactions = proto.tipoTransaccion ? proto.tipoTransaccion.split(',').map(t => t.trim()) : [];
        
        // Extract secondary tags
        const catTag = proto.etiquetas?.find(e => e.tipo === 'categoria')?.valor;
        const carTag = proto.etiquetas?.find(e => e.tipo === 'carrera')?.valor;
        const divTag = proto.etiquetas?.find(e => e.tipo === 'division')?.valor;

        // Build Tag HTML based on priority
        let tagsHTML = '';
        
        // Priority 1: Transactions
        transactions.forEach(t => {
            let modifier = 'badge-tag--loan';
            if (t === 'Donación') modifier = 'badge-tag--donation';
            if (t === 'Intercambio') modifier = 'badge-tag--exchange';
            tagsHTML += `<span class="badge-tag ${modifier}">${t}</span>`;
        });

        // Priority 2, 3, 4: Category, Career, Division
        if (catTag) tagsHTML += `<span class="badge-tag badge-tag--category">${catTag}</span>`;
        if (carTag) tagsHTML += `<span class="badge-tag badge-tag--career">${carTag}</span>`;
        if (divTag) tagsHTML += `<span class="badge-tag badge-tag--division">${divTag}</span>`;

        // Safeties
        const imgSrc = proto.urlImagen || '../assets/img/placeholder.png';
        const score = proto.reputacion ? Number(proto.reputacion).toFixed(1) : '5.0';

        // HTML Injection
        // 'd-flex justify-content-center' centers the fixed-width card inside the Bootstrap column
        return `
            <div class="col-12 col-md-6 col-xl-4 d-flex justify-content-center mb-4">
                <article class="prototype-card" data-id="${proto.id}">
                    
                    <div class="prototype-card__media">
                        <img src="${imgSrc}" alt="${proto.titulo}" class="prototype-card__img" />
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
            </div>
        `;
    }).join('');
});