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

    const DEFAULT_IMG = '../assets/images/NoImage.png';

    async function inicializarDatosReales() {
        console.log(">>> Solicitando catálogos y perfil al Backend...");
        
        // Ejecutamos ambas peticiones en paralelo para no perder tiempo
        const [resCat, resPerfil] = await Promise.all([
            api.getCatalogos(),
            api.obtenerPerfil()
        ]);
        
        if (resCat.ok && resCat.data) {
            // Llenar categorías normalmente
            if (selectCategoria && resCat.data.categorias) {
                selectCategoria.innerHTML = '<option value="" disabled selected>Selecciona una categoría...</option>';
                resCat.data.categorias.forEach(cat => {
                    selectCategoria.innerHTML += `<option value="${cat.id}">${cat.nombre}</option>`;
                });
            }
            
            // Asignar y bloquear la carrera del usuario
            if (selectCarrera && resCat.data.carreras && resPerfil.ok && resPerfil.data) {
                const miIdCarrera = resPerfil.data.idCarrera;
                const miCarreraObj = resCat.data.carreras.find(c => c.id === miIdCarrera || c.idCarrera === miIdCarrera);

                if (miCarreraObj) {
                    selectCarrera.innerHTML = `<option value="${miIdCarrera}" selected>${miCarreraObj.nombre}</option>`;
                    selectCarrera.disabled = true;
                    selectCarrera.style.backgroundColor = "var(--color-surface-mixed, #eef2f7)";
                    selectCarrera.style.cursor = "not-allowed";
                } else {
                    selectCarrera.innerHTML = '<option value="" disabled selected>Error: Carrera no encontrada</option>';
                }
            }
            console.log(">>> Catálogos y perfil cargados exitosamente.");
            updateLivePreview(); // Actualizar vista previa inicial
        } else {
            console.error(">>> Error al cargar los catálogos o el perfil de usuario. Verifica tu conexión.");
        }
    }

    inicializarDatosReales();

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

    [inputTitulo, inputDescCorta, inputDescLarga].forEach(input => {
        if (input) input.addEventListener('input', () => { updateCounters(); updateLivePreview(); });
    });
    [selectCategoria].forEach(select => { // Quitamos selectCarrera de los listeners porque ya no cambiará
        if (select) select.addEventListener('change', updateLivePreview);
    });
    checkboxesTransaccion.forEach(cb => {
        cb.addEventListener('change', updateLivePreview);
    });

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

    form.addEventListener('keydown', function(event) {
        if (event.key === "Enter" && event.target.tagName !== "TEXTAREA") {
            event.preventDefault();
            btnSubmit.click();
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!inputTitulo.value.trim()) { showValidationToast("Falta el título del prototipo.", "error"); inputTitulo.focus(); return; }
        
        const selectedTransactions = Array.from(checkboxesTransaccion).filter(cb => cb.checked);
        if (selectedTransactions.length === 0) { showValidationToast("Selecciona al menos un tipo de transacción.", "error"); return; }
        
        if (selectCategoria.value === "") { showValidationToast("Selecciona una categoría.", "error"); selectCategoria.focus(); return; }
        if (selectCarrera.value === "") { showValidationToast("Falta cargar tu carrera.", "error"); return; } // Bloqueado, no se le da focus
        
        if (!selectedImageFile) { 
            showValidationToast("La imagen del prototipo es obligatoria.", "error"); 
            dropZone.classList.add('error'); setTimeout(() => dropZone.classList.remove('error'), 1000); return; 
        }

        if (!inputDescCorta.value.trim()) { showValidationToast("Falta la descripción corta.", "error"); inputDescCorta.focus(); return; }
        if (!inputDescLarga.value.trim()) { showValidationToast("Falta la descripción detallada.", "error"); inputDescLarga.focus(); return; }

        const confirmModal = new bootstrap.Modal(document.getElementById('modalConfirmPublicar'));
        confirmModal.show();
    });

    btnConfirmFinal.addEventListener('click', async () => {
        const originalBtnText = btnConfirmFinal.innerHTML;
        btnConfirmFinal.disabled = true;
        btnConfirmFinal.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Subiendo...`;

        try {
            const cloudResponse = await api.uploadImageToCloudinary(selectedImageFile);
            if (!cloudResponse.ok) {
                showValidationToast("Error al subir la imagen a Cloudinary.", "error");
                btnConfirmFinal.disabled = false; btnConfirmFinal.innerHTML = originalBtnText; return;
            }

            const prototipoData = {
                titulo: inputTitulo.value.trim(),
                descripcionCorta: inputDescCorta.value.trim(),
                descripcionLarga: inputDescLarga.value.trim(),
                urlImagen: cloudResponse.url,
                idCarrera: parseInt(selectCarrera.value), // Lee el valor aunque el select esté disabled
                idCategoria: parseInt(selectCategoria.value),
                tipoTransaccion: Array.from(checkboxesTransaccion).filter(cb => cb.checked).map(cb => cb.value).join(', ')
            };

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
                
                // Recargar para mantener el valor fijo de la carrera tras el reset
                inicializarDatosReales(); 
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