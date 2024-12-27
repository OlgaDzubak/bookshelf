
import './js/isChangeTheme';
import './js/header';
import './js/support_ukraine';
import './js/books';
import './js/modal_windows/mobile_menu';
import './js/modal_windows/logout_modal_window';
import './js/modal_windows/autorization_modal_window';
import './js/modal_windows/user_profile_modal_window';
import './js/modal_windows/book_modal_window';
import './js/modal_windows/about_us_modal_window';

const homeLinkEl = document.querySelector('.js-nav-homelink');
const mobileHomeLinkEl = document.querySelector('.js-mobile-nav-homelink');
homeLinkEl.classList.toggle('selected');
mobileHomeLinkEl.classList.toggle('mobile-selected');
