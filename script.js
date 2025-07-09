// Animation douce du scroll (optionnel car scroll-behavior: smooth en CSS)
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//   anchor.addEventListener('click', function(e) {
//     e.preventDefault();
//     document.querySelector(this.getAttribute('href')).scrollIntoView({
//       behavior: 'smooth'
//     });
//   });
// });

// Feedback lors de l'envoi du formulaire de contact avec EmailJS
const form = document.querySelector('.contact-form');
if(form) {
  // Créer l'élément de message de confirmation
  let confirmationMsg = document.createElement('div');
  confirmationMsg.className = 'form-confirmation-msg';
  confirmationMsg.style.display = 'none';
  confirmationMsg.style.marginTop = '1.2rem';
  confirmationMsg.style.background = 'rgba(100,255,218,0.12)';
  confirmationMsg.style.color = '#64ffda';
  confirmationMsg.style.fontWeight = '700';
  confirmationMsg.style.fontSize = '1.08rem';
  confirmationMsg.style.textAlign = 'center';
  confirmationMsg.style.borderRadius = '12px';
  confirmationMsg.style.padding = '1rem 0.5rem';
  form.parentNode.appendChild(confirmationMsg);

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Identifiants EmailJS réels
    const serviceID = 'service_1zzplg4';
    const templateID = 'template_w8ydna5';
    const userID = 'oaYLFKLk4tHMlStT0';
    // Récupérer les données du formulaire (adapter les noms pour EmailJS)
    const formData = {
      name: form.prenom.value,
      email: form.email.value,
      message: form.message.value
    };
    emailjs.send(serviceID, templateID, formData, userID)
      .then(function(response) {
        form.reset();
        confirmationMsg.textContent = '✅ Votre message a bien été envoyé !';
        confirmationMsg.style.display = 'block';
      }, function(error) {
        console.log('Erreur EmailJS :', error);
        confirmationMsg.textContent = '❌ Une erreur est survenue, veuillez réessayer.';
        confirmationMsg.style.display = 'block';
      });
  });
}
// (JS du menu mobile déplacé dans menu-mobile.js)
// Effet machine à écrire sur l'accueil
const typingTexts = [
  "Je développe des interfaces modernes et animées.",
  "J'aime le design, le code et l'innovation.",
  "Toujours à la recherche de nouveaux défis.",
  "Passionné par le web et l'expérience utilisateur."
];
const typingEl = document.getElementById('typing-text');
const cursorEl = document.querySelector('.typing-cursor');
let typingIndex = 0, charIndex = 0, typingForward = true;

function typeText() {
  if (!typingEl) return;
  const text = typingTexts[typingIndex];
  if (typingForward) {
    if (charIndex === 0) typingEl.textContent = '';
    if (charIndex < text.length) {
      typingEl.textContent += text[charIndex++];
      setTimeout(typeText, 55);
    } else {
      typingForward = false;
      setTimeout(typeText, 1200);
    }
  } else {
    if (charIndex > 0) {
      typingEl.textContent = text.slice(0, --charIndex);
      setTimeout(typeText, 25);
    } else {
      typingForward = true;
      typingIndex = (typingIndex + 1) % typingTexts.length;
      setTimeout(typeText, 400);
    }
  }
}
if (typingEl) typeText();

// Projets animés interactifs
function closeAllProjets() {
  document.querySelectorAll('.projet-card.open').forEach(card => card.classList.remove('open'));
  const overlay = document.querySelector('.projets-overlay');
  if (overlay) overlay.remove();
  document.body.style.overflow = '';
}
// On utilise event delegation pour supporter plusieurs sections dynamiquement
function setupProjetCards() {
  document.querySelectorAll('.voir-btn').forEach(btn => {
    btn.onclick = function(e) {
      e.stopPropagation();
      closeAllProjets();
      const card = this.closest('.projet-card');
      card.classList.add('open');
      // Overlay
      const overlay = document.createElement('div');
      overlay.className = 'projets-overlay';
      document.body.appendChild(overlay);
      setTimeout(() => { card.scrollIntoView({behavior:'smooth', block:'center'}); }, 100);
      document.body.style.overflow = 'hidden';
      overlay.addEventListener('click', closeAllProjets);
    };
  });
  document.querySelectorAll('.close-details').forEach(btn => {
    btn.onclick = function(e) {
      e.stopPropagation();
      closeAllProjets();
    };
  });
}
setupProjetCards();
// Fermer au clavier (Esc)
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeAllProjets();
});
// Scroll horizontal fluide galerie
let isDown = false, startX, scrollLeft;
document.querySelectorAll('.galerie-scroll').forEach(gal => {
  gal.addEventListener('mousedown', (e) => {
    isDown = true;
    gal.classList.add('active');
    startX = e.pageX - gal.offsetLeft;
    scrollLeft = gal.scrollLeft;
  });
  gal.addEventListener('mouseleave', () => {
    isDown = false;
    gal.classList.remove('active');
  });
  gal.addEventListener('mouseup', () => {
    isDown = false;
    gal.classList.remove('active');
  });
  gal.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gal.offsetLeft;
    const walk = (x - startX) * 1.5;
    gal.scrollLeft = scrollLeft - walk;
  });
  // Tactile
  gal.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - gal.offsetLeft;
    scrollLeft = gal.scrollLeft;
  });
  gal.addEventListener('touchend', () => { isDown = false; });
  gal.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - gal.offsetLeft;
    const walk = (x - startX) * 1.5;
    gal.scrollLeft = scrollLeft - walk;
  });
});

// Filtrage et recherche projets dynamiques
const searchInput = document.getElementById('projets-search');
const filtres = document.querySelectorAll('.filtres-bar .tag');
const projets = document.querySelectorAll('.projet-card');

function filterProjets() {
  // Vérifier que les éléments nécessaires existent
  if (!searchInput || filtres.length === 0 || projets.length === 0) {
    return;
  }
  
  const search = searchInput.value.toLowerCase();
  const activeTags = Array.from(document.querySelectorAll('.filtres-bar .tag.active')).map(tag => tag.dataset.tag);
  
  projets.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const desc = card.dataset.desc.toLowerCase();
    const tags = card.dataset.tags.toLowerCase();
    
    // Recherche textuelle
    const matchSearch =
      title.includes(search) ||
      desc.includes(search) ||
      tags.includes(search);
    
    // Filtrage par tags (AND strict)
    let matchTags = true;
    if (activeTags.length > 0) {
      matchTags = activeTags.every(activeTag => tags.split(' ').includes(activeTag));
    }
    
    if (matchSearch && matchTags) {
      card.style.display = '';
      card.style.animation = 'fadeSlide 0.4s';
    } else {
      card.style.display = 'none';
      card.style.animation = '';
    }
  });
}

// Déclenche le filtrage sur Entrée, même si le focus n'est pas sur la barre de recherche
if (searchInput) {
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      // Si le focus est dans un champ texte autre que la barre de recherche, on ne fait rien
      if (document.activeElement && document.activeElement !== searchInput && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
        return;
      }
      e.preventDefault();
      filterProjets();
    }
  });
}

// Rendre l'icône de recherche cliquable
const searchIcon = document.querySelector('.search-icon');
if (searchIcon) {
  searchIcon.addEventListener('click', function() {
    searchInput.focus();
    filterProjets();
  });
}

if (filtres.length > 0) {
  filtres.forEach(btn => {
    btn.addEventListener('click', function() {
      // Toggle de l'état actif
      this.classList.toggle('active');
      // Ne pas filtrer ici !
    });
  });
}

// Initialiser l'affichage seulement si on est sur la page projets
if (searchInput && filtres.length > 0 && projets.length > 0) {
  filterProjets();
}

// --- Réinitialisation des filtres ---
const resetBtn = document.querySelector('.reset-filtres');
if (resetBtn) {
  resetBtn.addEventListener('click', function() {
    // Désactive tous les tags
    document.querySelectorAll('.tag.active').forEach(tag => tag.classList.remove('active'));
    // Ferme tous les accordéons
    document.querySelectorAll('details.filtre-bloc[open]').forEach(details => details.open = false);
    // Relance le filtrage
    if (typeof filterProjets === 'function') filterProjets();
  });
} 