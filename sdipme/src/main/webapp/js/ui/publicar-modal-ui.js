/**
 * publicar-modal-ui.js
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log(">>> [UI PUBLICAR] Controlador inicializado.");

    const form = document.getElementById('formPublicarPrototipo');
    if (!form) return;

    // Inputs
    const inputTitulo = document.getElementById('pubTitulo');
    const inputDescCorta = document.getElementById('pubDescCorta');
    const inputDescLarga = document.getElementById('pubDescLarga');
    const selectCategoria = document.getElementById('pubCategoria');
    const selectCarrera = document.getElementById('pubCarrera');
    const checkboxesTransaccion = document.querySelectorAll('.cb-transaccion');
    
    // File Drag & Drop Elements
    const dropZone = document.getElementById('dragDropZone');
    const fileInput = document.getElementById('pubImagenArchivo');
    const dragDropText = document.getElementById('dragDropText');

    // Counters & Live Preview
    const counterTitulo = document.getElementById('counterTitulo');
    const counterDescCorta = document.getElementById('counterDescCorta');
    const counterDescLarga = document.getElementById('counterDescLarga');
    const previewImg = document.getElementById('prevImg');
    const previewTitle = document.getElementById('prevTitle');
    const previewDesc = document.getElementById('prevDesc');
    const previewTags = document.getElementById('prevTags');
    
    const previewMatricula = document.getElementById('prevMatricula');
    const previewScore = document.getElementById('prevScore');

    const DEFAULT_IMG = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758';
    let selectedImageFile = null;

    function showValidationToast(message, type = 'error') {
        let toastEl = document.getElementById('actionToast');
        
        if (!toastEl) {
            document.body.insertAdjacentHTML('beforeend', `
                <div class="toast-alert" id="actionToast">
                    <i id="toastIcon" class='bx'></i>
                    <span id="toastMessage"></span>
                </div>
            `);
            toastEl = document.getElementById('actionToast');
        }

        const toastMessageEl = document.getElementById('toastMessage');
        const toastIcon = document.getElementById('toastIcon') || toastEl.querySelector('i');

        toastMessageEl.innerText = message;
        toastEl.className = 'toast-alert show';
        if (toastIcon) toastIcon.className = 'bx fs-4';

        if (type === 'error') {
            toastEl.classList.add('toast-alert--error');
            if (toastIcon) toastIcon.classList.add('bx-error-circle');
        } else if (type === 'success') {
            toastEl.classList.add('toast-alert--success');
            if (toastIcon) toastIcon.classList.add('bx-check-circle');
        }

        setTimeout(() => toastEl.classList.remove('show'), 3500);
    }

    function updateCounters() {
        if (counterTitulo && inputTitulo) counterTitulo.innerText = `${inputTitulo.value.length}/100`;
        if (counterDescCorta && inputDescCorta) counterDescCorta.innerText = `${inputDescCorta.value.length}/100`;
        if (counterDescLarga && inputDescLarga) counterDescLarga.innerText = `${inputDescLarga.value.length}/256`;
    }

    function updateLivePreview() {
        if (previewTitle) previewTitle.innerText = inputTitulo.value.trim() || 'Título del Prototipo';
        
        if (previewDesc) {
            const MAX_DESC = 85;
            let text = inputDescCorta.value.trim() || 'Descripción corta del prototipo...';
            if (text.length > MAX_DESC && !text.endsWith('...')) text = text.substring(0, MAX_DESC) + '...';
            previewDesc.innerText = text;
        }

        if (previewTags) {
            let tagsHTML = '';
            checkboxesTransaccion.forEach(cb => {
                if (cb.checked) {
                    let modifier = 'badge-tag--loan';
                    if (cb.value === 'Donación') modifier = 'badge-tag--donation';
                    if (cb.value === 'Intercambio') modifier = 'badge-tag--exchange';
                    tagsHTML += `<span class="badge-tag ${modifier}">${cb.value}</span>`;
                }
            });

            if (selectCategoria && selectCategoria.value !== '') {
                tagsHTML += `<span class="badge-tag badge-tag--category">${selectCategoria.options[selectCategoria.selectedIndex].text}</span>`;
            }
            if (selectCarrera && selectCarrera.value !== '') {
                tagsHTML += `<span class="badge-tag badge-tag--career">${selectCarrera.options[selectCarrera.selectedIndex].text}</span>`;
            }

            previewTags.innerHTML = tagsHTML !== '' ? tagsHTML : '<span class="badge-tag badge-tag--loan">Préstamo</span><span class="badge-tag badge-tag--category">General</span>';
        }
    }

    if (dropZone && fileInput) {
        
        fileInput.addEventListener('dragenter', () => dropZone.classList.add('dragover'));
        fileInput.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
        fileInput.addEventListener('drop', () => dropZone.classList.remove('dragover'));

        fileInput.addEventListener('change', function() {
            const files = this.files;
            
            if (files && files.length > 0) {
                const file = files[0];
                
                if (!file.type.startsWith('image/')) {
                    showValidationToast('Sube solo imágenes válidas (JPG, PNG, WEBP).', 'error');
                    this.value = ''; 
                    dropZone.classList.remove('success');
                    dropZone.classList.add('error');
                    setTimeout(() => dropZone.classList.remove('error'), 1000);
                    selectedImageFile = null;
                    return;
                }

                selectedImageFile = file;

                dropZone.classList.remove('error');
                dropZone.classList.add('success');
                
                if (dragDropText) {
                    dragDropText.innerHTML = `Imagen lista:<br><b>${file.name}</b>`;
                }

                const dropZoneIcon = dropZone.querySelector('.drag-drop-zone__icon');
                if (dropZoneIcon) {
                    dropZoneIcon.className = 'bx bx-check-circle drag-drop-zone__icon';
                }
                
                const reader = new FileReader();
                reader.onload = (e) => {
                    if(previewImg) previewImg.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
    }

    [inputTitulo, inputDescCorta, inputDescLarga].forEach(input => {
        if (input) input.addEventListener('input', () => { updateCounters(); updateLivePreview(); });
    });

    [selectCategoria, selectCarrera].forEach(select => {
        if (select) select.addEventListener('change', updateLivePreview);
    });

    checkboxesTransaccion.forEach(cb => {
        cb.addEventListener('change', updateLivePreview);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!inputTitulo.value.trim()) {
            showValidationToast("Por favor, ingresa el título del prototipo.", "error");
            inputTitulo.focus();
            return;
        }

        const selectedTransactions = Array.from(checkboxesTransaccion).filter(cb => cb.checked);
        if (selectedTransactions.length === 0) {
            showValidationToast("Selecciona al menos Préstamo, Intercambio o Donación.", "error");
            return;
        }

        if (selectCategoria.value === "") {
            showValidationToast("Por favor, selecciona una categoría.", "error");
            selectCategoria.focus();
            return;
        }

        if (selectCarrera.value === "") {
            showValidationToast("Por favor, selecciona tu carrera.", "error");
            selectCarrera.focus();
            return;
        }

        if (!selectedImageFile) {
            showValidationToast("La fotografía del prototipo es obligatoria.", "error");
            if (dropZone) {
                dropZone.classList.add('error');
                setTimeout(() => dropZone.classList.remove('error'), 1000);
            }
            return;
        }

        if (!inputDescCorta.value.trim()) {
            showValidationToast("Por favor, ingresa una descripción corta.", "error");
            inputDescCorta.focus();
            return;
        }

        if (!inputDescLarga.value.trim()) {
            showValidationToast("Por favor, ingresa la descripción detallada.", "error");
            inputDescLarga.focus();
            return;
        }

        console.log(">>> [UI PUBLICAR] Formulario validado al 100%. Preparando FormData para API...");
        showValidationToast("¡Formulario validado y listo!", "success");
        
        setTimeout(() => {
            const modalEl = document.getElementById('modalPublicarPrototipo');
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance?.hide();

            form.reset();
            updateCounters();
            selectedImageFile = null;
            if (dropZone) {
                dropZone.classList.remove('success');
                if (dragDropText) dragDropText.innerHTML = `Arrastra y suelta tu imagen aquí<br />o <span>haz clic para explorar</span>`;
                const dIcon = dropZone.querySelector('.drag-drop-zone__icon');
                if (dIcon) dIcon.className = 'bx bx-cloud-upload drag-drop-zone__icon';
            }
            if (previewImg) previewImg.src = DEFAULT_IMG;
            updateLivePreview();
            
        }, 1500);
    });
});