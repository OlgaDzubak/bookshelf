
import { displayOrdredAmountInShoppingBag } from './help_functions';
import { bookshelf_API } from './API';
import { createLoader } from './help_functions';
import {openLogoutModal} from './logout_modal_window';

const api = new bookshelf_API();
let abortCtrl;

const navigation = document.querySelector('.navigation');
const openBtn = document.querySelector('.jsOpenBtn');
const authBtn = document.querySelector('.auth-btn');
const authBtnImg= authBtn.querySelector('.user-img');
const userPhotoImg = document.querySelector(".user-photo-img");
const authBtnName= authBtn.querySelector('.login-p');
const logoutModalBackDrop = document.querySelector(".logout-modal-backdrop");

authBtn.addEventListener('click', ()=>{openLogoutModal()});

showHeader();


async function showHeader(){

        if (abortCtrl) { abortCtrl.abort(); }
        
        try{

            abortCtrl = new AbortController();

            //const ss = createLoader();
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

export function headerNotAuthorised(){

    console.log("headerNotAuthorised");

    document.cookie = 'accessToken=;  max-age=-1;';
    localStorage.removeItem("bookshelf_orderedbooks");
    console.log("headerNotAuthorised");
    openBtn.classList.remove("is-hidden");
    authBtn.classList.add("is-hidden");
    navigation.classList.add("is-hidden");    
}

export function headerAuthorised(user){
    authBtnName.textContent = user.name;
    if (user.avatarURL){
        authBtnImg.src = user.avatarURL;
        userPhotoImg.src = user.avatarURL;
    }else{
        authBtnImg.src = "/src/images/svg/sprite.svg#name_icon";
        userPhotoImg.src = "/src/images/svg/sprite.svg#name_icon";
    }
    
    openBtn.classList.add("is-hidden");
    authBtn.classList.remove("is-hidden");
    navigation.classList.remove("is-hidden");    

    if (user.shopping_list.length > 0){
        displayOrdredAmountInShoppingBag(user.shopping_list);
        localStorage.setItem("bookshelf_orderedbooks",JSON.stringify(user.shopping_list));
    }
}
