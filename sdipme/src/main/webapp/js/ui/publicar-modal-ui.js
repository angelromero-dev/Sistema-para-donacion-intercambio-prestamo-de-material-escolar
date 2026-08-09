/**
 * publicar-modal-ui.js
 */
document.addEventListener('DOMContentLoaded', async () => {
    console.log(">>> [UI PUBLICAR] Controlador inicializado con conexión a datos reales.");

    const form = document.getElementById('formPublicarPrototipo');
    const btnSubmit = document.getElementById('btnSubmitPublicar');
    const btnConfirmFinal = document.getElementById('btnConfirmPublicarFinal');
    if (!form || !btnSubmit || !btnConfirmFinal) return;

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

    let selectedImageFile = null;

    // Live Preview Elements
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

    // --- 1. CARGA REAL DE CATÁLOGOS Y SESIÓN DEL USUARIO ---
async function inicializarDatosReales() {
        console.log(">>> Solicitando catálogos al Backend...");
        
        // Obtenemos los catálogos reales desde el Backend Java
        const resCat = await api.getCatalogos();
        
        if (resCat.ok && resCat.data) {
            // Llenar el <select> de Categorías
            if (selectCategoria && resCat.data.categorias) {
                selectCategoria.innerHTML = '<option value="" disabled selected>Selecciona una categoría...</option>';
                resCat.data.categorias.forEach(cat => {
                    selectCategoria.innerHTML += `<option value="${cat.id}">${cat.nombre}</option>`;
                });
            }
            
            // Llenar el <select> de Carreras
            if (selectCarrera && resCat.data.carreras) {
                selectCarrera.innerHTML = '<option value="" disabled selected>Selecciona tu carrera...</option>';
                resCat.data.carreras.forEach(car => {
                    selectCarrera.innerHTML += `<option value="${car.id}">${car.nombre}</option>`;
                });
            }
            console.log(">>> Catálogos cargados exitosamente.");
        } else {
            console.error(">>> Error al cargar los catálogos. Verifica tu conexión a Tomcat/Oracle.");
        }
    }

    // Ejecutar la carga real
    inicializarDatosReales();

    // --- 2. SISTEMA DE ALERTAS (TOAST) ---
    function showValidationToast(message, type = 'error') {
        let toastEl = document.getElementById('actionToast');
        if (!toastEl) return;
        const toastMessageEl = document.getElementById('toastMessage');
        const toastIcon = toastEl.querySelector('i');
        
        toastMessageEl.innerText = message;
        toastEl.className = 'toast-alert show';
        if (toastIcon) toastIcon.className = type === 'error' ? 'bx fs-4 bx-error-circle' : 'bx fs-4 bx-check-circle';
        if (type === 'error') toastEl.classList.add('toast-alert--error');
        if (type === 'success') toastEl.classList.add('toast-alert--success');
        
        setTimeout(() => toastEl.classList.remove('show'), 3500);
    }

    // --- 3. ACTUALIZACIÓN EN VIVO (LIVE PREVIEW) ---
    function updateCounters() {
        if (counterTitulo) counterTitulo.innerText = `${inputTitulo.value.length}/100`;
        if (counterDescCorta) counterDescCorta.innerText = `${inputDescCorta.value.length}/100`;
        if (counterDescLarga) counterDescLarga.innerText = `${inputDescLarga.value.length}/256`;
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
                    let modifier = cb.value === 'Donación' ? 'badge-tag--donation' : (cb.value === 'Intercambio' ? 'badge-tag--exchange' : 'badge-tag--loan');
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

    // Bindings reactivos
    [inputTitulo, inputDescCorta, inputDescLarga].forEach(input => {
        if (input) input.addEventListener('input', () => { updateCounters(); updateLivePreview(); });
    });
    [selectCategoria, selectCarrera].forEach(select => {
        if (select) select.addEventListener('change', updateLivePreview);
    });
    checkboxesTransaccion.forEach(cb => {
        cb.addEventListener('change', updateLivePreview);
    });

    // --- 4. DRAG AND DROP (IMAGEN) ---
    if (dropZone && fileInput) {
        fileInput.addEventListener('dragenter', () => dropZone.classList.add('dragover'));
        fileInput.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
        fileInput.addEventListener('drop', () => dropZone.classList.remove('dragover'));

        fileInput.addEventListener('change', function() {
            const files = this.files;
            if (files && files.length > 0) {
                const file = files[0];
                if (!file.type.startsWith('image/')) {
                    showValidationToast('Sube solo imágenes válidas.', 'error');
                    this.value = ''; dropZone.classList.add('error');
                    setTimeout(() => dropZone.classList.remove('error'), 1000);
                    selectedImageFile = null; return;
                }
                selectedImageFile = file;
                dropZone.classList.remove('error'); dropZone.classList.add('success');
                if (dragDropText) dragDropText.innerHTML = `Imagen lista:<br><b>${file.name}</b>`;
                
                const reader = new FileReader();
                reader.onload = (e) => { if(previewImg) previewImg.src = e.target.result; }
                reader.readAsDataURL(file);
            }
        });
    }

    // --- 5. BLOQUEO DEL TECLADO ENTER ---
    form.addEventListener('keydown', function(event) {
        if (event.key === "Enter" && event.target.tagName !== "TEXTAREA") {
            event.preventDefault();
            btnSubmit.click();
        }
    });

    // --- 6. VALIDACIÓN PREVIA Y MODAL DE CONFIRMACIÓN ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!inputTitulo.value.trim()) { showValidationToast("Falta el título del prototipo.", "error"); inputTitulo.focus(); return; }
        
        const selectedTransactions = Array.from(checkboxesTransaccion).filter(cb => cb.checked);
        if (selectedTransactions.length === 0) { showValidationToast("Selecciona al menos un tipo de transacción.", "error"); return; }
        
        if (selectCategoria.value === "") { showValidationToast("Selecciona una categoría.", "error"); selectCategoria.focus(); return; }
        if (selectCarrera.value === "") { showValidationToast("Selecciona la carrera.", "error"); selectCarrera.focus(); return; }
        
        if (!selectedImageFile) { 
            showValidationToast("La imagen del prototipo es obligatoria.", "error"); 
            dropZone.classList.add('error'); setTimeout(() => dropZone.classList.remove('error'), 1000); return; 
        }

        if (!inputDescCorta.value.trim()) { showValidationToast("Falta la descripción corta.", "error"); inputDescCorta.focus(); return; }
        if (!inputDescLarga.value.trim()) { showValidationToast("Falta la descripción detallada.", "error"); inputDescLarga.focus(); return; }

        // Muestra el modal de confirmación antes de procesar
        const confirmModal = new bootstrap.Modal(document.getElementById('modalConfirmPublicar'));
        confirmModal.show();
    });

    // --- 7. ENVÍO DEFINITIVO A CLOUDINARY Y TOMCAT ---
    btnConfirmFinal.addEventListener('click', async () => {
        const originalBtnText = btnConfirmFinal.innerHTML;
        btnConfirmFinal.disabled = true;
        btnConfirmFinal.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Subiendo...`;

        try {
            // A) Subida de imagen a Cloudinary
            const cloudResponse = await api.uploadImageToCloudinary(selectedImageFile);
            if (!cloudResponse.ok) {
                showValidationToast("Error al subir la imagen a Cloudinary.", "error");
                btnConfirmFinal.disabled = false; btnConfirmFinal.innerHTML = originalBtnText; return;
            }

            // B) Armado de payload
            const prototipoData = {
                titulo: inputTitulo.value.trim(),
                descripcionCorta: inputDescCorta.value.trim(),
                descripcionLarga: inputDescLarga.value.trim(),
                urlImagen: cloudResponse.url,
                idCarrera: parseInt(selectCarrera.value),
                idCategoria: parseInt(selectCategoria.value),
                tipoTransaccion: Array.from(checkboxesTransaccion).filter(cb => cb.checked).map(cb => cb.value).join(', ')
            };

            // C) Inserción directa en Oracle vía Servlet
            const javaResponse = await api.publicarPrototipo(prototipoData);

            if (javaResponse.ok) {
                showValidationToast("¡Prototipo publicado con éxito!", "success");
                
                bootstrap.Modal.getInstance(document.getElementById('modalConfirmPublicar'))?.hide();
                bootstrap.Modal.getInstance(document.getElementById('modalPublicarPrototipo'))?.hide();

                form.reset();
                updateCounters();
                selectedImageFile = null;
                if (dropZone) dropZone.classList.remove('success');
                if (dragDropText) dragDropText.innerHTML = `Arrastra y suelta tu imagen aquí`;
                if (previewImg) previewImg.src = DEFAULT_IMG;
                updateLivePreview();
            } else {
                showValidationToast(javaResponse.data.message || "Error al registrar en la base de datos.", "error");
            }
        } catch (error) {
            console.error(error);
            showValidationToast("Ocurrió un error inesperado de red.", "error");
        } finally {
            btnConfirmFinal.disabled = false;
            btnConfirmFinal.innerHTML = originalBtnText;
        }
    });
});