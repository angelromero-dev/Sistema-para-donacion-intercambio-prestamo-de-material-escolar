/**
 * legales-ui.js
 */
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.settings-nav__link[data-panel]');
    const panels = document.querySelectorAll('.settings-panel');
    const pageTitle = document.getElementById('legalPageTitle');

    const PANEL_TITLES = {
        'panel-privacidad': 'Aviso de Privacidad Integral',
        'panel-reglamento': 'Reglamento General de Uso'
    };

    function switchPanel(targetId) {
        panels.forEach(panel => {
            if (panel.id === targetId) {
                panel.style.display = 'block';
                panel.classList.remove('settings-panel');
                void panel.offsetWidth; // Trigger reflow
                panel.classList.add('settings-panel');
            } else {
                panel.style.display = 'none';
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('settings-nav__link--active', link.dataset.panel === targetId);
        });

        if (pageTitle && PANEL_TITLES[targetId]) {
            pageTitle.textContent = PANEL_TITLES[targetId];
        }
        
        // Actualizar URL sin recargar
        const hashTarget = targetId.replace('panel-', '');
        if (history.replaceState) {
            history.replaceState(null, null, `#${hashTarget}`);
        }
    }

    // Inicializar listeners
    navLinks.forEach(link => {
        link.addEventListener('click', () => switchPanel(link.dataset.panel));
    });

    // Detectar hash en la URL al cargar (ej. legales.jsp#reglamento)
    const hash = window.location.hash.replace('#', '');
    if (hash === 'reglamento' || hash === 'privacidad') {
        switchPanel(`panel-${hash}`);
    }
});