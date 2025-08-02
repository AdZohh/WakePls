// Botón de reproducir
document.getElementById("playBtn").addEventListener("click", function () {
  // Reproduce canción
  document.getElementById("cancion").play();

  // Oculta carta y muestra transición
  document.getElementById("intro").style.display = "none";
  document.getElementById("transicion").style.display = "flex";

  // Luego de 3 segundos, oculta transición y muestra contenido
  setTimeout(function () {
    document.getElementById("transicion").style.display = "none";
    document.querySelector("header").style.display = "flex";
    document.querySelector(".contenido").style.display = "block";
  }, 3000);
});

// Repetir canción cuando termine
const cancion = document.getElementById("cancion");
cancion.addEventListener("ended", function () {
  cancion.currentTime = 0;
  cancion.play();
});



// Carrusel con flechas
const carrusel = document.querySelector('.carrusel');
const izquierda = document.querySelector('.flecha-izq');
const derecha = document.querySelector('.flecha-der');

izquierda.addEventListener('click', () => {
  carrusel.scrollBy({
    left: -120,
    behavior: 'smooth'
  });
});

derecha.addEventListener('click', () => {
  carrusel.scrollBy({
    left: 120,
    behavior: 'smooth'
  });
});

// Carrusel con arrastre (mouse y táctil)
let isDown = false;
let startX;
let scrollLeft;

carrusel.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - carrusel.offsetLeft;
  scrollLeft = carrusel.scrollLeft;
});

carrusel.addEventListener('mouseleave', () => {
  isDown = false;
});

carrusel.addEventListener('mouseup', () => {
  isDown = false;
});

carrusel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carrusel.offsetLeft;
  const walk = (x - startX) * 2;
  carrusel.scrollLeft = scrollLeft - walk;
});

// Táctil
carrusel.addEventListener('touchstart', (e) => {
  isDown = true;
  startX = e.touches[0].pageX;
  scrollLeft = carrusel.scrollLeft;
});

carrusel.addEventListener('touchmove', (e) => {
  if (!isDown) return;
  const x = e.touches[0].pageX;
  const walk = (x - startX) * 1.5;
  carrusel.scrollLeft = scrollLeft - walk;
});

carrusel.addEventListener('touchend', () => {
  isDown = false;
});


// Pausar y reanudar música con el video sorpresa
const video = document.getElementById("videoSorpresa");

video.addEventListener("play", function () {
  fadeOut(cancion, 1000); // 1 segundo de desvanecimiento
});

video.addEventListener("pause", function () {
  if (!video.ended) {
    fadeIn(cancion, 1000); // 1 segundo de aparición
  }
});

video.addEventListener("ended", function () {
  cancion.currentTime = 0;
  fadeIn(cancion, 1000); // vuelve a comenzar con fade in
});


// fadeee
function fadeOut(audio, duration = 1000) {
  const step = 0.05;
  const interval = duration / (audio.volume / step);

  const fade = setInterval(() => {
    if (audio.volume > step) {
      audio.volume -= step;
    } else {
      audio.volume = 0;
      audio.pause();
      clearInterval(fade);
    }
  }, interval);
}

function fadeIn(audio, duration = 1000) {
  audio.volume = 0;
  audio.play();
  const step = 0.05;
  const interval = duration / (1 / step);

  const fade = setInterval(() => {
    if (audio.volume < 1 - step) {
      audio.volume += step;
    } else {
      audio.volume = 1;
      clearInterval(fade);
    }
  }, interval);
}









