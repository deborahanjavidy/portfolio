// JS du menu hamburger mobile/panel mobile
const navToggleMobile = document.querySelector('.nav-toggle');
const mobileNavPanel = document.querySelector('.mobile-nav-panel');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

if (navToggleMobile && mobileNavPanel) {
  navToggleMobile.addEventListener('click', () => {
    const isOpen = mobileNavPanel.classList.toggle('open');
    navToggleMobile.setAttribute('aria-expanded', isOpen);
    mobileNavPanel.setAttribute('aria-hidden', !isOpen);
  });
  // Fermer le panel quand on clique sur un lien
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNavPanel.classList.remove('open');
      navToggleMobile.setAttribute('aria-expanded', false);
      mobileNavPanel.setAttribute('aria-hidden', true);
    });
  });
  // Fermer le panel si on clique en dehors
  document.addEventListener('click', (e) => {
    if (
      mobileNavPanel.classList.contains('open') &&
      !mobileNavPanel.contains(e.target) &&
      !navToggleMobile.contains(e.target)
    ) {
      mobileNavPanel.classList.remove('open');
      navToggleMobile.setAttribute('aria-expanded', false);
      mobileNavPanel.setAttribute('aria-hidden', true);
    }
  });
} 