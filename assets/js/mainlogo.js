const logo = document.getElementById("logo");

let angulo = 0;
const intervaloGiro = 0.5; // Intervalo de giro en grados
const intervaloEspera = 5000; // Tiempo de espera en milisegundos

function rotarElemento() {
  if (angulo <= 360) {
    logo.style.transform = `rotateY(${angulo}deg)`;
    angulo += intervaloGiro;
    requestAnimationFrame(rotarElemento);
  } else {
    // Cuando se completa una rotación, esperar y reiniciar
    setTimeout(() => {
      angulo = 0;
      rotarElemento();
    }, intervaloEspera);
  }
}

setTimeout(() => {
  rotarElemento();
}, intervaloEspera);



