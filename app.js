new Vue({
  el: '#app',
  data: {
    presentation: '',
    presentationText: [
      "Bienvenue sur mon portfolio !",
      "Je suis passionnée par le développement web.",
      "Créons ensemble des projets innovants !"
    ],
    presentationIndex: 0,
    projets: [
      {
        titre: 'DevOps - Rise Up Madagascar',
        annee: 'L1',
        images: [
          'https://cdn.glitch.global/d994206b-c7d1-40f5-94dc-4853d40a6e79/1.jpg?v=1749580185007',
          'https://cdn.glitch.global/d994206b-c7d1-40f5-94dc-4853d40a6e79/1.1.jpg?v=1749580189500'
        ],
        resume: "Projet réalisé lors d'un hackathon autour des solutions numériques pour le développement durable. Nous avons conçu une plateforme permettant aux investisseurs de financer des initiatives agricoles à Madagascar.",
        description: "Le site aide les producteurs à améliorer leur rendement, trouver un emploi dans le secteur agricole, et à bénéficier d'un accompagnement à long terme. Objectif : combiner technologie et solidarité pour un impact réel sur le terrain.",
        lien: ''
      },
      {
        titre: 'DevOps - E-Tsidika',
        annee: 'L1',
        images: [
          'https://cdn.glitch.global/d994206b-c7d1-40f5-94dc-4853d40a6e79/3.png?v=1749580489329'
        ],
        resume: "Projet réalisé lors d'un hackathon visant à valoriser le patrimoine artistique malgache à travers le numérique.",
        description: "E-Tsidika est un musée d'art virtuel, conçu pour permettre aux artistes malgaches d'exposer leurs œuvres en ligne. Les visiteurs peuvent admirer ou acheter les créations via la plateforme. Le site intègre : une IA simple pour guider les utilisateurs dans leur visite, une animation 3D immersive du musée pour enrichir l'expérience. Objectif : rendre l'art accessible à tous, partout, tout en soutenant les artistes locaux.",
        lien: 'https://deborahanjavidy.github.io/e-tsidika/'
      },
      {
        titre: 'CTF (Hackathon)',
        annee: 'L1',
        images: [
          'https://cdn.glitch.global/d994206b-c7d1-40f5-94dc-4853d40a6e79/2.jpg?v=1749580183848'
        ],
        resume: "Participation à un hackathon CTF (Capture The Flag) où des équipes mixtes se sont affrontées sur des défis de cybersécurité.",
        description: "Ce projet a permis de renforcer nos compétences en sécurité informatique et de mettre en pratique nos connaissances dans un contexte compétitif. Objectif : améliorer nos capacités d'analyse des vulnérabilités et de résolution d'exploits en équipe.",
        lien: ''
      }
    ],
    projetsFiltres: [],
    projetSelectionne: null,
    form: {
      nom: '',
      email: '',
      message: ''
    },
    messageEnvoye: false,
    filtreActif: 'Tout'
  },
  mounted() {
    this.animatePresentation();
    this.projetsFiltres = this.projets;
    // Gestion du mode sombre/clair
    function setTheme(dark) {
      if (dark) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
    const themeBtn = document.getElementById('toggle-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', function() {
        const isDark = document.body.classList.contains('dark');
        setTheme(!isDark);
      });
    }
    // Appliquer le thème au chargement
    if (localStorage.getItem('theme') === 'dark') {
      setTheme(true);
    }
  },
  methods: {
    animatePresentation() {
      this.presentation = '';
      let i = 0;
      const next = () => {
        if (i < this.presentationText.length) {
          this.presentation = this.presentationText[i];
          i++;
          setTimeout(next, 2000);
        } else {
          setTimeout(() => {
            this.presentation = '';
            i = 0;
            next();
          }, 2000);
        }
      };
      next();
    },
    voirDetails(projet) {
      this.projetSelectionne = projet;
      document.body.style.overflow = 'hidden';
    },
    fermerModal() {
      this.projetSelectionne = null;
      document.body.style.overflow = '';
    },
    filtrerProjets(annee) {
      this.filtreActif = annee;
      document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
      const btns = document.querySelectorAll('.filter-button');
      btns.forEach(btn => {
        if (btn.textContent === annee) btn.classList.add('active');
      });
      if (annee === 'Tout') {
        this.projetsFiltres = this.projets;
      } else {
        this.projetsFiltres = this.projets.filter(p => p.annee === annee);
      }
    },
    envoyerEmail() {
      // Utilisation d'EmailJS (https://www.emailjs.com/) pour envoyer l'email côté client
      // Remplacez les valeurs ci-dessous par vos propres identifiants EmailJS
      const serviceID = 'default_service';
      const templateID = 'template_xxxxxx';
      const userID = 'user_xxxxxxxxxxxxxxxxx';
      const templateParams = {
        from_name: this.form.nom,
        from_email: this.form.email,
        message: this.form.message
      };
      if (!window.emailjs) {
        alert('EmailJS non chargé.');
        return;
      }
      emailjs.send(serviceID, templateID, templateParams, userID)
        .then(() => {
          this.messageEnvoye = true;
          this.form.nom = '';
          this.form.email = '';
          this.form.message = '';
          setTimeout(() => this.messageEnvoye = false, 4000);
        }, (err) => {
          alert('Erreur lors de l\'envoi : ' + err.text);
        });
    }
  }
});
// Charger EmailJS SDK dynamiquement
(function(){
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@2.6.4/dist/email.min.js';
  script.onload = function() {
    emailjs.init('user_xxxxxxxxxxxxxxxxx'); // Remplacez par votre userID EmailJS
  };
  document.body.appendChild(script);
})(); 