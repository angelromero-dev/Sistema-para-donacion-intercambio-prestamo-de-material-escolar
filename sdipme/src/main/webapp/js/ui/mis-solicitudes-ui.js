/**
 * mis-solicitudes-ui.js
 */

document.addEventListener('DOMContentLoaded', async () => {
    const tabsContainer = document.getElementById('notifTabs');
    const tabPanels = document.querySelectorAll('.notif-panel');
    const badgeEspera = document.getElementById('badge-espera');
    const listaEnEspera = document.getElementById('lista-en-espera');
    const listaHistorial = document.getElementById('lista-historial-mio');

    const modalContactoEl = document.getElementById('modalVerContacto');
    const modalContacto = modalContactoEl ? new bootstrap.Modal(modalContactoEl) : null;
    const modalCancel = new bootstrap.Modal(document.getElementById('modalConfirmCancelarMiSolicitud'));

    // --- Función Toast para reemplazar alert() ---
    function showToast(msg, type = 'error') {
        const toastEl = document.getElementById('actionToast');
        if(!toastEl) return;
        const msgEl = document.getElementById('toastMessage');
        const icon = document.getElementById('toastIcon');
        
        msgEl.innerText = msg;
        toastEl.className = 'toast-alert show';
        
        if (type === 'success') {
            icon.className = 'bx bx-check-circle fs-4 text-success';
            toastEl.style.borderLeft = '4px solid #128970';
        } else {
            icon.className = 'bx bx-x-circle fs-4 text-danger';
            toastEl.style.borderLeft = '4px solid #dc2626';
        }
        
        setTimeout(() => toastEl.classList.remove('show'), 3000);
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

    function generarTarjetaHTML(sol, esHistorial) {
        let statusBadge = '';
        let btnContacto = '';
        let btnCancelar = '';
        
        const idSolicitud = sol.idSolicitud;
        const esAceptada = sol.estado === 'ACEPTADA';

        if (!esHistorial) {
            statusBadge = `<span class="badge-status badge-status--pending"><i class='bx bx-time-five'></i> En espera de respuesta</span>`;
            btnCancelar = `
                <button class="btn btn-outline-danger btn-sm mt-3 w-100 btn-abrir-cancelar" 
                    data-id="${idSolicitud}"
                    style="border-radius: 8px; font-weight: 600; transition: all 0.2s;">
                    <i class='bx bx-x-circle me-1'></i> Cancelar Solicitud
                </button>
            `;
        } else {
            if (esAceptada) {
                statusBadge = `<span class="badge-status badge-status--accepted"><i class='bx bx-check-circle'></i> Aprobada</span>`;
                btnContacto = `
                    <button class="btn btn-success btn-sm mt-3 w-100 btn-ver-contacto" 
                        data-nombre="${sol.duenoNombre}" 
                        data-matricula="${sol.duenoMatricula}" 
                        data-tel="${sol.duenoTelefono}" 
                        data-correo="${sol.duenoCorreo}">
                        <i class='bx bx-user-check me-1'></i> Ver Contacto del Dueño
                    </button>
                `;
            } else if (sol.estado === 'RECHAZADA') {
                statusBadge = `<span class="badge-status badge-status--rejected"><i class='bx bx-x-circle'></i> Rechazada</span>`;
            } else if (sol.estado === 'CANCELADA') {
                statusBadge = `<span class="badge-status" style="background:#f1f5f9; color:#64748b; border: 1px solid #cbd5e1;"><i class='bx bx-block'></i> Cancelada por ti</span>`;
            }
        }

        let transaccionTexto = '';
        if (sol.diasPrestamo != null) transaccionTexto = `Préstamo (${sol.diasPrestamo} días)`;
        else if (sol.ofertaIntercambio != null) transaccionTexto = `Intercambio (Ofrecí: ${sol.ofertaIntercambio})`;
        else transaccionTexto = `Donación`;

        return `
            <article class="notif-card ${esHistorial ? 'notif-card--history' : ''}" id="solicitud-card-${idSolicitud}" style="transition: all 0.3s ease;">
                <div class="notif-card__avatar" style="background-color: var(--color-surface-mixed); color: var(--color-brand-primary);">
                    <i class='bx bx-paper-plane'></i>
                </div>
                <div class="notif-card__body flex-grow-1">
                    <div class="d-flex align-items-center justify-content-between">
                        <h3 class="notif-card__title">Prototipo: "${sol.prototipoTitulo}"</h3>
                        ${statusBadge}
                    </div>
                    <p class="notif-card__text mt-1 mb-1">Dueño: <b>${sol.duenoMatricula}</b> <i class='bx bxs-star text-warning'></i> ${sol.duenoReputacion.toFixed(1)}</p>
                    <span class="text-muted small d-block"><i class='bx bx-purchase-tag-alt'></i> Solicité: ${transaccionTexto}</span>
                    ${btnContacto}
                    ${btnCancelar}
                </div>
            </article>
        `;
    }

    async function cargarMisSolicitudes() {
        const res = await api.getMisSolicitudesEnviadas();
        if (!res.ok) {
            listaEnEspera.innerHTML = `<p class="text-center text-danger w-100 py-4">Error de conexión con el servidor.</p>`;
            return;
        }

        const enEspera = res.data.filter(s => s.estado === 'PENDIENTE');
        const historial = res.data.filter(s => s.estado !== 'PENDIENTE');

        if (badgeEspera) {
            badgeEspera.innerText = enEspera.length;
            badgeEspera.style.display = enEspera.length > 0 ? 'inline-block' : 'none';
        }

        listaEnEspera.innerHTML = enEspera.length === 0 
            ? `<div class="text-center py-5"><i class='bx bx-coffee text-muted' style='font-size: 3.5rem;'></i><p class="text-muted mt-2">No tienes solicitudes pendientes.</p></div>`
            : enEspera.map(s => generarTarjetaHTML(s, false)).join('');

        listaHistorial.innerHTML = historial.length === 0 
            ? `<div class="text-center py-5"><i class='bx bx-history text-muted' style='font-size: 3.5rem;'></i><p class="text-muted mt-2">Aún no tienes historial.</p></div>`
            : historial.map(s => generarTarjetaHTML(s, true)).join('');
    }

    cargarMisSolicitudes();

    // Eventos Globales (Interacciones del usuario)
    document.addEventListener('click', (e) => {
        
        // 1. Abrir modal de contacto
        const btnContacto = e.target.closest('.btn-ver-contacto');
        if (btnContacto && modalContacto) {
            document.getElementById('contactoNombre').innerText = btnContacto.dataset.nombre;
            document.getElementById('contactoMatricula').innerText = `Matrícula: ${btnContacto.dataset.matricula}`;
            document.getElementById('contactoTelefono').innerText = btnContacto.dataset.tel;
            document.getElementById('contactoCorreo').innerText = btnContacto.dataset.correo;
            modalContacto.show();
        }

        // 2. Abrir modal de cancelación
        const btnAbrirCancelar = e.target.closest('.btn-abrir-cancelar');
        if (btnAbrirCancelar) {
            document.getElementById('hiddenIdSolicitudCancelar').value = btnAbrirCancelar.dataset.id;
            modalCancel.show();
        }
    });

    // 3. Ejecutar cancelación desde el modal
    const btnEjecutarCancel = document.getElementById('btnEjecutarCancelarSolicitud');
    if (btnEjecutarCancel) {
        btnEjecutarCancel.addEventListener('click', async () => {
            const idSol = document.getElementById('hiddenIdSolicitudCancelar').value;
            
            btnEjecutarCancel.disabled = true;
            btnEjecutarCancel.innerHTML = `<i class='bx bx-loader-alt bx-spin me-1'></i> Cancelando...`;

            try {
                const res = await api.responderSolicitud(parseInt(idSol), 'CANCELADA');
                
                if (res.ok) {
                    modalCancel.hide();
                    showToast("Solicitud cancelada correctamente.", "success");
                    
                    const card = document.getElementById(`solicitud-card-${idSol}`);
                    if (card) {
                        card.style.transform = 'scale(0.9)';
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.remove();
                            cargarMisSolicitudes(); // Recarga y la mueve a historial
                        }, 300);
                    }
                } else {
                    showToast(res.data?.message || "La solicitud ya fue respondida o no existe.", "error");
                    modalCancel.hide();
                }
            } catch (err) {
                showToast("Error de conexión al cancelar.", "error");
                modalCancel.hide();
            } finally {
                btnEjecutarCancel.disabled = false;
                btnEjecutarCancel.innerHTML = `Sí, cancelar`;
            }
        });
    }
});