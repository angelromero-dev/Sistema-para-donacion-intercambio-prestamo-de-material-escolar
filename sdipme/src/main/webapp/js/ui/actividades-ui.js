/**
 * actividades-ui.js
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Tab Switching Logic
    const tabContainer = document.querySelector('.l-tabs-wrapper');
    const contentPanels = document.querySelectorAll('.tab-panel');

    if (tabContainer) {
        tabContainer.addEventListener('click', (e) => {
            const clickedTab = e.target.closest('.activity-tab');
            if (!clickedTab) return;

            // Remove active from all tabs
            tabContainer.querySelectorAll('.activity-tab').forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            clickedTab.classList.add('active');

            // Toggle Content Panels
            const targetPanelId = clickedTab.dataset.target;
            contentPanels.forEach(p => {
                if(p.id === targetPanelId) {
                    p.style.display = 'block';
                } else {
                    p.style.display = 'none';
                }
            });
        });
    }

    // 2. Event Delegation for Approve / Reject
    const notificationsPanel = document.getElementById('panel-notificaciones');
    if (notificationsPanel) {
        notificationsPanel.addEventListener('click', (e) => {
            const btnApprove = e.target.closest('.btn-action--approve');
            const btnReject = e.target.closest('.btn-action--reject');
            
            if (btnApprove) {
                const card = btnApprove.closest('.activity-card');
                card.classList.add('slide-right-out');
                card.addEventListener('animationend', () => card.remove(), { once: true });
            }

            if (btnReject) {
                const card = btnReject.closest('.activity-card');
                card.classList.add('slide-left-out');
                card.addEventListener('animationend', () => card.remove(), { once: true });
            }
        });
    }

    // 3. Small Modal Logic 
    const modalOverlay = document.getElementById('exchange-overlay');
    const btnCloseModal = document.getElementById('btn-close-modal');

    document.addEventListener('click', (e) => {
        const btnOpen = e.target.closest('.btn-view-exchange');
        if (btnOpen && modalOverlay) {
            modalOverlay.classList.add('active');
        }
    });

    // Close Modal Logic
    if (btnCloseModal && modalOverlay) {
        btnCloseModal.addEventListener('click', () => modalOverlay.classList.remove('active'));
        // Close on clicking outside the modal box
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) modalOverlay.classList.remove('active');
        });
    }
});