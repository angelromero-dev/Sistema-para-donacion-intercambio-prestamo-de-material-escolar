/**
 * cards.js
 * UI Component for generating prototype cards with tag hierarchy logic.
 */

const DashboardCardsUI = {

    /**
     * Generates the HTML string for a single prototype card.
     * @param {Object} prototypeData - JSON item from backend.
     * @returns {string} Formatted HTML representation of the card.
     */
    createCardHTML(prototypeData) {
        const { id, titulo, descripcionCorta, urlImagen, tipoTransaccion, matriculaOferente, reputacion, etiquetas } = prototypeData;

        // 1. Process mandatory transaction types (Always displayed)
        const transactions = tipoTransaccion ? tipoTransaccion.split(',').map(t => t.trim()) : ['Préstamo'];
        const transactionBadgesHTML = transactions.map(t => {
            let modifier = 'badge-tag--loan';
            if (t === 'Donación') modifier = 'badge-tag--donation';
            if (t === 'Intercambio') modifier = 'badge-tag--exchange';
            return `<span class="badge-tag ${modifier}">${t}</span>`;
        }).join('');

        // 2. Extract secondary tags according to strict hierarchy
        const categoryTag = etiquetas?.find(e => e.tipo === 'categoria')?.valor;
        const careerTag = etiquetas?.find(e => e.tipo === 'carrera')?.valor;
        const divisionTag = etiquetas?.find(e => e.tipo === 'division')?.valor;

        let secondaryBadgesHTML = '';
        if (categoryTag) {
            secondaryBadgesHTML += `<span class="badge-tag badge-tag--category">${categoryTag}</span>`;
        }
        if (careerTag) {
            secondaryBadgesHTML += `<span class="badge-tag badge-tag--career">${careerTag}</span>`;
        }
        if (divisionTag) {
            secondaryBadgesHTML += `<span class="badge-tag badge-tag--division">${divisionTag}</span>`;
        }

        // 3. Assemble final card template
        return `
            <div class="col-12 col-md-6 col-lg-4">
                <article class="prototype-card" data-id="${id}" onclick="abrirModalDetalle(${id})">
                    <div class="prototype-card__media">
                        <img 
                            src="${urlImagen}" 
                            alt="${titulo}" 
                            class="prototype-card__img" 
                            loading="lazy"
                            onerror="this.src='https://images.unsplash.com/photo-1581092160607-ee22621dd758';"
                        />
                        <div class="prototype-card__badges">
                            ${transactionBadgesHTML}
                        </div>
                    </div>

                    <div class="prototype-card__body">
                        <div class="prototype-card__tags">
                            ${secondaryBadgesHTML}
                        </div>

                        <h3 class="prototype-card__title">${titulo}</h3>
                        <p class="prototype-card__description">${descripcionCorta}</p>

                        <div class="prototype-card__footer">
                            <span class="prototype-card__matricula">${matriculaOferente}</span>
                            <div class="prototype-card__rating">
                                <i class="bx bxs-star prototype-card__star-icon"></i>
                                <span class="prototype-card__score">${Number(reputacion || 5.0).toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        `;
    },

    /**
     * Renders array of prototype cards into the grid container.
     * @param {Array} prototypesList 
     * @param {string} containerId 
     */
    renderGrid(prototypesList, containerId = 'grid-prototipos') {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (!prototypesList || prototypesList.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="text-muted fs-5">No se encontraron prototipos registrados.</p>
                </div>`;
            return;
        }

        container.innerHTML = prototypesList.map(proto => this.createCardHTML(proto)).join('');
    }
};