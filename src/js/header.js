
import { displayOrdredAmountInShoppingBag } from './help_functions';
import { bookshelf_API } from './API';
import { OpenAuthModal } from './autorization_modal_window';
import { openLogoutModal } from './logout_modal_window';
import { onOpenMobileMenu } from './mobile_menu';
import userIcon from  '../images/svg/user_Icon.svg';

const api = new bookshelf_API();
let burgerBtn, navigation, userLoginBtn, authBtn, authBtnImg, authBtnName, userPhotoImg, abortCtrl;

const pageWidth = document.documentElement.scrollWidth ; 
if (pageWidth < 768) {

    createMobileHeaderMarkUp();

    burgerBtn = document.querySelector(".burger-menu-btn");
    burgerBtn.addEventListener('click', ()=>{onOpenMobileMenu()});

}else{
    
    createNonMobileHeaderMarkUp();
}

navigation = document.querySelector('.navigation');
userLoginBtn = document.querySelector('.user-login-btn');
authBtn = document.querySelector('.auth-btn');
authBtnImg= authBtn.querySelector('.user-img');
authBtnName= authBtn.querySelector('.login-p');
userPhotoImg = document.querySelector('.user-photo-img');

userLoginBtn.addEventListener('click', OpenAuthModal);
authBtn.addEventListener('click', openLogoutModal);


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
    authBtn.classList.add("is-hidden");
    navigation.classList.add("is-hidden");

}
function headerAuthorised(user){
    
    authBtnName.textContent = user.name;

    if (user.avatarURL){
        authBtnImg.src = user.avatarURL;
        userPhotoImg.src = user.avatarURL;
    }else{
        authBtnImg.src = userIcon;
        userPhotoImg.src = userIcon;
    }
    
    userLoginBtn.classList.add("is-hidden");
    authBtn.classList.remove("is-hidden");
    navigation.classList.remove("is-hidden");

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
                    <svg viewBox="0 0 32 32" class="logo-icon" width="24" height="24">
                        <path fill="#f6f6f6" style="fill: var(--color2, #f6f6f6)" d="M0 0l16.343 16.172 15.657 15.828v-32h-32z"></path>
                        <path fill="#f6f6f6" style="fill: var(--color2, #f6f6f6)" d="M4.457 4.228l11.943 11.829 11.257 11.485h-23.2v-23.315z"></path>
                        <path fill="#4f2ee8" style="fill: var(--color3, #4f2ee8)" d="M27.733 27.619l-11.944-11.829-11.256-11.485h23.2v23.315z"></path>
                        <path fill="#4f2ee8" style="fill: var(--color3, #4f2ee8)" d="M9.257 9.028l13.6 13.601h-13.6v-13.6z"></path>
                        <path fill="#f6f6f6" style="fill: var(--color2, #f6f6f6)" d="M9.257 9.028l13.6 13.601v-13.6h-13.6z"></path>
                    </svg>
                    Bookshelf
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
                                
                                <svg viewBox="0 0 32 32" class="shopping-bag-icon" width="20" height="20">
                                    <path style="fill: var(--text-dark-color), #111111)" d="M25.333 9.333h-4v-1.333c0-2.945-2.388-5.333-5.333-5.333s-5.333 2.388-5.333 5.333v0 1.333h-4c-0 0-0.001 0-0.002 0-0.736 0-1.333 0.597-1.333 1.333 0 0.001 0 0.001 0 0.002v-0 14.666c0 2.209 1.791 4 4 4v0h13.334c2.209 0 4-1.791 4-4v0-14.666c0-0 0-0.001 0-0.002 0-0.736-0.597-1.333-1.333-1.333-0.001 0-0.001 0-0.002 0h0zM13.333 8c0-1.473 1.194-2.667 2.667-2.667s2.667 1.194 2.667 2.667v1.333h-5.334v-1.333zM24 25.333c0 0 0 0.001 0 0.002 0 0.736-0.597 1.333-1.333 1.333h-13.334c-0.736 0-1.333-0.597-1.333-1.333 0-0.001 0-0.001 0-0.002v0-13.333h2.667v1.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v0-1.333h5.334v1.333c0.036 0.708 0.619 1.269 1.333 1.269s1.297-0.561 1.333-1.266l0-0.003v-1.333h2.667v13.333z"></path>
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

                    <button class="user-login-btn link is-hidden">Sign up<svg class="icon-arrow-right" width="20" height="20">
                        <svg id="arrow-right-icon" viewBox="0 0 32 32">
                            <path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="3.2" d="M5.333 16h21.333M26.667 16l-8-8M26.667 16l-8 8"></path>
                        </svg>
                    </button>

                    <button class="auth-btn is-hidden">

                        <div  class="user-img-div">
                            <img class="user-img" alt="user photo" src=${userIcon}/>
                        </div>

                        <p class="login-p">Login</p>
                        
                        <div  class="auth-triangle-icon-div">
                            <svg viewBox="0 0 15 8" class="auth-triangle-icon">
                                <path d="M0.791748 0.75H14.2084L8.17762 7.56742C7.99791 7.77051 7.7542 7.8846 7.50008 7.8846C7.24597 7.8846 7.00225 7.77051 6.82254 7.56742L0.791748 0.75Z"/>
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
                    <svg viewBox="0 0 32 32" class="logo-icon" width="24" height="24">
                        <path fill="#f6f6f6" style="fill: var(--color2, #f6f6f6)" d="M0 0l16.343 16.172 15.657 15.828v-32h-32z"></path>
                        <path fill="#f6f6f6" style="fill: var(--color2, #f6f6f6)" d="M4.457 4.228l11.943 11.829 11.257 11.485h-23.2v-23.315z"></path>
                        <path fill="#4f2ee8" style="fill: var(--color3, #4f2ee8)" d="M27.733 27.619l-11.944-11.829-11.256-11.485h23.2v23.315z"></path>
                        <path fill="#4f2ee8" style="fill: var(--color3, #4f2ee8)" d="M9.257 9.028l13.6 13.601h-13.6v-13.6z"></path>
                        <path fill="#f6f6f6" style="fill: var(--color2, #f6f6f6)" d="M9.257 9.028l13.6 13.601v-13.6h-13.6z"></path>
                    </svg>
                    Bookshelf
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
                                
                                <svg viewBox="0 0 32 32" class="shopping-bag-icon" width="20" height="20">
                                    <path d="M25.333 9.333h-4v-1.333c0-2.945-2.388-5.333-5.333-5.333s-5.333 2.388-5.333 5.333v0 1.333h-4c-0 0-0.001 0-0.002 0-0.736 0-1.333 0.597-1.333 1.333 0 0.001 0 0.001 0 0.002v-0 14.666c0 2.209 1.791 4 4 4v0h13.334c2.209 0 4-1.791 4-4v0-14.666c0-0 0-0.001 0-0.002 0-0.736-0.597-1.333-1.333-1.333-0.001 0-0.001 0-0.002 0h0zM13.333 8c0-1.473 1.194-2.667 2.667-2.667s2.667 1.194 2.667 2.667v1.333h-5.334v-1.333zM24 25.333c0 0 0 0.001 0 0.002 0 0.736-0.597 1.333-1.333 1.333h-13.334c-0.736 0-1.333-0.597-1.333-1.333 0-0.001 0-0.001 0-0.002v0-13.333h2.667v1.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v0-1.333h5.334v1.333c0.036 0.708 0.619 1.269 1.333 1.269s1.297-0.561 1.333-1.266l0-0.003v-1.333h2.667v13.333z"></path>
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

                    <button class="burger-menu-btn" type="button" aria-label="mobile menu">
                        <svg class="burger-icon" viewBox="0 0 32 32">
                            <path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M22.667 13.333h-18.667"></path>
                            <path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M28 8h-24"></path>
                            <path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M28 18.667h-24"></path>
                            <path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M22.667 24h-18.667"></path>
                        </svg>

                        <svg class="close-mobile-menu-icon is-hidden" viewBox="0 0 32 32">
                            <path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="3.4286" d="M24 8l-16 16M8 8l16 16"></path>
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
}