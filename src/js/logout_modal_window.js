import { bookshelf_API } from './API';
import {createLoader, headerNotAuthorised} from './help_functions';

const api = new bookshelf_API();

const userProfileModal = document.querySelector(".user-profile-modal");
const logoutModal =  document.querySelector(".logout-modal");

const editProfileBtn =  document.querySelector(".edit-profile-btn");
const logoutBtn =  document.querySelector(".logout-btn");

logoutBtn.addEventListener("submit", onLogoutSubmit);
editProfileBtn.addEventListener("click", onEditProfileBtnClick);

let abortCtrl1, loader;


function onEditProfileBtnClick(){
    onCloseLogoutModal();    
    userProfileModal.classList.remove("is-hidden");
}

export function onCloseLogoutModal(){

        window.removeEventListener('keydown', onAnyKeyDownLogoutModal);
        window.removeEventListener('mousedown', onAnyKeyDownLogoutModal);
        window.removeEventListener('scroll', onCloseLogoutModal);
      
        logoutModal.classList.add("is-hidden");
}

export function onAnyKeyDownLogoutModal({target, code}){
   
    if (!target.classList.contains('logout-elm') || code === 'Escape') {
        onCloseLogoutModal();
    }    
}

async function onLogoutSubmit(){
    e.preventDefault();

    if (abortCtrl1) {
        abortCtrl1.abort();
    }

    try{

        const accessToken = getCookie("accessToken");        
 
        loader = createLoader(userProfileModal, "into");
        loader.classList.add("loader-modal");
        loader.classList.add("logout-elm");
        
        abortCtrl1 = new AbortController();
        const data = await api.logout({accessToken}, abortCtrl1);
        
    }catch(error){
        loader.remove();
        console.dir(error.message);
    }
}