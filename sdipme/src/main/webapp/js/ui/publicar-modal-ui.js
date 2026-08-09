/**
 * publicar-modal-ui.js
 * UI Controller for Prototype Publishing Modal with Real-time Card Live Preview.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log(">>> [UI PUBLICAR] Inicializando controlador del modal de publicación...");

    // DOM Form Elements
    const form = document.getElementById('formPublicarPrototipo');
    if (!form) return;

    const inputTitulo = document.getElementById('pubTitulo');
    const inputDescCorta = document.getElementById('pubDescCorta');
    const inputDescLarga = document.getElementById('pubDescLarga');
    const inputUrlImagen = document.getElementById('pubUrlImagen');
    const selectCategoria = document.getElementById('pubCategoria');
    const selectCarrera = document.getElementById('pubCarrera');
    const checkboxesTransaccion = document.querySelectorAll('.cb-transaccion');

    // Counters
    const counterTitulo = document.getElementById('counterTitulo');
    const counterDescCorta = document.getElementById('counterDescCorta');
    const counterDescLarga = document.getElementById('counterDescLarga');

    // Live Preview Elements
    const previewImg = document.getElementById('prevImg');
    const previewTitle = document.getElementById('prevTitle');
    const previewDesc = document.getElementById('prevDesc');
    const previewTags = document.getElementById('prevTags');

    // Fallback Image
    const DEFAULT_IMG = '../assets/images/logo-grey.png';

    /**
     * Updates character counter text indicators
     */
    function updateCounters() {
        if (counterTitulo && inputTitulo) {
            counterTitulo.innerText = `${inputTitulo.value.length}/100`;
        }
        if (counterDescCorta && inputDescCorta) {
            counterDescCorta.innerText = `${inputDescCorta.value.length}/100`;
        }
        if (counterDescLarga && inputDescLarga) {
            counterDescLarga.innerText = `${inputDescLarga.value.length}/256`;
        }
    }

    /**
     * Updates the Live Preview Card dynamically
     */
    function updateLivePreview() {
        // 1. Title
        if (previewTitle) {
            previewTitle.innerText = inputTitulo.value.trim() || 'Título del Prototipo';
        }

        // 2. Short Description
        if (previewDesc) {
            previewDesc.innerText = inputDescCorta.value.trim() || 'Descripción corta del prototipo que aparecerá en la tarjeta del catálogo.';
        }

        // 3. Image URL with fallback check
        if (previewImg) {
            const url = inputUrlImagen.value.trim();
            previewImg.src = url !== '' ? url : DEFAULT_IMG;
            previewImg.onerror = () => { previewImg.src = DEFAULT_IMG; };
        }

        // 4. Tags Assembly
        if (previewTags) {
            let tagsHTML = '';

            // Selected Transactions
            checkboxesTransaccion.forEach(cb => {
                if (cb.checked) {
                    let modifier = 'badge-tag--loan';
                    if (cb.value === 'Donación') modifier = 'badge-tag--donation';
                    if (cb.value === 'Intercambio') modifier = 'badge-tag--exchange';
                    tagsHTML += `<span class="badge-tag ${modifier}">${cb.value}</span>`;
                }
            });

            // Selected Category
            if (selectCategoria && selectCategoria.value !== '') {
                const catText = selectCategoria.options[selectCategoria.selectedIndex].text;
                tagsHTML += `<span class="badge-tag badge-tag--category">${catText}</span>`;
            }

            // Selected Career
            if (selectCarrera && selectCarrera.value !== '') {
                const carText = selectCarrera.options[selectCarrera.selectedIndex].text;
                tagsHTML += `<span class="badge-tag badge-tag--career">${carText}</span>`;
            }

            previewTags.innerHTML = tagsHTML !== '' ? tagsHTML : '<span class="badge-tag badge-tag--loan">Préstamo</span><span class="badge-tag badge-tag--category">General</span>';
        }
    }

    // Attach Event Listeners for Live Binding
    [inputTitulo, inputDescCorta, inputDescLarga, inputUrlImagen].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                updateCounters();
                updateLivePreview();
            });
        }
    });

    [selectCategoria, selectCarrera].forEach(select => {
        if (select) {
            select.addEventListener('change', updateLivePreview);
        }
    });

    checkboxesTransaccion.forEach(cb => {
        cb.addEventListener('change', updateLivePreview);
    });

    // Form Submission Validation before API trigger
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Ensure at least one transaction type is selected
        const selectedTransactions = Array.from(checkboxesTransaccion).filter(cb => cb.checked);
        if (selectedTransactions.length === 0) {
            alert("Debes seleccionar al menos un tipo de transacción (Préstamo, Intercambio o Donación).");
            return;
        }

        console.log(">>> [UI PUBLICAR] Formulario validado. Listo para enviar al Backend.");
        alert("¡Prototipo listo para publicarse! (Conexión API en el siguiente paso).");
        
        // Hide Modal
        const modalEl = document.getElementById('modalPublicarPrototipo');
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        modalInstance?.hide();
    });
});