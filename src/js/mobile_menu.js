
const pageWidth = document.documentElement.scrollWidth ; 
let mobileMenu, burgerIcon, closeMobileMenuIcon, userLoginMobileBtn, mobileNavigation, authMobileBtn;

if (pageWidth < 768) { 
    
    createMobileMenuMarkUp();

    mobileMenu = document.querySelector('.mobile-menu');
    burgerIcon = document.querySelector('.burger-icon');
    closeMobileMenuIcon = document.querySelector('.close-mobile-menu-icon');
    userLoginMobileBtn = document.querySelector('.user-login');
    mobileNavigation = document.querySelector('.navigation');
    authMobileBtn = document.querySelector('.auth-btn');

    authMobileBtn.addEventListener('click', onOpenMobileMenu);

}else{

    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.remove();

}


// ----------------------------------------------------------------------------------------------

function onOpenMobileMenu(evt) {
  if (closeMobileMenuIcon.classList.contains('is-hidden')) {

    closeMobileMenuIcon.classList.remove('is-hidden');
    burgerIcon.classList.add('is-hidden');

    showMobileMenu();

  } else {

    closeMobileMenuIcon.classList.add('is-hidden');
    burgerIcon.classList.remove('is-hidden');

    hideMobileMenu();
  }
}

function showMobileMenu() {
  mobileMenu.classList.remove('is-hidden');
}

function hideMobileMenu() {
  mobileMenu.classList.add('is-hidden');
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
          
          <div  class="auth-triangle-icon-div">
              <svg class="auth-triangle-icon">
                  <use href="/src/images/svg/sprite.svg#auth-triangle"></use>
              </svg>
          </div>
          
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

      <button class="logout-mobile-btn is-hidden" type="button">Log out</button>

    </div>`

  mobileMenu.innerHTML = mobileMenuMarkup;
}

export {
  onOpenMobileMenu,
}