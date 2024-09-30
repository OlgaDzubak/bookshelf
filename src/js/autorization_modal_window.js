import { bookshelf_API } from './API';
import { Notify } from 'notiflix';
import {displayOrdredAmountInShoppingBag } from './help_functions';

const api = new bookshelf_API();
let abortCtrl1, abortCtrl2;

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
    abortCtrl1 = new AbortController();
    const data = await api.signUp({name, email, password}, abortCtrl1);

    if (data.accessToken) {
      
      document.cookie(`accessToken-${data.accessToken}`);

      Notify.success('Successfull registration!', {position: "center-center", timeout: 1300});
      setTimeout(()=>{onSignInBtnClick()}, 2000);

    }else { 
      emailInput.select();
      Notify.failure('Email in use!!!', {position:'center-center', timeout: 1700,});
    }
  }catch(error){
    console.log(error);  
  }

}
async function singIn({email, password}){

  if (abortCtrl2) {
    abortCtrl2.abort();
    console.log("abort previous autorization");
  }

  try{

    //створюємо loader
    const loader1 = createLoader(modalForm);

    abortCtrl2 = new AbortController();
    const {user} = await api.signIn({email, password}, abortCtrl2);
    
    //видаляємо loader після виконання запиту
    loader1.remove(); 
    
    if (user) {

      onCloseModal();
  
      const navigation = document.querySelector('.navigation');
      navigation.classList.remove("is-hidden");

      const authBtn = document.querySelector('.auth-btn');
      authBtn.classList.remove("is-hidden");
      
      const authBtnName = authBtn.querySelector('.login-p');
      authBtnName.textContent = user.name;
      
      openBtn.classList.add("is-hidden");

      localStorage.setItem("bookshelf_orderedbooks", JSON.stringify(user["shopping_list"]));
      displayOrdredAmountInShoppingBag(user["shopping_list"]);

      Notify.success('Ok!', {position: "top-right", distance: "55px",  width: "100px", timeout: 1300});

    }else { 
      Notify.failure('Password or email is wrong!!!', {position:'center-center', timeout: 2000,});
    }

  }catch(error){
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
    nameItem.classList.remove("is-hidden");
    submitBtn.textContent = "SIGN UP";
    signUpBtn.classList.add("current");
    signInBtn.classList.remove("current");  
  }
  function onSignInBtnClick(){
    modalForm.reset();
    nameItem.classList.add("is-hidden");
    submitBtn.textContent = "SIGN IN";
    signInBtn.classList.add("current");
    signUpBtn.classList.remove("current");    
  }
