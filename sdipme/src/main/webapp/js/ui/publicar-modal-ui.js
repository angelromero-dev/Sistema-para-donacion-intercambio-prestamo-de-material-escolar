/**
 * publicar-modal-ui.js
 * UI Controller for Prototype Publishing Modal with Real-time Card Live Preview.
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log(">>> [UI PUBLICAR] Inicializando controlador del modal de publicación...");

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
    const dropZoneIcon = document.querySelector('.drag-drop-zone__icon');
    let selectedImageFile = null; 

    // Counters & Live Preview
    const counterTitulo = document.getElementById('counterTitulo');
    const counterDescCorta = document.getElementById('counterDescCorta');
    const counterDescLarga = document.getElementById('counterDescLarga');
    const previewImg = document.getElementById('prevImg');
    const previewTitle = document.getElementById('prevTitle');
    const previewDesc = document.getElementById('prevDesc');
    const previewTags = document.getElementById('prevTags');

    const DEFAULT_IMG = '../assets/images/logo-light.png';

    function showValidationToast(message, type = 'error') {
        const toastEl = document.getElementById('actionToast');
        const toastMessageEl = document.getElementById('toastMessage');
        const toastIcon = toastEl.querySelector('i');

        if (!toastEl || !toastMessageEl) return;

        toastMessageEl.innerText = message;
        
        // Reset classes
        toastEl.className = 'toast-alert show';
        toastIcon.className = 'bx fs-5 me-2';

        if (type === 'error') {
            toastEl.classList.add('toast-alert--error');
            toastIcon.classList.add('bx-error-circle');
        } else if (type === 'success') {
            toastEl.classList.add('toast-alert--success');
            toastIcon.classList.add('bx-check-circle');
        }

        setTimeout(() => {
            toastEl.classList.remove('show');
        }, 3500);
    }

    /**
     * Updates character counter text indicators
     */
    function updateCounters() {
        if (counterTitulo && inputTitulo) counterTitulo.innerText = `${inputTitulo.value.length}/100`;
        if (counterDescCorta && inputDescCorta) counterDescCorta.innerText = `${inputDescCorta.value.length}/100`;
        if (counterDescLarga && inputDescLarga) counterDescLarga.innerText = `${inputDescLarga.value.length}/256`;
    }

    /**
     * Updates the Live Preview Card dynamically
     */
    function updateLivePreview() {
        if (previewTitle) previewTitle.innerText = inputTitulo.value.trim() || 'Título del Prototipo';
        if (previewDesc) previewDesc.innerText = inputDescCorta.value.trim() || 'Descripción corta del prototipo que aparecerá en la tarjeta del catálogo.';

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

    // --- MANEJO DEL DRAG AND DROP Y FILE READER ---
    if (dropZone && fileInput) {
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, e => { e.preventDefault(); e.stopPropagation(); }, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
        });

        dropZone.addEventListener('drop', (e) => handleFiles(e.dataTransfer.files));
        fileInput.addEventListener('change', function() { handleFiles(this.files); });

        function handleFiles(files) {
            if (files.length > 0) {
                const file = files[0];
                
                if (!file.type.startsWith('image/')) {
                    showValidationToast('Formato no válido. Sube solo imágenes JPG, PNG o WEBP.', 'error');
                    return;
                }

                selectedImageFile = file;
                
                dropZone.classList.add('success');
                dragDropText.innerHTML = `Imagen cargada con éxito:<br><b>${file.name}</b>`;
                if(dropZoneIcon) dropZoneIcon.className = 'bx bx-check-circle drag-drop-zone__icon';
                
                const reader = new FileReader();
                reader.onload = (e) => { previewImg.src = e.target.result; }
                reader.readAsDataURL(file);
            }
        }
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

        if (!form.checkValidity()) {
            form.reportValidity(); 
            return;
        }

        const selectedTransactions = Array.from(checkboxesTransaccion).filter(cb => cb.checked);
        if (selectedTransactions.length === 0) {
            showValidationToast("Selecciona Préstamo, Intercambio o Donación.", "error");
            return;
        }

        if (!selectedImageFile) {
            showValidationToast("La imagen del prototipo es obligatoria.", "error");
            dropZone.style.borderColor = '#991b1b';
            setTimeout(() => dropZone.style.borderColor = '', 2000);
            return;
        }

        console.log(">>> [UI PUBLICAR] Formulario 100% válido. Archivo en memoria listo para subir.");
        
        showValidationToast("¡Formulario validado! (Listo para API)", "success");
        
        const modalEl = document.getElementById('modalPublicarPrototipo');
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        modalInstance?.hide();
    });
});