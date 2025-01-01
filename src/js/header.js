
import { displayOrdredAmountInShoppingBag } from './help_functions';
import { bookshelf_API } from './API';
import { openAuthModal } from './modal_windows/autorization_modal_window';
import { openLogoutModal } from './modal_windows/logout_modal_window';
import { openMobileMenu } from './modal_windows/mobile_menu';
import { openProfileModal } from './modal_windows/user_profile_modal_window';

import userIcon from  '../images/svg/user_Icon.svg';

const api = new bookshelf_API();
let abortCtrl;

const burgerBtn = document.querySelector(".burger-menu-btn");
const navigation = document.querySelector('.navigation');
const mobileNavigation = document.querySelector('.mobile-menu .navigation');
const userLoginBtn = document.querySelector('.user-login-btn');
const userMobileLoginBtn = document.querySelector('.mobile-menu .user-login-btn');
const authBtn = document.querySelector('.auth-btn');
const authBtnImg= authBtn.querySelector('.user-img');
const authBtnName= authBtn.querySelector('.login-p');
const authMobileBtn = document.querySelector('.mobile-menu .auth-btn');
const authMobileBtnImg= authMobileBtn.querySelector('.user-img');
const authMobileBtnName= authMobileBtn.querySelector('.login-p');
const userPhotoImg = document.querySelector('.user-photo-img');
const userMobileMenuLogoutBtn = document.querySelector('.mobile-menu .logout-btn');

burgerBtn.addEventListener('click', openMobileMenu);
userLoginBtn.addEventListener('click', openAuthModal);
userMobileLoginBtn.addEventListener('click', openAuthModal);
authBtn.addEventListener('click', openLogoutModal);
authMobileBtn.addEventListener('click', openProfileModal);

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
                headerNotAuthorised();
            }

        }catch(error){
            headerNotAuthorised();
        }
}
function headerNotAuthorised(){
    
    document.cookie = 'accessToken=;  max-age=-1;';
    localStorage.removeItem("bookshelf_orderedbooks");

    userLoginBtn.classList.remove("is-hidden");
    userMobileLoginBtn.classList.remove("is-hidden");

    authBtn.classList.add("is-hidden");
    authMobileBtn.classList.add("is-hidden");
    navigation.classList.add("is-hidden");
    mobileNavigation.classList.add("is-hidden");
    userMobileMenuLogoutBtn.classList.add("is-hidden");
}
function headerAuthorised(user){

    authBtnName.textContent = user.name;
    authMobileBtnName.textContent = user.name;

    if (user.avatarURL){
        authBtnImg.src = user.avatarURL;
        authMobileBtnImg.src = user.avatarURL;
        userPhotoImg.src = user.avatarURL;
    }else{
        authBtnImg.src = userIcon;
        authMobileBtnImg.src = userIcon;
        userPhotoImg.src = userIcon;
    }
    
    userLoginBtn.classList.add("is-hidden");
    userMobileLoginBtn.classList.add("is-hidden");

    authBtn.classList.remove("is-hidden");
    authMobileBtn.classList.remove("is-hidden");
    userMobileMenuLogoutBtn.classList.remove("is-hidden");
    navigation.classList.remove("is-hidden");
    mobileNavigation.classList.remove("is-hidden");
    
    if (user.shopping_list.length > 0){
        displayOrdredAmountInShoppingBag(user.shopping_list);
        localStorage.setItem("bookshelf_orderedbooks",JSON.stringify(user.shopping_list));
    }

    
}

export {
    headerNotAuthorised,
    headerAuthorised,    
}