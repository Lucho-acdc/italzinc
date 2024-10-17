AOS.init();
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

const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    if (navbarToggler.getAttribute('aria-expanded') === 'true') {
      navbarToggler.click(); // Colapsa el menú
    }
  });
});



document.getElementById('submitButton').addEventListener('click', function (e) {
  e.preventDefault(); // Evitar el envío tradicional del formulario

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const recaptcha = document.getElementById('recaptcha');

  // Validar que los campos no estén vacíos
  if (nombre === "" || email === "" || mensaje === "") {
    alert('Por favor, completa todos los campos antes de continuar.');
    return;
  }

  // Mostrar el reCAPTCHA si aún no está visible
  if (recaptcha.style.display === 'none') {
    recaptcha.style.display = 'block'; // Mostrar el reCAPTCHA
    return; // Detener la ejecución para esperar la resolución del reCAPTCHA
  }

  // Verificar si el reCAPTCHA ha sido completado
  const recaptchaResponse = grecaptcha.getResponse();
  if (recaptchaResponse === "") {
    alert('Por favor, completa el reCAPTCHA.');
    return;
  }

  // Si todo está correcto, enviar el formulario usando fetch
  fetch('/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: nombre,
      email: email,
      mensaje: mensaje,
      'g-recaptcha-response': recaptchaResponse
    })
  })
  .then(response => response.json())
  .then(data => {
    // Mostrar alert con el mensaje recibido del servidor
    alert(data.message);

    // Si el mensaje es de éxito, limpiar el formulario
    if (data.message === 'Gracias por tu mensaje, nos pondremos en contacto contigo pronto.') {
      document.getElementById('contactForm').reset();
      grecaptcha.reset(); // Restablecer el reCAPTCHA
      recaptcha.style.display = 'none'; // Volver a ocultar el reCAPTCHA
    }
  })
  .catch(error => {
    console.error('Error al enviar el formulario:', error);
    alert('Hubo un error al enviar tu mensaje. Inténtalo de nuevo.');
  });
});




