import { openAuthModal } from './autorization_modal_window';
import {openProfileModal} from './user_profile_modal_window';

let  userLoginBtn, navigation, authBtn, logoutBtn;

userLoginBtn = document.querySelector('.mobile-menu .user-login-btn');
userLoginBtn.addEventListener('click', openAuthModal);

authBtn = document.querySelector('.mobile-menu .auth-btn');
authBtn.addEventListener('click', openProfileModal);

logoutBtn = logoutModal.querySelector(".mobile-menu .logout-btn");
logoutBtn.addEventListener("click", logout);

navigation = document.querySelector('.navigation');


//----------------------------------------------------------------------------------------------

function openMobileMenu() {
  
  const burgerIcon = document.querySelector('.burger-icon');
  const closeMobileMenuIcon = document.querySelector('.close-mobile-menu-icon');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (closeMobileMenuIcon.classList.contains('is-hidden')) {

    closeMobileMenuIcon.classList.remove('is-hidden');
    burgerIcon.classList.add('is-hidden');
    mobileMenu.classList.remove('is-hidden');

  } else {

    closeMobileMenuIcon.classList.add('is-hidden');
    burgerIcon.classList.remove('is-hidden');
    mobileMenu.classList.add('is-hidden');

  }
}

export {
  openMobileMenu,
}
