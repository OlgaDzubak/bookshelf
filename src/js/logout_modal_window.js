import { bookshelf_API } from './API';
import {createLoader} from './help_functions';
import {headerNotAuthorised} from './header'
import {openProfileModal} from './user_profile_modal_window';

const api = new bookshelf_API();

let abortCtrl1, loader;

const logoutModalBackDrop =  document.querySelector(".logout-modal-backdrop");
const logoutModal =  document.querySelector(".logout-modal");
const editProfileBtn =  document.querySelector(".edit-profile-btn");
const logoutBtn =  document.querySelector(".logout-btn");

logoutBtn.addEventListener("click", logoutSubmit);
editProfileBtn.addEventListener("click", (e)=>{ closeLogoutModal();  openProfileModal(); });

function openLogoutModal(){

    logoutModalBackDrop.classList.remove("is-hidden");  

    window.addEventListener('keydown', onAnyKeyDownLogoutModal);
    window.addEventListener('mousedown', onAnyKeyDownLogoutModal);
    window.addEventListener('scroll', ()=>{closeLogoutModal()});
}

function closeLogoutModal(){

    window.removeEventListener('keydown', onAnyKeyDownLogoutModal);
    window.removeEventListener('mousedown', onAnyKeyDownLogoutModal);
    window.removeEventListener('scroll',  ()=>{closeLogoutModal()});
  
    logoutModalBackDrop.classList.add("is-hidden");
}

async function logoutSubmit(){   
    
    if (abortCtrl1) {
        abortCtrl1.abort();
    }

    try{
        loader = createLoader(logoutModal, "into", ["loader-modal", "logout-elm"]);
        
        abortCtrl1 = new AbortController();
        const data = await api.logout(abortCtrl1);
        
        loader.remove();       

        closeLogoutModal();
        headerNotAuthorised();

    }catch(error){

        loader.remove();
        console.log("error = ",error);
    }
}

function onAnyKeyDownLogoutModal({target, code}){
   
    if (!target.classList.contains('logout-elm') || code === 'Escape') {
        closeLogoutModal();
    }    
}

export {
    openLogoutModal,
}