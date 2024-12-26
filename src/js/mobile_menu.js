import { openAuthModal } from './autorization_modal_window';
import { openLogoutModal } from './logout_modal_window';

const pageWidth = document.documentElement.scrollWidth ; 
let  userLoginBtn, navigation, authBtn;

if (pageWidth < 768) { 
    
    createMobileMenuMarkUp();

    userLoginBtn = document.querySelector('.user-login-btn');
    navigation = document.querySelector('.navigation');
    authBtn = document.querySelector('.auth-btn');
        
    userLoginBtn.addEventListener('click', openAuthModal);
    authBtn.addEventListener('click', openLogoutModal);

}else{
    
    document.querySelector('.mobile-menu').remove();

}


// ----------------------------------------------------------------------------------------------

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

function createMobileMenuMarkUp(){
  const mobileMenu =  document.querySelector('.mobile-menu');

  const mobileMenuMarkup = `
    <div class="mobile-menu-container container">
  
      <div class="user-login-and-navigation-div">
    
        <button class="user-login-btn link">Sign up<svg class="icon-arrow-right" width="20" height="20">
          <use href="/src/images/svg/sprite.svg#arrow_narrow_right_icon"></use></svg>
        </button>

        <button class="auth-btn is-hidden">
          <div  class="user-img-div">
              <img class="user-img" alt="user photo" src="/src/images/svg/sprite.svg#name_icon"/>
          </div>
          <p class="login-p">Login</p>
        </button>

        <nav class="navigation">

            <ul class="nav-list list">

                <li class="nav-item">
                    <a class="home-link link js-mobile-nav-homelink" href="/src/index.html" aria-label="Посилання на головну сторінку">HOME</a>
                </li>

                <li class="nav-item">
                    <a class="shopping-link link js-mobile-nav-shoppinglistlink" 
                      href="/src/shopping_list_page.html" 
                      aria-label="Посилання на сторінку Shopping List"
                    >
                        <span>SHOPPING LIST</span>

                        <svg class="shopping-bag-icon js-mobile-shopping-bag-icon" width="20" height="20">
                            <use href="/src/images/svg/sprite.svg#shopping-bag-icon"></use>
                        </svg>

                        <div class="ordered-amount-box">
                          <p class="ordered-amount"></p>
                        </div>

                    </a>
                </li>

            </ul>
        </nav>

      </div>

      <button class="logout-btn is-hidden" type="button">Log out</button>

    </div>`

  mobileMenu.innerHTML = mobileMenuMarkup;
}

export {
  openMobileMenu,
}