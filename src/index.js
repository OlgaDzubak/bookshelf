import './js/header';
import './js/isChangeTheme';
import './js/support_ukraine';
import './js/books';

import './js/autorization_modal_window';
import './js/book_modal_window';
import './js/mobile_menu';
import './js/about_us_modal_window';


const homeLinkEl = document.querySelector('.js-nav-homelink');
const mobileHomeLinkEl = document.querySelector('.js-mobile-nav-homelink');
homeLinkEl.classList.toggle('selected');
mobileHomeLinkEl.classList.toggle('mobile-selected');