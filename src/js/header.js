
import { displayOrdredAmountInShoppingBag } from './help_functions';
import { bookshelf_API } from './API';
import { openLogoutModal } from './logout_modal_window';

const api = new bookshelf_API();
let abortCtrl;

const navigation = document.querySelector('.navigation');
const navigationMobile = document.querySelector('mobile-navigation');

const userLoginBtn = document.querySelector('.user-login-btn');
const userLoginMobileBtn = document.querySelector('.user-login-mobile-btn');

const authBtn = document.querySelector('.auth-btn');
const authMobileBtn = document.querySelector('.auth-mobile-btn');

const authBtnImg= authBtn.querySelector('.user-img');
const authMobileBtnImg= authBtn.querySelector('.user-mobile-img');

const authBtnName= authBtn.querySelector('.login-p');
const authMobileBtnName= authBtn.querySelector('.login-mobile-p');

const userPhotoImg = document.querySelector(".user-photo-img");


authBtn.addEventListener('click', ()=>{openLogoutModal()});

showHeader();


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
    userLoginMobileBtn.classList.remove("is-hidden");

    authBtn.classList.add("is-hidden");
    authMobileBtn.classList.add("is-hidden");

    navigation.classList.add("is-hidden");
    navigationMobile.classList.add("is-hidden");

}

function headerAuthorised(user){
    authBtnName.textContent = user.name;
    if (user.avatarURL){
        
        authBtnImg.src = user.avatarURL;
        authMobileBtnImg.src = user.avatarURL;
        
        userPhotoImg.src = user.avatarURL;

    }else{
        authBtnImg.src = "/src/images/svg/sprite.svg#name_icon";
        authMobileBtnImg.src = "/src/images/svg/sprite.svg#name_icon";

        userPhotoImg.src = "/src/images/svg/sprite.svg#name_icon";
    }
    
    userLoginBtn.classList.add("is-hidden");
    userLoginMobileBtn.classList.add("is-hidden");

    authBtn.classList.remove("is-hidden");
    authMobileBtn.classList.remove("is-hidden");

    navigation.classList.remove("is-hidden");
    navigationMobile.classList.remove("is-hidden");    

    if (user.shopping_list.length > 0){
        displayOrdredAmountInShoppingBag(user.shopping_list);
        localStorage.setItem("bookshelf_orderedbooks",JSON.stringify(user.shopping_list));
    }
}

export {
    headerNotAuthorised,
    headerAuthorised,
}