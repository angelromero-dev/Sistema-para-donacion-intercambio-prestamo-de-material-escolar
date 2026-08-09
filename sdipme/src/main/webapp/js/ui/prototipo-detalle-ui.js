/**
 * prototipo-detalle-ui.js
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log(">>> [UI DETALLES] Controlador de modal de detalles e interactividad listo.");

    const gridPrototipos = document.getElementById('grid-prototipos');
    const modalEl = document.getElementById('modalDetallePrototipo');
    if (!gridPrototipos || !modalEl) return;

    const modalInstance = new bootstrap.Modal(modalEl);

    // Modal DOM Elements
    const modalTitle = document.getElementById('modalProtoTitulo');
    const modalImg = document.getElementById('modalProtoImg');
    const modalOferente = document.getElementById('modalProtoOferente');
    const modalScore = document.getElementById('modalProtoScore');
    const modalTags = document.getElementById('modalProtoTags');
    const modalDescLarga = document.getElementById('modalProtoDescLarga');

    // Tab Buttons
    const tabPrestamo = document.getElementById('pill-prestamo-tab');
    const tabIntercambio = document.getElementById('pill-intercambio-tab');
    const tabDonacion = document.getElementById('pill-donacion-tab');

    // Forms
    const formPrestamo = document.getElementById('formSolicitudPrestamo');
    const formIntercambio = document.getElementById('formSolicitudIntercambio');
    const formDonacion = document.getElementById('formSolicitudDonacion');

    // Image Oferta State
    const inputOfertaFile = document.getElementById('solImagenOfertaFile');
    const textOfertaDrop = document.getElementById('dragDropOfertaText');
    let ofertaFileSelected = null;

    let currentPrototipoId = null;

    // Toast Alert Helper
    function showToast(msg, type = 'error') {
        const toastEl = document.getElementById('actionToast');
        if (!toastEl) return;
        const toastMessageEl = document.getElementById('toastMessage');
        toastMessageEl.innerText = msg;
        toastEl.className = `toast-alert show ${type === 'success' ? 'toast-alert--success' : 'toast-alert--error'}`;
        setTimeout(() => toastEl.classList.remove('show'), 3500);
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

        // Populate Modal Fields
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

        tabPrestamo.style.display = 'none';
        tabIntercambio.style.display = 'none';
        tabDonacion.style.display = 'none';

        let firstActiveTab = null;

        if (transactions.includes('Préstamo')) {
            tabPrestamo.style.display = 'block';
            if (!firstActiveTab) firstActiveTab = tabPrestamo;
        }
        if (transactions.includes('Intercambio')) {
            tabIntercambio.style.display = 'block';
            if (!firstActiveTab) firstActiveTab = tabIntercambio;
        }
        if (transactions.includes('Donación')) {
            tabDonacion.style.display = 'block';
            if (!firstActiveTab) firstActiveTab = tabDonacion;
        }

        if (firstActiveTab) {
            const tabBootstrap = new bootstrap.Tab(firstActiveTab);
            tabBootstrap.show();
        }

        modalInstance.show();
    });

    // FILE INPUT INTERCAMBIO
    if (inputOfertaFile) {
        inputOfertaFile.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                ofertaFileSelected = this.files[0];
                textOfertaDrop.innerHTML = `Foto lista: <b>${ofertaFileSelected.name}</b>`;
            }
        });
    }

    // SUBMIT PRÉSTAMO
    if (formPrestamo) {
        formPrestamo.addEventListener('submit', async (e) => {
            e.preventDefault();
            const dias = parseInt(document.getElementById('solDiasPrestamo').value);
            const msg = document.getElementById('solMsgPrestamo').value.trim();

            if (dias < 1 || dias > 20) {
                showToast("Los días de préstamo deben estar entre 1 y 20.");
                return;
            }

            const res = await api.solicitarPrototipo({
                idPrototipo: currentPrototipoId,
                mensajeJustificacion: msg,
                diasPrestamo: dias
            });

            if (res.ok) {
                showToast("¡Solicitud de préstamo enviada con éxito!", "success");
                modalInstance.hide();
                formPrestamo.reset();
            } else {
                showToast(res.data.message || "No se pudo enviar la solicitud.");
            }
        });
    }

    // SUBMIT INTERCAMBIO
    if (formIntercambio) {
        formIntercambio.addEventListener('submit', async (e) => {
            e.preventDefault();
            const tituloOferta = document.getElementById('solTituloOferta').value.trim();
            const msg = document.getElementById('solMsgIntercambio').value.trim();

            if (!ofertaFileSelected) {
                showToast("La foto de tu artículo es obligatoria para el intercambio.");
                return;
            }

            // Cloudinary
            const cloudRes = await api.uploadImageToCloudinary(ofertaFileSelected);
            if (!cloudRes.ok) {
                showToast("Error al subir la foto de oferta.");
                return;
            }

            const res = await api.solicitarPrototipo({
                idPrototipo: currentPrototipoId,
                mensajeJustificacion: msg,
                ofertaIntercambio: tituloOferta,
                fotoIntercambio: cloudRes.url
            });

            if (res.ok) {
                showToast("¡Oferta de intercambio propuesta con éxito!", "success");
                modalInstance.hide();
                formIntercambio.reset();
                ofertaFileSelected = null;
                textOfertaDrop.innerText = "Haz clic o arrastra la foto de tu artículo";
            } else {
                showToast(res.data.message || "Error al enviar intercambio.");
            }
        });
    }

    // SUBMIT DONACIÓN
    if (formDonacion) {
        formDonacion.addEventListener('submit', async (e) => {
            e.preventDefault();
            const msg = document.getElementById('solMsgDonacion').value.trim();

            const res = await api.solicitarPrototipo({
                idPrototipo: currentPrototipoId,
                mensajeJustificacion: msg
            });

            if (res.ok) {
                showToast("¡Solicitud de donación enviada con éxito!", "success");
                modalInstance.hide();
                formDonacion.reset();
            } else {
                showToast(res.data.message || "Error al solicitar donación.");
            }
        });
    }
});