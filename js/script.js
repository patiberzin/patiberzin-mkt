document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     SLIDESHOW (se houver)
     ========================= */
  let slideIndex = 0;
  const slides = document.getElementsByClassName("slide");

  function showSlides(n) {
    if (!slides || slides.length === 0) return;
    // normaliza índice
    if (n >= slides.length) slideIndex = 0;
    else if (n < 0) slideIndex = slides.length - 1;
    else slideIndex = n;

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
  }

  function plusSlides(n) {
    showSlides(slideIndex + n);
  }

  // inicia se existirem slides
  if (slides.length > 0) {
    showSlides(slideIndex);
  }

  /* =========================
     MENU HAMBURGUER
     ========================= */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      // usamos "active" porque você já ajustou o CSS para isso
      navMenu.classList.toggle("active");
    });
  }

  /* =========================
     Opcional: Expor funções no global (se precisar chamar controles do slideshow de botões)
     ========================= */
  window.plusSlides = plusSlides;
  window.showSlides = showSlides;
});

// ====== Editorias (desktop + mobile hamburger) ======
(function () {
  const editorialToggle = document.getElementById('editorialToggle');
  const editorialsList = document.getElementById('editorialsList');
  const editorialBtns = document.querySelectorAll('.editorial-btn');
  const editorialSections = document.querySelectorAll('.editorial-section[data-section]');

  // helper: mostra a section com id
  function showSection(id) {
    editorialSections.forEach(sec => {
      if (sec.id === id) {
        sec.removeAttribute('hidden');
        sec.classList.add('ativo');
      } else {
        sec.setAttribute('hidden', '');
        sec.classList.remove('ativo');
      }
    });
  }

  // init: define primeira ativa se não houver
  const firstBtn = document.querySelector('.editorial-btn');
  if (firstBtn) {
    // se nenhuma estiver marcada .ativa, marque a primeira
    if (!document.querySelector('.editorial-btn.ativa')) {
      firstBtn.classList.add('ativa');
    }
    const active = document.querySelector('.editorial-btn.ativa');
    if (active) {
      const t = active.getAttribute('data-target');
      if (t) showSection(t);
    }
  }

  // click nos botões de editorial
  editorialBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      // atualiza visual dos botões
      editorialBtns.forEach(b => {
        b.classList.remove('ativa');
        b.setAttribute('aria-selected', 'false');
      });
      this.classList.add('ativa');
      this.setAttribute('aria-selected', 'true');

      const target = this.getAttribute('data-target');
      if (target) showSection(target);

      // se estiver no mobile, fecha o menu
      if (editorialsList.classList.contains('open')) {
        editorialsList.classList.remove('open');
        editorialToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // hamburger toggle (mobile)
  if (editorialToggle && editorialsList) {
    editorialToggle.addEventListener('click', function () {
      const isOpen = editorialsList.classList.toggle('open');
      this.setAttribute('aria-expanded', String(isOpen));
    });

    // fecha o menu se clicar fora (melhora UX)
    document.addEventListener('click', function (e) {
      if (!editorialsList.contains(e.target) && e.target !== editorialToggle && editorialsList.classList.contains('open')) {
        editorialsList.classList.remove('open');
        editorialToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
