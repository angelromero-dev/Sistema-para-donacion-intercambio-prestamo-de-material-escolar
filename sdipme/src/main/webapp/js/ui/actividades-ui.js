/**
 * actividades-ui.js
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log(">>> [UI ACTIVIDADES] Inicializando controlador de eventos...");

    let targetCardPending = null;
    let pendingActionType = null;

    // Bootstrap Modals Instances
    const approveModalEl = document.getElementById('modalConfirmApprove');
    const rejectModalEl = document.getElementById('modalConfirmReject');
    const prototypeModalEl = document.getElementById('modalPrototypeDetail');

    const approveModal = approveModalEl ? new bootstrap.Modal(approveModalEl) : null;
    const rejectModal = rejectModalEl ? new bootstrap.Modal(rejectModalEl) : null;
    const prototypeModal = prototypeModalEl ? new bootstrap.Modal(prototypeModalEl) : null;

    // Toast Element
    const toastEl = document.getElementById('actionToast');
    const toastMessageEl = document.getElementById('toastMessage');

    /**
     * Shows a temporary floating toast legend that fades out after 2.5 seconds.
     * @param {string} msg 
     */
    function showToast(msg) {
        if (!toastEl || !toastMessageEl) return;
        toastMessageEl.innerText = msg;
        toastEl.classList.add('show');
        setTimeout(() => {
            toastEl.classList.remove('show');
        }, 2500);
    }

    // 1. Tab Switching (Water fill effect)
    const tabsContainer = document.getElementById('notifTabs');
    const tabPanels = document.querySelectorAll('.notif-panel');

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

    // 2. Open Confirmation Modal on Button Click
    document.addEventListener('click', (e) => {
        const btnApprove = e.target.closest('.btn-approve-custom');
        const btnReject = e.target.closest('.btn-reject-custom');
        const btnDetail = e.target.closest('.btn-detail-link');

        if (btnApprove) {
            targetCardPending = btnApprove.closest('.notif-card');
            pendingActionType = 'APPROVE';
            approveModal?.show();
        } else if (btnReject) {
            targetCardPending = btnReject.closest('.notif-card');
            pendingActionType = 'REJECT';
            rejectModal?.show();
        } else if (btnDetail) {
            // Open prototype details modal
            prototypeModal?.show();
        }
    });

    // 3. Confirm Approve Button Click inside Modal
    const btnConfirmApprove = document.getElementById('btnConfirmApprove');
    if (btnConfirmApprove) {
        btnConfirmApprove.addEventListener('click', () => {
            if (targetCardPending) {
                targetCardPending.classList.add('slide-right');
                targetCardPending.addEventListener('animationend', () => targetCardPending.remove(), { once: true });
                showToast("¡Solicitud aprobada con éxito!");
            }
            approveModal?.hide();
            targetCardPending = null;
        });
    }

    // 4. Confirm Reject Button Click inside Modal
    const btnConfirmReject = document.getElementById('btnConfirmReject');
    if (btnConfirmReject) {
        btnConfirmReject.addEventListener('click', () => {
            if (targetCardPending) {
                targetCardPending.classList.add('slide-left');
                targetCardPending.addEventListener('animationend', () => targetCardPending.remove(), { once: true });
                showToast("Solicitud rechazada.");
            }
            rejectModal?.hide();
            targetCardPending = null;
        });
    }

    // 5. Swipe Gesture Detection (Touch / Mouse Drag)
    let startX = 0;
    let currentCard = null;

    document.addEventListener('touchstart', (e) => {
        const card = e.target.closest('.notif-card');
        if (!card) return;
        startX = e.touches[0].clientX;
        currentCard = card;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        if (!currentCard) return;
        const endX = e.changedTouches[0].clientX;
        const diffX = endX - startX;

        // Swipe Right (Approve)
        if (diffX > 80) {
            targetCardPending = currentCard;
            approveModal?.show();
        } 
        // Swipe Left (Reject)
        else if (diffX < -80) {
            targetCardPending = currentCard;
            rejectModal?.show();
        }
        currentCard = null;
    });
});