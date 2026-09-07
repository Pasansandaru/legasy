const target = new Date();
target.setMonth(7, 28);
target.setHours(18, 0, 0, 0);
if (target <= new Date()) target.setFullYear(target.getFullYear() + 1);
function updateCountdown() {
  if (!document.querySelector('#days')) return;
  let distance = target - Date.now();
  if (distance < 0) distance = 0;
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor(distance / 3600000) % 24;
  const minutes = Math.floor(distance / 60000) % 60;
  document.querySelector('#days').textContent = String(days).padStart(2, '0');
  document.querySelector('#hours').textContent = String(hours).padStart(2, '0');
  document.querySelector('#minutes').textContent = String(minutes).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 60000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('img[data-fallback]').forEach((image) => {
  const useFallback = () => {
    if (image.src !== image.dataset.fallback) image.src = image.dataset.fallback;
  };
  image.addEventListener('error', useFallback);
  if (image.complete && image.naturalWidth === 0) useFallback();
});

const stage = document.querySelector('.look-stage');
const hand = document.querySelector('.mini-hand');
const options = document.querySelectorAll('.look-option');
const labels = ['Royal lavender', 'Pink glitter', 'Golden lotus', 'Kandy nights'];
options.forEach((option, index) => {
  option.addEventListener('click', () => {
    options.forEach((item) => item.classList.remove('active'));
    option.classList.add('active');
    stage.dataset.color = option.dataset.color;
    stage.querySelector('.stage-label strong').textContent = labels[index];
    stage.querySelector('.stage-label').firstChild.textContent = `0${index + 1} / 04`;
  });
});
let dragging = false;
let startX = 0;
stage.addEventListener('pointerdown', (event) => { dragging = true; startX = event.clientX; stage.setPointerCapture(event.pointerId); });
stage.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  const rotation = Math.max(-32, Math.min(28, (event.clientX - startX) * .18));
  const depth = Math.max(-10, Math.min(10, (event.clientY - stage.getBoundingClientRect().top - stage.clientHeight / 2) * .08));
  hand.style.transform = `rotate(${-23 + rotation}deg) rotateY(${depth}deg) translateZ(18px)`;
});
stage.addEventListener('pointerup', () => { dragging = false; hand.style.transform = ''; });
stage.addEventListener('pointerleave', () => { dragging = false; hand.style.transform = ''; });

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));
