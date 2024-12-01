const openBtn = document.querySelector('.js-about-us-btn');
const backdrop = document.querySelector('.about-us-backdrop');
const closeBtn = document.querySelector('.about-us-close-button');

openBtn.addEventListener('click', onOpenModal);
closeBtn.addEventListener('click', onCloseModal);

function onOpenModal() {
  window.addEventListener('keydown', onEscKeyDown);
  window.addEventListener('mousemove', onAnyKeyDown);
  window.addEventListener('touchstart', onAnyKeyDown);

  backdrop.classList.remove('is-hidden');
}
function onCloseModal() {
  
  window.removeEventListener('keydown', onEscKeyDown);
  window.removeEventListener('mousemove', onAnyKeyDown);
  window.removeEventListener('touchstart', onAnyKeyDown);

  backdrop.classList.add('is-hidden');
}

function onEscKeyDown(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}
