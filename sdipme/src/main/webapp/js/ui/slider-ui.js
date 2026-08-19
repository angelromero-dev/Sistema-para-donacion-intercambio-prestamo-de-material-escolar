/**
 * slider-ui.js
 */
document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.slider-curved-section');
    const track = document.getElementById('divisionsTrack');
    
    if (!section || !track) return;

    let direction = 1; 
    let speed = 1.2; 
    let position = 0;
    let animationFrameId;

    section.addEventListener('click', () => {
        window.location.href = 'pages/login.jsp';
    });

    function animateSlider() {
        const maxScroll = track.scrollWidth - section.clientWidth;
        position += speed * direction;

        if (position >= maxScroll) {
            position = maxScroll;
            direction = -1; 
        } else if (position <= 0) {
            position = 0;
            direction = 1; 
        }
        
        track.style.transform = `translate3d(-${position}px, 0, 0)`;
        animationFrameId = requestAnimationFrame(animateSlider);
    }

    animationFrameId = requestAnimationFrame(animateSlider);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId);
        } else {
            animationFrameId = requestAnimationFrame(animateSlider);
        }
    });
});