/**
 * Smart Hero
 * Hides the hero container on scroll down, reveals it on scroll up.
 */

document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero-content');
  
  if (!heroContent) return;

  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 250) {
      heroContent.classList.add('hero-content--hidden');
    } else {
      heroContent.classList.remove('hero-content--hidden');
    }
    
    lastScrollTop = scrollTop;
  });
});