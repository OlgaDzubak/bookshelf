import './js/header';
import './js/isChangeTheme';
import './js/shopping_list';
import './js/support_ukraine';
import './js/modal_windows/mobile_menu';
import './js/modal_windows/about_us_modal_window';
import './js/modal_windows/autorization_modal_window';
import './js/modal_windows/logout_modal_window';
import './js/modal_windows/user_profile_modal_window';


document.querySelector('.header .shopping-link').classList.toggle('selected');
document.querySelector('.mobile-menu .shopping-link').classList.toggle('selected');
document.querySelector('.mobile-menu .shopping-bag-icon').classList.toggle('selected');

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      location.reload();
    }
  });