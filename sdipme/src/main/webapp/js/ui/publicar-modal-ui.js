/**
 * publicar-modal-ui.js
 * UI Controller for Prototype Publishing Modal with Real-time Card Live Preview.
 */

ddocument.addEventListener('DOMContentLoaded', () => {
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
    let selectedImageFile = null; // Guardará el archivo real para enviarlo al backend

    // Counters
    const counterTitulo = document.getElementById('counterTitulo');
    const counterDescCorta = document.getElementById('counterDescCorta');
    const counterDescLarga = document.getElementById('counterDescLarga');

    // Live Preview Elements
    const previewImg = document.getElementById('prevImg');
    const previewTitle = document.getElementById('prevTitle');
    const previewDesc = document.getElementById('prevDesc');
    const previewTags = document.getElementById('prevTags');

    const DEFAULT_IMG = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758';

    /**
     * Updates character counter text indicators
     */
    function updateCounters() {
        if (counterTitulo && inputTitulo) counterTitulo.innerText = `${inputTitulo.value.length}/100`;
        if (counterDescCorta && inputDescCorta) counterDescCorta.innerText = `${inputDescCorta.value.length}/100`;
        if (counterDescLarga && inputDescLarga) counterDescLarga.innerText = `${inputDescLarga.value.length}/256`;
    }

    /**
     * Updates the Live Preview Card dynamically (Text and Tags)
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
        
        // Efectos visuales al arrastrar
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
        });

        // Capturar archivo al soltar
        dropZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        });

        // Capturar archivo por click (explorador)
        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });

        function handleFiles(files) {
            if (files.length > 0) {
                const file = files[0];
                
                // Validar que sea imagen
                if (!file.type.startsWith('image/')) {
                    alert('Por favor, sube solo archivos de imagen (JPG, PNG, WEBP).');
                    return;
                }

                // Guardar para el submit
                selectedImageFile = file;
                
                // Cambiar el texto de la zona
                dragDropText.innerHTML = `Imagen seleccionada: <br><b>${file.name}</b>`;
                
                // Usar FileReader para mostrarla en el Live Preview al instante
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImg.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        }
    }

    // Attach Event Listeners for Live Binding
    [inputTitulo, inputDescCorta, inputDescLarga].forEach(input => {
        if (input) input.addEventListener('input', () => { updateCounters(); updateLivePreview(); });
    });

    [selectCategoria, selectCarrera].forEach(select => {
        if (select) select.addEventListener('change', updateLivePreview);
    });

    checkboxesTransaccion.forEach(cb => {
        cb.addEventListener('change', updateLivePreview);
    });

    // Form Submission 
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedTransactions = Array.from(checkboxesTransaccion).filter(cb => cb.checked);
        if (selectedTransactions.length === 0) {
            alert("Debes seleccionar al menos un tipo de transacción.");
            return;
        }

        if (!selectedImageFile) {
            alert("Por favor, selecciona o arrastra una imagen para el prototipo.");
            return;
        }

        console.log(">>> [UI PUBLICAR] Formulario validado. Preparando FormData para el Backend...");
        alert("¡Prototipo listo! En la siguiente fase, el Backend tomará esta imagen, la enviará a Cloudinary y guardará la URL en Oracle.");
        
        const modalEl = document.getElementById('modalPublicarPrototipo');
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        modalInstance?.hide();
    });
});