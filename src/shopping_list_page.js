import './js/header';
import './js/isChangeTheme';
import './js/shopping_list';
import './js/support_ukraine';
import './js/modal_windows/mobile_menu';
import './js/modal_windows/about_us_modal_window';
import './js/modal_windows/autorization_modal_window';
import './js/modal_windows/logout_modal_window';
import './js/modal_windows/user_profile_modal_window';


const shoppingListLinkEl = document.querySelector('.js-nav-shoppinglistlink');
const mobileShoppingListLinkEl = document.querySelector('.js-mobile-nav-shoppinglistlink');
const mobileShoppingBagIconEl = document.querySelector('.js-mobile-shopping-bag-icon');

shoppingListLinkEl.classList.toggle('selected');
mobileShoppingListLinkEl.classList.toggle('mobile-selected');
mobileShoppingBagIconEl.classList.toggle('mobile-selected');
