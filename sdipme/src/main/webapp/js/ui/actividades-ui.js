/**
 * actividades-ui.js
 */

document.addEventListener('DOMContentLoaded', async () => {
    console.log(">>> [UI ACTIVIDADES] Inicializando controlador...");

    const listaSolicitudes = document.getElementById('lista-solicitudes');
    const listaMisPrototipos = document.getElementById('lista-mis-prototipos');
    const tabsContainer = document.getElementById('notifTabs');
    const tabPanels = document.querySelectorAll('.notif-panel');
    const badgeSolicitudes = document.querySelector('[data-target="panel-solicitudes"] .badge');

    const approveModalEl = document.getElementById('modalConfirmApprove');
    const rejectModalEl = document.getElementById('modalConfirmReject');
    const prototypeModalEl = document.getElementById('modalPrototypeDetail');
    
    const approveModal = approveModalEl ? new bootstrap.Modal(approveModalEl) : null;
    const rejectModal = rejectModalEl ? new bootstrap.Modal(rejectModalEl) : null;
    const prototypeModal = prototypeModalEl ? new bootstrap.Modal(prototypeModalEl) : null;

    let targetCardPending = null;
    let pendingActionType = null;
    let currentSolicitudId = null;

    function showToast(msg, type = 'error') {
        const toastEl = document.getElementById('actionToast');
        if (!toastEl) return;
        const toastMessageEl = document.getElementById('toastMessage');
        const icon = toastEl.querySelector('i');
        toastMessageEl.innerText = msg;
        toastEl.className = `toast-alert show ${type === 'success' ? 'toast-alert--success' : 'toast-alert--error'}`;
        if (icon) icon.className = type === 'success' ? 'bx bx-check-circle fs-4' : 'bx bx-error-circle fs-4';
        setTimeout(() => toastEl.classList.remove('show'), 3500);
    }

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

    async function cargarSolicitudes() {
        const res = await api.getSolicitudesRecibidas();
        if (!res.ok) {
            listaSolicitudes.innerHTML = `<p class="text-center text-danger w-100 py-4">Error al cargar solicitudes.</p>`;
            return;
        }

        const solicitudes = res.data;

        if (badgeSolicitudes) {
            badgeSolicitudes.innerText = solicitudes.length;
            badgeSolicitudes.style.display = solicitudes.length > 0 ? 'inline-block' : 'none';
        }

        if (solicitudes.length === 0) {
            listaSolicitudes.innerHTML = `<div class="text-center py-5"><i class='bx bx-check-double text-muted' style='font-size: 3.5rem;'></i><p class="text-muted mt-2">No tienes solicitudes pendientes.</p></div>`;
            return;
        }

        listaSolicitudes.innerHTML = solicitudes.map(sol => {
            let iconBox = '';
            let detailBox = '';
            const isIntercambio = sol.ofertaIntercambio != null;
            const isPrestamo = sol.diasPrestamo != null;

            if (isPrestamo) {
                iconBox = `<div class="notif-card__avatar"><i class='bx bx-time-five'></i></div>`;
                detailBox = `<div class="notif-card__detail-box"><span><i class='bx bx-calendar-event me-1'></i> Pide: <b>${sol.diasPrestamo} días</b> de préstamo</span></div>`;
            } else if (isIntercambio) {
                iconBox = `<div class="notif-card__avatar" style="background-color: #F77702;"><i class='bx bx-transfer-alt'></i></div>`;
                detailBox = `
                    <div class="notif-card__detail-box notif-card__detail-box--exchange">
                        <span>Ofrece: <b>${sol.ofertaIntercambio}</b></span>
                        <button class="btn-detail-link" data-img="${sol.fotoIntercambio}" data-title="${sol.ofertaIntercambio}" data-desc="${sol.mensaje}">[Ver foto]</button>
                    </div>`;
            } else {
                iconBox = `<div class="notif-card__avatar" style="background-color: #128970;"><i class='bx bx-gift'></i></div>`;
                detailBox = `<div class="notif-card__detail-box" style="border-left-color: #128970;"><span><i class='bx bx-heart me-1'></i> <b>Pide Donación</b></span></div>`;
            }

            return `
                <article class="notif-card" data-id="${sol.idSolicitud}">
                    ${iconBox}
                    <div class="notif-card__body">
                        <div class="d-flex align-items-center">
                            <h3 class="notif-card__title">Solicitud por "${sol.prototipoTitulo}"</h3>
                        </div>
                        <p class="notif-card__text mt-1">El alumno <b>${sol.solicitanteMatricula}</b> (${sol.solicitanteNombre}) ha enviado una solicitud.</p>
                        <p class="text-muted small fst-italic mt-1 mb-0">"${sol.mensaje}"</p>
                        
                        ${detailBox}

                        <div class="d-flex gap-2 mt-3">
                            <button class="btn-approve-custom"><i class='bx bx-check'></i> Aprobar</button>
                            <button class="btn-reject-custom"><i class='bx bx-x'></i> Rechazar</button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');
    }

    async function cargarMisPrototipos() {
        const res = await api.getMisPrototiposPublicados();
        if (!res.ok || res.data.length === 0) {
            listaMisPrototipos.innerHTML = `<div class="text-center py-5"><i class='bx bx-package text-muted' style="font-size: 3.5rem;"></i><p class="text-muted mt-2">Aún no has publicado nada.</p></div>`;
            return;
        }

        listaMisPrototipos.innerHTML = res.data.map(proto => {
            const estadoBadge = proto.estado === 'ACTIVA' ? '<span class="badge bg-success">Activa</span>' : `<span class="badge bg-secondary">${proto.estado}</span>`;
            return `
                <article class="notif-card" style="align-items: center;">
                    <img src="${proto.urlImagen || '../assets/svg/logo.svg'}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;" />
                    <div class="notif-card__body ms-2">
                        <h3 class="notif-card__title">${proto.titulo} ${estadoBadge}</h3>
                        <p class="notif-card__text small">${proto.descripcionCorta}</p>
                        <span class="text-muted small mt-1 d-block"><i class='bx bx-purchase-tag-alt'></i> ${proto.tipoTransaccion}</span>
                    </div>
                </article>
            `;
        }).join('');
    }

    cargarSolicitudes();
    cargarMisPrototipos();

    listaSolicitudes.addEventListener('click', (e) => {
        const btnApprove = e.target.closest('.btn-approve-custom');
        const btnReject = e.target.closest('.btn-reject-custom');
        const btnDetail = e.target.closest('.btn-detail-link');

        if (btnDetail) {
            document.getElementById('exchangeTitle').innerText = btnDetail.dataset.title;
            document.getElementById('exchangeDesc').innerText = btnDetail.dataset.desc;
            document.querySelector('#modalPrototypeDetail img').src = btnDetail.dataset.img;
            prototypeModal?.show();
            return;
        }

        if (btnApprove || btnReject) {
            const card = e.target.closest('.notif-card');
            currentSolicitudId = parseInt(card.dataset.id);
            targetCardPending = card;

            if (btnApprove) {
                pendingActionType = 'ACEPTADA';
                approveModal?.show();
            } else {
                pendingActionType = 'RECHAZADA';
                rejectModal?.show();
            }
        }
    });

    async function procesarRespuesta(modalInstance) {
        if (!currentSolicitudId || !pendingActionType) return;

        const res = await api.responderSolicitud(currentSolicitudId, pendingActionType);
        
        if (res.ok) {
            showToast(`Solicitud ${pendingActionType.toLowerCase()} con éxito.`, "success");
            
            targetCardPending.classList.add(pendingActionType === 'ACEPTADA' ? 'slide-right' : 'slide-left');
            targetCardPending.addEventListener('animationend', () => {
                targetCardPending.remove();
                const currentCount = parseInt(badgeSolicitudes.innerText);
                if (currentCount > 0) {
                    badgeSolicitudes.innerText = currentCount - 1;
                    if (currentCount - 1 === 0) badgeSolicitudes.style.display = 'none';
                }
            }, { once: true });

        } else {
            showToast(res.data.message || "Error al procesar la solicitud.", "error");
        }

        modalInstance.hide();
        targetCardPending = null;
        currentSolicitudId = null;
    }

    document.getElementById('btnConfirmApprove')?.addEventListener('click', () => procesarRespuesta(approveModal));
    document.getElementById('btnConfirmReject')?.addEventListener('click', () => procesarRespuesta(rejectModal));

});