import { bookshelf_API } from './API';
import { Notify } from 'notiflix';
import {createLoader, capitalizeStr } from './help_functions';
import {headerAuthorised} from './header';

const api = new bookshelf_API();
let abortCtrl1, abortCtrl2, loader1;

//відкриття модального вікна для авторизації
const backdrop = document.querySelector('.autorization-modal-backdrop');
const modal = document.querySelector('.modal');
const userLoginBtn = document.querySelector('.user-login-btn');
const userLoginMobileBtn = document.querySelector('.user-login-mobile-btn');

userLoginBtn.addEventListener('click', onOpenAuthModal);
userLoginMobileBtn.addEventListener('click', onOpenAuthModal);

function onOpenAuthModal() {
  window.addEventListener('keydown', onEscKeyDown);
  backdrop.classList.remove('is-hidden');
  document.body.classList.add('block-scroll');
}


//обробка кнопки закриття модального вікна
const closeBtn = document.querySelector('.close-button');
closeBtn.addEventListener('click', onCloseAuthModal);

function onCloseAuthModal() {
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


//--- обробка сабміта форми ----
const modalForm = document.querySelector('.modalForm');
const submitBtn = document.querySelector('.submitBtn');
modalForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {

  e.preventDefault();

  const name = modalForm.elements.name.value;
  const email = modalForm.elements.email.value;
  const password = modalForm.elements.password.value;
  
  if      (submitBtn.textContent === "SIGN UP") { singUp({name, email, password}); }
  else if (submitBtn.textContent === "SIGN IN") { singIn({email, password}); }

}

async function singUp({name, email, password}){
  
  if (abortCtrl1) {
    abortCtrl1.abort();
    console.log("abort previous registration");
  }

  try{
    
    loader1 = createLoader(modal, "into", ["loader-auth-modal"]);
    
    abortCtrl1 = new AbortController();
    const {user} = await api.signUp({name: capitalizeStr(name), email, password}, abortCtrl1);
    
    loader1.remove(); 

    
    if (user) {
      Notify.success('Successfull registration!', {position: "center-center", timeout: 1000});
      setTimeout(()=>{onSignInBtnClick()}, 1000);
    }else { 
      emailInput.select();
      Notify.failure('Email in use!!!', {position:'center-center', timeout: 1000,});
    }
  }catch(error){
    loader1.remove();
    console.log(error);  
  }

}

async function singIn({email, password}){

  if (abortCtrl2) {
    abortCtrl2.abort();
    console.log("abort previous autorization");
  }

  try{

    loader1 = createLoader(modal, "into", ["loader-auth-modal"]);

    abortCtrl2 = new AbortController();
    const {user} = await api.signIn({email, password}, abortCtrl2);
    loader1.remove(); 
    
    if (user) {
      
      onCloseAuthModal();
      headerAuthorised(user);
      Notify.success('Ok!', {position: "top-right", distance: "55px",  width: "100px", timeout: 1000});

    }else { 
      Notify.failure('Password or email is wrong!!!', {position:'center-center', timeout: 1000,});
    }

  }catch(error){
    loader1.remove(); 
    console.log(error);  
  }

}

// --- Обробка входу в інпути ---
const nameInput=document.querySelector('#name');
const emailInput=document.querySelector('#email');
const passInput=document.querySelector('#password');

nameInput.addEventListener('click', onModalInputClick);
emailInput.addEventListener('click', onModalInputClick);
passInput.addEventListener('click', onModalInputClick);

function onModalInputClick({target}){
  target.select();
}


//Обробка кнопок sign-up та sign-in під сабмітом
  const signUpBtn = document.querySelector('.btn-sign-up');
  const signInBtn = document.querySelector('.btn-sign-in');
  const nameItem = document.querySelector('.li-name');

  signUpBtn.addEventListener('click', onSignUpBtnClick);
  signInBtn.addEventListener('click', onSignInBtnClick);


  function onSignUpBtnClick(e){
    modalForm.reset();
    nameInput.setAttribute("required");
    nameItem.classList.remove("is-hidden");
    submitBtn.textContent = "SIGN UP";
    signUpBtn.classList.add("current");
    signInBtn.classList.remove("current");  
  }

  function onSignInBtnClick(){
    modalForm.reset();
    nameItem.classList.add("is-hidden");
    nameInput.removeAttribute("required");
    submitBtn.textContent = "SIGN IN";
    signInBtn.classList.add("current");
    signUpBtn.classList.remove("current");    
  }
