const checkBoxEl = document.querySelector('#theme-switch-toggle');
const body = document.querySelector('body');

// Фукнція що вішає слухача подій на перемикач тем і при кліку якщо є темна тема
//  в локалсторадж - видаляє її, в усіх інших випадках - встановлює темну тему в локалсторадж
const divContainerBackEl = document.querySelector('.back')
const arrTagEl = [...body.childNodes];
const checkLS = localStorage.getItem('theme')

if (checkLS === null || checkLS === '') {
  checkBoxEl.checked = false;
} else {
  checkBoxEl.checked = true;
}

if (arrTagEl.includes(divContainerBackEl)) {
    addDarkClassToModal()
}


checkBoxEl.addEventListener('change', (event) => {
  event.preventDefault();
  //console.dir(checkBoxEl.checked);
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.removeItem('theme');
    }
    else {
      localStorage.setItem('theme', 'dark')
    }
  addDarkClassToHTML()
  if (arrTagEl.includes(divContainerBackEl)) {
    addDarkClassToModal()
  }
  
});

// фукція при умові наявності в локал сторадж темної теми додає класи темної теми,
  //  в усіх інших випадках - видаляє класи темної теми
export default function addDarkClassToHTML() {

if (localStorage.getItem('theme') === 'dark') {
  document.querySelector('body').classList.add('dark');
}
else {
  document.querySelector('body').classList.remove('dark');
// document.querySelector('.themetoggle span').textContent = 'wb_sunny'; modal-light
}
} 
addDarkClassToHTML();

    
function addDarkClassToModal() {
    const modalBookEl = document.querySelector('.modal-container');
    const modalMessageEl = document.querySelector('.modal-message');
    if (localStorage.getItem('theme') === 'dark') {
      
      const arrTagLight = document.querySelectorAll('.modal-text-light');
      modalBookEl.classList.remove('modal-light');
      modalBookEl.classList.add('modal-dark');
      modalMessageEl.classList.remove('message-light');
      modalMessageEl.classList.add('message-dark');
      arrTagLight.forEach((element) => {
        element.classList.remove('modal-text-light');
        element.classList.add('modal-text-dark');
      })
    }
    else {
      
      const arrTagLight = document.querySelectorAll('.modal-text-dark');
      modalBookEl.classList.remove('modal-dark');
      modalBookEl.classList.add('modal-light');
      modalMessageEl.classList.remove('message-dark');
      modalMessageEl.classList.add('message-light');
      arrTagLight.forEach((element) => {
        element.classList.remove('modal-text-dark');
        element.classList.add('modal-text-light');
      })
    // document.querySelector('.themetoggle span').textContent = 'wb_sunny'; modal-light
    }
}