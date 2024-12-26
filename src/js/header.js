
import { displayOrdredAmountInShoppingBag } from './help_functions';
import { bookshelf_API } from './API';
import { openLogoutModal } from './logout_modal_window';

const api = new bookshelf_API();
let abortCtrl;

const navigation = document.querySelector('.navigation');
const userLoginBtn = document.querySelector('.user-login-btn');
const authBtn = document.querySelector('.auth-btn');
const authBtnImg= authBtn.querySelector('.user-img');
const authBtnName= authBtn.querySelector('.login-p');
const userPhotoImg = document.querySelector(".user-photo-img");

authBtn.addEventListener('click', ()=>{openLogoutModal()});

showHeader();


// ----------------------------------------------------------------------------------------------

async function showHeader(){

        if (abortCtrl) { abortCtrl.abort(); }
        
        try{

            abortCtrl = new AbortController();

            const {user} = await api.refreshUser(abortCtrl);

            if (user){
                headerAuthorised(user);                
            }else{ 
                throw new Error("Not authorized");
            }

        }catch(error){
            headerNotAuthorised();
        }
}


function headerNotAuthorised(){

    document.cookie = 'accessToken=;  max-age=-1;';
    localStorage.removeItem("bookshelf_orderedbooks");

    userLoginBtn.classList.remove("is-hidden");
    //userLoginMobileBtn.classList.remove("is-hidden");

    authBtn.classList.add("is-hidden");
    //authMobileBtn.classList.add("is-hidden");

    navigation.classList.add("is-hidden");
    //navigationMobile.classList.add("is-hidden");

}

function headerAuthorised(user){
    
    authBtnName.textContent = user.name;
    // authMobileBtnName.textContent = user.name;

    if (user.avatarURL){
        
        authBtnImg.src = user.avatarURL;
      //  authMobileBtnImg.src = user.avatarURL;
        
        userPhotoImg.src = user.avatarURL;

    }else{
        authBtnImg.src = "/src/images/svg/sprite.svg#name_icon";
     //   authMobileBtnImg.src = "/src/images/svg/sprite.svg#name_icon";

        userPhotoImg.src = "/src/images/svg/sprite.svg#name_icon";
    }
    
    userLoginBtn.classList.add("is-hidden");
  //  userLoginMobileBtn.classList.add("is-hidden");

    authBtn.classList.remove("is-hidden");
 //   authMobileBtn.classList.remove("is-hidden");

    navigation.classList.remove("is-hidden");
 //   navigationMobile.classList.remove("is-hidden");    

    if (user.shopping_list.length > 0){
        displayOrdredAmountInShoppingBag(user.shopping_list);
        localStorage.setItem("bookshelf_orderedbooks",JSON.stringify(user.shopping_list));
    }
}


function createNonMobileHeaderMarkUp(){
    const header =  document.querySelector('.header');
    const headerMarkup = `
       <div class="container">

            <div class="logo-and-navigation">

                <a class="logo-link link" href="/src/index.html" aria-label="Посилання на головну сторінку">
                    <svg class="logo-icon" width="24" height="24">
                        <use href="/src/images/svg/sprite.svg#logo-icon"></use>
                    </svg>Bookshelf
                </a>

            </div>
        
            <div class="switch-burger-login">

                <label class="switch">
                    <input type="checkbox"  name="theme" id="theme-switch-toggle" aria-label="Переключить между тёмной и светлой темой" />
                    <span class="slider round"></span>
                </label>
                
                <div class="log-div">

                    <button class="user-login-btn link is-hidden">Sign up<svg class="icon-arrow-right" width="20" height="20">
                        <use href="/src/images/svg/sprite.svg#arrow-narrow-right-icon"></use></svg>
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

                </div>

        </div>`
    header.innerHTML = headerMarkup;
}

function createMobileHeaderMarkUp(){

    const header =  document.querySelector('.header');

    const headerMarkup = `
        <div class="container">

            <div class="logo-and-navigation">

                <a class="logo-link link" href="/src/index.html" aria-label="Посилання на головну сторінку">
                    <svg class="logo-icon" width="24" height="24">
                        <use href="/src/images/svg/sprite.svg#logo-icon"></use>
                    </svg>Bookshelf
                </a>

                <nav class="navigation is-hidden">

                    <ul class="nav-list list">

                        <li class="nav-item">
                            <a class="home-link js-nav-homelink link" href="/src/index.html" aria-label="Посилання на головну сторінку">HOME</a>
                        </li>

                        <li class="nav-item">

                            <a  class="shopping-link link js-nav-shoppinglistlink" 
                                href="/src/shopping_list_page.html" 
                                aria-label="Посилання на сторінку Shopping List"
                            >
                                <span>SHOPPING LIST</span>
                                
                                <svg class="shopping-bag-icon" width="20" height="20">
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
        
            <div class="switch-burger-login">

                <label class="switch">
                    <input type="checkbox"  name="theme" id="theme-switch-toggle" aria-label="Переключить между тёмной и светлой темой" />
                    <span class="slider round"></span>
                </label>
                
                <div class="log-div">

                    <button class="burger-menu js-open-mobile-menu" type="button" aria-label="mobile menu">
                        <svg class="burger-logo">
                        <use class="icon-burger-mobile-menu" href="/src/images/svg/sprite.svg#burger-menu-icon"></use>
                        <use class="icon-close-mobile-menu is-hidden" href="/src/images/svg/sprite.svg#x-close-icon"></use>
                        </svg>
                    </button>

                </div>
            </div>

        </div>`

    header.innerHTML = headerMarkup;
}


export {
    headerNotAuthorised,
    headerAuthorised,
    createMobileHeaderMarkUp,
    createNonMobileHeaderMarkUp,
}