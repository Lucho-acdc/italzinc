const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});


const cards = document.querySelectorAll('.portfolio-card');

function showCardsOnScroll() {
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.9;

    if (cardTop < triggerPoint) {
      card.classList.add('appear'); // Añade la clase 'appear' cuando está dentro del viewport
    }
  });
}

// Escucha el evento de scroll para aplicar la animación
window.addEventListener('scroll', showCardsOnScroll);

// Asegura que las tarjetas que ya están visibles se muestren
showCardsOnScroll();

