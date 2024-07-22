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
    modalForm.reset();
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
    const inputEmail = modalForm.elements.email.value;
    Notiflix.Notify.success('Successfull autorization!');
    onCloseModal();
    const authBtn = document.querySelector('.auth-btn');
    const authBtnName = authBtn.querySelector('.login-p');
    openBtn.classList.add("is-hidden");
    authBtn.classList.remove("is-hidden");
    authBtnName.textContent = inputEmail;
    
    modalForm.reset();
  }

//Обробка кнопок sign-up та sign-in під сабмітом
  const signUpBtn = document.querySelector('.btn-sign-up');
  const signInBtn = document.querySelector('.btn-sign-in');
  const name = document.querySelector('.li-name');
  signUpBtn.addEventListener('click', onSignUpBtnClick);
  signInBtn.addEventListener('click', onSignInBtnClick);
  function onSignUpBtnClick(){
    modalForm.reset();
    name.classList.remove("is-hidden");
    submitBtn.textContent = "SIGN UP";
    signUpBtn.classList.add("current");
    signInBtn.classList.remove("current");  
  }
  function onSignInBtnClick(){
    modalForm.reset();
    name.classList.add("is-hidden");
    submitBtn.textContent = "SIGN IN";
    signInBtn.classList.add("current");
    signUpBtn.classList.remove("current");    
  }


