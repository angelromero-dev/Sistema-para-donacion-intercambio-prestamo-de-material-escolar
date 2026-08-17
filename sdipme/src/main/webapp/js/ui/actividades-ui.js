/**
 * actividades-ui.js
 */

document.addEventListener('DOMContentLoaded', async () => {
    console.log(">>> [UI ACTIVIDADES] Controlador con paneles separados inicializado.");

    // --- 1. DOM Elements & State ---
    const tabsContainer = document.getElementById('notifTabs');
    const tabPanels = document.querySelectorAll('.notif-panel');
    const badgePendientes = document.getElementById('badge-pendientes');

    const listSolicitudesPendientes = document.getElementById('lista-solicitudes');
    const listHistorialSol = document.getElementById('lista-historial-sol');
    const listPrototiposActivos = document.getElementById('lista-mis-prototipos');
    const listHistorialPub = document.getElementById('lista-historial-pub');

    const approveModal = new bootstrap.Modal(document.getElementById('modalConfirmApprove'));
    const rejectModal = new bootstrap.Modal(document.getElementById('modalConfirmReject'));
    const prototypeModal = new bootstrap.Modal(document.getElementById('modalPrototypeDetail'));
    const cancelProtoModal = new bootstrap.Modal(document.getElementById('modalConfirmCancelProto'));
    
    // Requester Contact Modal 
    const modalContactoSolEl = document.getElementById('modalVerContactoSol');
    const contactModal = modalContactoSolEl ? new bootstrap.Modal(modalContactoSolEl) : null;

    let targetCardPending = null;
    let pendingActionType = null;
    let currentSolicitudId = null;
    let currentCancelProtoId = null;

    // --- 2. Helper Functions ---
    function showToast(msg, type = 'error') {
        const toastEl = document.getElementById('actionToast');
        if (!toastEl) return;
        document.getElementById('toastMessage').innerText = msg;
        toastEl.className = `toast-alert show ${type === 'success' ? 'toast-alert--success' : 'toast-alert--error'}`;
        setTimeout(() => toastEl.classList.remove('show'), 3500);
    }

    // --- 3. Tab Navigation ---
    if (tabsContainer) {
        tabsContainer.addEventListener('click', (e) => {
            const tab = e.target.closest('.notif-tab');
            if (!tab) return;
            tabsContainer.querySelectorAll('.notif-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const targetId = tab.dataset.target;
            tabPanels.forEach(panel => {
                panel.style.display = (panel.id === targetId) ? 'block' : 'none';
            });
        });
    }

    // --- 4. HTML Generators ---
    function generarHTMLSolicitud(sol, esHistorial) {
        let statusBadge = '';
        let btnContactoSol = ''; 
        const esAceptada = sol.estado === 'ACEPTADA';

        if (!esHistorial) {
            statusBadge = `<span class="badge-status badge-status--pending"><i class='bx bx-time-five'></i> Pendiente</span>`;
        } else {
            if (esAceptada) {
                statusBadge = `<span class="badge-status badge-status--accepted"><i class='bx bx-check-circle'></i> Aceptada</span>`;
                btnContactoSol = `
                    <button class="btn btn-success btn-sm mt-2 w-100 btn-ver-contacto-sol" 
                        data-nombre="${sol.solicitanteNombre}" 
                        data-matricula="${sol.solicitanteMatricula}" 
                        data-tel="${sol.solicitanteTelefono}" 
                        data-correo="${sol.solicitanteCorreo}">
                        <i class='bx bx-user-check me-1'></i> Ver Contacto del Solicitante
                    </button>
                `;
            } else {
                statusBadge = `<span class="badge-status badge-status--rejected"><i class='bx bx-x-circle'></i> Rechazada</span>`;
            }
        }

        let iconBox = ''; let detailBox = '';
        if (sol.diasPrestamo != null) {
            iconBox = `<div class="notif-card__avatar"><i class='bx bx-time-five'></i></div>`;
            detailBox = `<div class="notif-card__detail-box"><span><i class='bx bx-calendar-event me-1'></i> Pide: <b>${sol.diasPrestamo} días</b> de préstamo</span></div>`;
        } else if (sol.ofertaIntercambio != null) {
            iconBox = `<div class="notif-card__avatar" style="background-color: #F77702;"><i class='bx bx-transfer-alt'></i></div>`;
            detailBox = `
                <div class="notif-card__detail-box notif-card__detail-box--exchange">
                    <span>Ofrece: <b>${sol.ofertaIntercambio}</b></span>
                    <button class="btn-detail-link btn btn-link btn-sm p-0 ms-2 text-primary text-decoration-none fw-bold" 
                            data-img="${sol.fotoIntercambio}" data-title="${sol.ofertaIntercambio}" data-desc="${sol.mensaje}">[Ver artículo]</button>
                </div>`;
        } else {
            iconBox = `<div class="notif-card__avatar" style="background-color: #128970;"><i class='bx bx-gift'></i></div>`;
            detailBox = `<div class="notif-card__detail-box" style="border-left-color: #128970;"><span><i class='bx bx-heart me-1'></i> <b>Pide Donación</b></span></div>`;
        }

        const actionButtons = !esHistorial ? `
            <div class="d-flex gap-2 mt-3">
                <button class="btn-approve-custom"><i class='bx bx-check'></i> Aprobar</button>
                <button class="btn-reject-custom"><i class='bx bx-x'></i> Rechazar</button>
            </div>
        ` : '';

        return `
            <article class="notif-card ${esHistorial ? 'notif-card--history' : ''}" data-id="${sol.idSolicitud}">
                ${iconBox}
                <div class="notif-card__body">
                    <div class="d-flex align-items-center justify-content-between">
                        <h3 class="notif-card__title">Prototipo: "${sol.prototipoTitulo}"</h3>
                        ${statusBadge}
                    </div>
                    <p class="notif-card__text mt-1">Solicitante: <b>${sol.solicitanteMatricula}</b></p>
                    <p class="text-muted small fst-italic mt-1 mb-0">"${sol.mensaje}"</p>
                    ${detailBox}
                    ${actionButtons}
                    ${btnContactoSol}
                </div>
            </article>
        `;
    }

    // --- 5. API Data Loaders ---
    async function cargarSolicitudes() {
        const res = await api.getSolicitudesRecibidas();
        if (!res.ok) return;

        const pendientes = res.data.filter(s => s.estado === 'PENDIENTE');
        const historial = res.data.filter(s => s.estado !== 'PENDIENTE');

        if (badgePendientes) {
            badgePendientes.innerText = pendientes.length;
            badgePendientes.style.display = pendientes.length > 0 ? 'inline-block' : 'none';
        }

        listSolicitudesPendientes.innerHTML = pendientes.length === 0 
            ? `<div class="text-center py-5"><i class='bx bx-check-double text-muted' style='font-size: 3.5rem;'></i><p class="text-muted mt-2">No tienes solicitudes pendientes.</p></div>`
            : pendientes.map(s => generarHTMLSolicitud(s, false)).join('');

        listHistorialSol.innerHTML = historial.length === 0 
            ? `<div class="text-center py-5"><i class='bx bx-history text-muted' style='font-size: 3.5rem;'></i><p class="text-muted mt-2">Historial vacío.</p></div>`
            : historial.map(s => generarHTMLSolicitud(s, true)).join('');
    }

    async function cargarMisPrototipos() {
        const res = await api.getMisPrototiposPublicados();
        if (!res.ok) return;

        const activos = res.data.filter(p => p.estado === 'ACTIVA');
        const inactivos = res.data.filter(p => p.estado !== 'ACTIVA'); 

        listPrototiposActivos.innerHTML = activos.length === 0 
            ? `<div class="text-center py-5"><i class='bx bx-package text-muted' style="font-size: 3.5rem;"></i><p class="text-muted mt-2">No tienes publicaciones activas.</p></div>`
            : activos.map(p => `
                <article class="notif-card" style="align-items: center;">
                    <img src="${p.urlImagen || '../assets/svg/logo.svg'}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;" />
                    <div class="notif-card__body ms-2 flex-grow-1">
                        <div class="d-flex align-items-center justify-content-between">
                            <h3 class="notif-card__title mb-0">${p.titulo}</h3>
                            <span class="badge-status badge-status--accepted"><i class="bx bx-check"></i> Activo</span>
                        </div>
                        <p class="notif-card__text small mb-1 mt-1">${p.descripcionCorta}</p>
                        <span class="text-muted small d-block"><i class='bx bx-purchase-tag-alt'></i> ${p.tipoTransaccion}</span>
                    </div>
                    <button class="btn btn-outline-danger btn-sm btn-cancel-proto ms-auto" data-id="${p.idPrototipo}">
                        <i class='bx bx-trash me-1'></i> Cancelar
                    </button>
                </article>`).join('');

        listHistorialPub.innerHTML = inactivos.length === 0 
            ? `<div class="text-center py-5"><i class='bx bx-archive text-muted' style="font-size: 3.5rem;"></i><p class="text-muted mt-2">Historial vacío.</p></div>`
            : inactivos.map(p => {
                let badge = p.estado === 'CANCELADA' 
                    ? `<span class="badge-status badge-status--cancelled"><i class="bx bx-block"></i> Cancelada</span>`
                    : `<span class="badge-status badge-status--accepted"><i class="bx bx-check-double"></i> Entregado/Ocupado</span>`;
                
                return `
                <article class="notif-card notif-card--cancelled" style="align-items: center;">
                    <img src="${p.urlImagen || '../assets/svg/logo.svg'}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; filter: grayscale(100%);" />
                    <div class="notif-card__body ms-2 flex-grow-1">
                        <div class="d-flex align-items-center justify-content-between">
                            <h3 class="notif-card__title mb-0">${p.titulo}</h3>
                            ${badge}
                        </div>
                        <p class="notif-card__text small mb-1 mt-1">${p.descripcionCorta}</p>
                    </div>
                </article>`;
            }).join('');
    }

    cargarSolicitudes();
    cargarMisPrototipos();

    // --- 6. Global Event Listeners ---
    document.addEventListener('click', (e) => {
        
        // 6.1 Cancel Prototype
        const btnCancel = e.target.closest('.btn-cancel-proto');
        if (btnCancel) {
            currentCancelProtoId = parseInt(btnCancel.dataset.id);
            cancelProtoModal.show();
            return;
        }

        // 6.2 View Exchange Details
        const btnDetail = e.target.closest('.btn-detail-link');
        if (btnDetail) {
            document.getElementById('exchangeTitle').innerText = `Oferta: ${btnDetail.dataset.title}`;
            document.getElementById('exchangeDesc').innerText = btnDetail.dataset.desc;
            document.getElementById('exchangeModalImg').src = btnDetail.dataset.img || '../assets/svg/logo.svg';
            prototypeModal.show();
            return;
        }

        // 6.3 View Requester Contact
        const btnContactoSol = e.target.closest('.btn-ver-contacto-sol');
        if (btnContactoSol && contactModal) {
            document.getElementById('solNombre').innerText = btnContactoSol.dataset.nombre;
            document.getElementById('solMatricula').innerText = `Matrícula: ${btnContactoSol.dataset.matricula}`;
            document.getElementById('solTelefono').innerText = btnContactoSol.dataset.tel;
            document.getElementById('solCorreo').innerText = btnContactoSol.dataset.correo;
            
            contactModal.show();
            return;
        }

        // 6.4 Approve or Reject Request
        const btnApprove = e.target.closest('.btn-approve-custom');
        const btnReject = e.target.closest('.btn-reject-custom');
        if (btnApprove || btnReject) {
            targetCardPending = e.target.closest('.notif-card');
            currentSolicitudId = parseInt(targetCardPending.dataset.id);
            pendingActionType = btnApprove ? 'ACEPTADA' : 'RECHAZADA';
            (btnApprove ? approveModal : rejectModal).show();
        }
    });

    // --- 7. API Interactions & Logic ---
    async function procesarRespuesta(modalInstance) {
        if (!currentSolicitudId || !pendingActionType) return;
        const res = await api.responderSolicitud(currentSolicitudId, pendingActionType);
        
        if (res.ok) {
            showToast(`Solicitud ${pendingActionType.toLowerCase()} exitosamente.`, "success");
            targetCardPending.classList.add('is-collapsing'); 
            
            setTimeout(() => {
                cargarSolicitudes();
                if (pendingActionType === 'ACEPTADA') cargarMisPrototipos(); 
            }, 420);
        } else {
            showToast(res.data.message || "Error al procesar.", "error");
        }
        modalInstance.hide();
    }

    // --- 8. Privacy Checkbox Logic ---
    const chkPrivacy = document.getElementById('chkPrivacyConsent');
    const btnApproveFinal = document.getElementById('btnConfirmApprove');
    
    if (chkPrivacy && btnApproveFinal) {
        chkPrivacy.addEventListener('change', (e) => {
            btnApproveFinal.disabled = !e.target.checked;
        });

        document.getElementById('modalConfirmApprove').addEventListener('hidden.bs.modal', () => {
            chkPrivacy.checked = false;
            btnApproveFinal.disabled = true;
        });
    }
    
    // --- 9. Modal Confirmation Bindings ---
    document.getElementById('btnConfirmApprove').addEventListener('click', () => procesarRespuesta(approveModal));
    document.getElementById('btnConfirmReject').addEventListener('click', () => procesarRespuesta(rejectModal));

    document.getElementById('btnConfirmCancelProtoFinal').addEventListener('click', async () => {
        if (!currentCancelProtoId) return;
        const res = await api.cancelarPrototipo(currentCancelProtoId);
        if (res.ok) {
            showToast("Publicación cancelada. Retirada del catálogo.", "success");
            cancelProtoModal.hide();
            cargarMisPrototipos();
        } else {
            showToast("Error al cancelar.", "error");
        }
    });
});