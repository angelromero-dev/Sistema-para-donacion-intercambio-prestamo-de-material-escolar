/**
 * prototipo-detalle-ui.js
 * Lógica robusta: Tabs de agua, formularios desactivados opacos, validaciones JS, y envío a backend.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log(">>> [UI DETALLES] Controlador cargado con validaciones estrictas y UX opaca.");

    const gridPrototipos = document.getElementById('grid-prototipos');
    const modalEl = document.getElementById('modalDetallePrototipo');
    const modalConfirmEl = document.getElementById('modalConfirmSolicitud');
    if (!gridPrototipos || !modalEl) return;

    const modalInstance = new bootstrap.Modal(modalEl);
    const confirmInstance = new bootstrap.Modal(modalConfirmEl);

    // Dom Elements
    const modalTitle = document.getElementById('modalProtoTitulo');
    const modalImg = document.getElementById('modalProtoImg');
    const modalOferente = document.getElementById('modalProtoOferente');
    const modalScore = document.getElementById('modalProtoScore');
    const modalTags = document.getElementById('modalProtoTags');
    const modalDescLarga = document.getElementById('modalProtoDescLarga');

    // Forms
    const formPrestamo = document.getElementById('formSolicitudPrestamo');
    const formIntercambio = document.getElementById('formSolicitudIntercambio');
    const formDonacion = document.getElementById('formSolicitudDonacion');

    // Image Oferta State
    const inputOfertaFile = document.getElementById('solImagenOfertaFile');
    const textOfertaDrop = document.getElementById('dragDropOfertaText');
    const dropZoneOferta = document.getElementById('dragDropZoneOferta');
    let ofertaFileSelected = null;

    let currentPrototipoId = null;
    let pendingPayload = null;

    function showToast(msg, type = 'error') {
        let toastEl = document.getElementById('actionToast');
        if(!toastEl) return;
        const toastMessageEl = document.getElementById('toastMessage');
        const icon = toastEl.querySelector('i');
        toastMessageEl.innerText = msg;
        toastEl.className = 'toast-alert show';
        if (icon) icon.className = type === 'success' ? 'bx bx-check-circle fs-4' : 'bx bx-error-circle fs-4';
        toastEl.classList.add(type === 'success' ? 'toast-alert--success' : 'toast-alert--error');
        setTimeout(() => toastEl.classList.remove('show'), 3500);
    }

    const tabsContainer = document.getElementById('tabs-solicitud');
    const tabPanels = document.querySelectorAll('.tab-pane-solicitud');

    if (tabsContainer) {
        tabsContainer.addEventListener('click', (e) => {
            const tab = e.target.closest('.notif-tab');
            if (!tab) return;
            // Efecto Agua
            tabsContainer.querySelectorAll('.notif-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Cambiar Panel
            const targetId = tab.dataset.target;
            tabPanels.forEach(panel => {
                panel.style.display = (panel.id === targetId) ? 'block' : 'none';
            });
        });
    }

    gridPrototipos.addEventListener('click', async (e) => {
        const card = e.target.closest('.prototype-card');
        if (!card) return;

        const protoId = card.dataset.id;
        currentPrototipoId = parseInt(protoId);

        const response = await api.getPrototipos();
        if (!response.ok || !response.data) return;

        const prototipo = response.data.find(p => (p.id || p.idPrototipo) == currentPrototipoId);
        if (!prototipo) return;

        modalTitle.innerText = prototipo.titulo;
        modalImg.src = prototipo.urlImagen || '../assets/svg/logo.svg';
        modalOferente.innerText = prototipo.matriculaOferente || 'Estudiante';
        modalScore.innerText = prototipo.reputacion ? Number(prototipo.reputacion).toFixed(1) : '5.0';
        modalDescLarga.innerText = prototipo.descripcionLarga || prototipo.descripcionCorta || 'Sin descripción adicional.';

        let tagsHTML = '';
        const transactions = prototipo.tipoTransaccion ? prototipo.tipoTransaccion.split(',').map(t => t.trim()) : ['Préstamo'];
        transactions.forEach(t => {
            let modifier = t === 'Donación' ? 'badge-tag--donation' : (t === 'Intercambio' ? 'badge-tag--exchange' : 'badge-tag--loan');
            tagsHTML += `<span class="badge-tag ${modifier}">${t}</span>`;
        });
        if (prototipo.etiquetas) {
            prototipo.etiquetas.forEach(e => {
                let mod = e.tipo === 'categoria' ? 'badge-tag--category' : (e.tipo === 'carrera' ? 'badge-tag--career' : 'badge-tag--division');
                tagsHTML += `<span class="badge-tag ${mod}">${e.valor}</span>`;
            });
        }
        modalTags.innerHTML = tagsHTML;

        formPrestamo.className = transactions.includes('Préstamo') ? 'd-flex flex-column gap-2' : 'd-flex flex-column gap-2 form-disabled-overlay';
        formIntercambio.className = transactions.includes('Intercambio') ? 'd-flex flex-column gap-2' : 'd-flex flex-column gap-2 form-disabled-overlay';
        formDonacion.className = transactions.includes('Donación') ? 'd-flex flex-column gap-2' : 'd-flex flex-column gap-2 form-disabled-overlay';

        const availableTabs = Array.from(tabsContainer.querySelectorAll('.notif-tab'));
        let firstAvailableTab = null;
        
        if (transactions.includes('Préstamo')) firstAvailableTab = availableTabs.find(t => t.dataset.target === 'pill-prestamo');
        else if (transactions.includes('Intercambio')) firstAvailableTab = availableTabs.find(t => t.dataset.target === 'pill-intercambio');
        else if (transactions.includes('Donación')) firstAvailableTab = availableTabs.find(t => t.dataset.target === 'pill-donacion');

        if (firstAvailableTab) firstAvailableTab.click();

        modalInstance.show();
    });

    if (dropZoneOferta && inputOfertaFile) {
        inputOfertaFile.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                const file = this.files[0];
                if (!file.type.startsWith('image/')) {
                    showToast('Sube solo imágenes JPG o PNG.');
                    this.value = ''; return;
                }
                ofertaFileSelected = file;
                dropZoneOferta.classList.add('success');
                textOfertaDrop.innerHTML = `Foto lista: <b>${file.name}</b>`;
            }
        });
    }

    
    formPrestamo.addEventListener('submit', (e) => {
        e.preventDefault();
        const dias = document.getElementById('solDiasPrestamo').value;
        const msg = document.getElementById('solMsgPrestamo').value.trim();

        if (!dias || dias < 1 || dias > 20) { showToast("Los días deben estar entre 1 y 20."); return; }
        if (!msg) { showToast("El motivo es obligatorio."); document.getElementById('solMsgPrestamo').focus(); return; }

        pendingPayload = { idPrototipo: currentPrototipoId, mensajeJustificacion: msg, diasPrestamo: parseInt(dias) };
        confirmInstance.show();
    });

    formIntercambio.addEventListener('submit', (e) => {
        e.preventDefault();
        const tituloOferta = document.getElementById('solTituloOferta').value.trim();
        const msg = document.getElementById('solMsgIntercambio').value.trim();

        if (!tituloOferta) { showToast("Escribe qué ofreces."); document.getElementById('solTituloOferta').focus(); return; }
        if (!ofertaFileSelected) { showToast("La foto de tu artículo es obligatoria."); return; }
        if (!msg) { showToast("El mensaje es obligatorio."); document.getElementById('solMsgIntercambio').focus(); return; }

        pendingPayload = { idPrototipo: currentPrototipoId, mensajeJustificacion: msg, ofertaIntercambio: tituloOferta };
        confirmInstance.show();
    });

    formDonacion.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = document.getElementById('solMsgDonacion').value.trim();
        if (!msg) { showToast("La justificación es obligatoria."); document.getElementById('solMsgDonacion').focus(); return; }

        pendingPayload = { idPrototipo: currentPrototipoId, mensajeJustificacion: msg };
        confirmInstance.show();
    });

    document.getElementById('btnConfirmSendSolicitud').addEventListener('click', async function() {
        const btn = this;
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Enviando...`;

        try {
            if (ofertaFileSelected) {
                const cloudRes = await api.uploadImageToCloudinary(ofertaFileSelected);
                if (!cloudRes.ok) {
                    showToast("Error al subir imagen a Cloudinary.");
                    btn.disabled = false; btn.innerHTML = originalText; confirmInstance.hide(); return;
                }
                pendingPayload.fotoIntercambio = cloudRes.url;
            }

            // Enviar Payload
            const res = await api.solicitarPrototipo(pendingPayload);

            if (res.ok) {
                showToast("¡Solicitud enviada con éxito al dueño!", "success");
                confirmInstance.hide();
                modalInstance.hide();
                
                formPrestamo.reset(); formIntercambio.reset(); formDonacion.reset();
                ofertaFileSelected = null;
                if(dropZoneOferta) dropZoneOferta.classList.remove('success');
                if(textOfertaDrop) textOfertaDrop.innerText = "Arrastra la foto de tu artículo";
                pendingPayload = null;
            } else {
                showToast(res.data.message || "Error al enviar la solicitud.");
                confirmInstance.hide();
            }
        } catch (error) {
            console.error(error);
            showToast("Ocurrió un error inesperado.");
            confirmInstance.hide();
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    });
});