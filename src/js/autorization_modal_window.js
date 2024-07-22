import Notiflix from 'notiflix';

const backdrop = document.querySelector('.autorization-modal-backdrop');

//відкриття модального вікна для авторизації
  const openBtn = document.querySelector('.jsOpenBtn');
  const openBtnMobile = document.querySelector('.jsOpenBtn-mobile');
  openBtn.addEventListener('click', onOpenModal);
  openBtnMobile.addEventListener('click', onOpenModal);
  function onOpenModal() {
    window.addEventListener('keydown', onEscKeyDown);
    backdrop.classList.remove('is-hidden');
    document.body.classList.add('block-scroll');
  }


//обробка кнопки закриття модального вікна
  const closeBtn = document.querySelector('.close-button');
  closeBtn.addEventListener('click', onCloseModal);
  function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyDown);
    backdrop.classList.add('is-hidden');
    document.body.classList.remove('block-scroll');
  }
  function onEscKeyDown(e) {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  }

//Обробка кнопки сабміта форми
  const modalForm = document.querySelector('.modalForm');
  const submitBtn = document.querySelector('.submitBtn');
  modalForm.addEventListener('submit', onFormSubmit);
  function onFormSubmit(e) {
    e.preventDefault();
    if (submitBtn.textContent === "SIGN UP"){

      const inputName = modalForm.elements.name.value;
      const inputEmail = modalForm.elements.email.value;
      const inputPassword = modalForm.elements.password.value;
    
      if (inputName === '' || inputEmail === '' || inputPassword === '') {
        return Notiflix.Notify.failure('Please fill in all fields!');
      }

      // Перевірка пароля та email (зв'язок з бекендом. В даному проекті не буде реалізовуватися)
      // -----------  
      // -----------
      // -----------

      Notiflix.Notify.success('Successfull autorization!');
      onCloseModal;
      const authBtn = document.querySelector('.authBtn');
      const authBtnName = authBtn.querySelector('.authBtn-name');
      openBtn.classList.add("is-hidden");
      authBtn.classList.remove("is-hidden");
      authBtnName.textContent = inputEmail;
      
    }else{
      const inputEmail = modalForm.elements.email.value;
      const inputPassword = modalForm.elements.password.value;
    
      if (inputEmail === '' || inputPassword === '') {
        return Notiflix.Notify.failure('Please fill in all fields!');
      }
      onCloseModal;
      const authBtn = document.querySelector('.authBtn');
      const authBtnName = authBtn.querySelector('.authBtn-name');
      openBtn.classList.add("is-hidden");
      authBtn.classList.remove("is-hidden");
      authBtnName.textContent = inputEmail;
    }
    modalForm.reset();
  }

//Обробка кнопок sign-up та sign-in під сабмітом
  const signUpBtn = document.querySelector('.btn-sign-up');
  const signInBtn = document.querySelector('.btn-sign-in');
  const name = document.querySelector('.li-name');
  signUpBtn.addEventListener('click', onsignUpBtnClick);
  signInBtn.addEventListener('click', onsignInBtnClick);
  function onsignUpBtnClick(){
    modalForm.reset();
    name.classList.remove("is-hidden");
    submitBtn.textContent = "SIGN UP"
    signUpBtn.classList.add("current");
    signInBtn.classList.remove("current");  
  }
  function onsignInBtnClick(){
    modalForm.reset();
    name.classList.add("is-hidden");
    submitBtn.textContent = "SIGN IN"
    signUpBtn.classList.remove("current");
    signInBtn.classList.add("current");
  }


