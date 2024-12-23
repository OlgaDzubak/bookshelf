import { bookshelf_API } from './API';
import {createLoader, objScroll, headerNotAuthorised} from './help_functions';

const api = new bookshelf_API();

let abortCtrl1, loader;

const userProfileModalBackdrop = document.querySelector(".user-profile-modal-backdrop");
const logoutModalBackDrop =  document.querySelector(".logout-modal-backdrop");

const editProfileBtn =  document.querySelector(".edit-profile-btn");
const logoutBtn =  document.querySelector(".logout-btn");

logoutBtn.addEventListener("submit", onLogoutSubmit);
editProfileBtn.addEventListener("click", onEditProfileBtnClick);






function onEditProfileBtnClick(){
    onCloseLogoutModal();    
    objScroll.disabledScroll();
    userProfileModalBackdrop.classList.remove("is-hidden");
}

export function onCloseLogoutModal(){

        window.removeEventListener('keydown', onAnyKeyDownLogoutModal);
        window.removeEventListener('mousedown', onAnyKeyDownLogoutModal);
        window.removeEventListener('scroll', onCloseLogoutModal);
      
        logoutModalBackDrop.classList.add("is-hidden");
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