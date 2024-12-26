import './js/header';
import './js/isChangeTheme';
import './js/support_ukraine';
import './js/books';

import './js/autorization_modal_window';
import './js/logout_modal_window';
import './js/user_profile_modal_window';
import './js/book_modal_window';
import './js/mobile_menu';
import './js/about_us_modal_window';

import {createMobileHeaderMarkUp, createNonMobileHeaderMarkUp} from './js/header'
import {createMobileMenuMarkUp} from './js/mobile_menu';


const pageWidth = document.documentElement.scrollWidth ; 

if (pageWidth < 768) { 
    createMobileHeaderMarkUp();
    createMobileMenuMarkUp();
}else{
    createNonMobileHeaderMarkUp();
}


// const homeLinkEl = document.querySelector('.js-nav-homelink');
// const mobileHomeLinkEl = document.querySelector('.js-mobile-nav-homelink');
// homeLinkEl.classList.toggle('selected');
// mobileHomeLinkEl.classList.toggle('mobile-selected');
