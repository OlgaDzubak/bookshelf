import { bookshelf_API } from './API';
import {createLoader} from './help_functions';
import {headerNotAuthorised} from './header'
import {openProfileModal} from './user_profile_modal_window';

const api = new bookshelf_API();

let abortCtrl1, loader, logoutModal, editProfileBtn, logoutBtn;

const pageWidth = document.documentElement.scrollWidth;
if (pageWidth < 768) { 
    document.querySelector('.logout-modal-backdrop').remove();
    logoutModal = document.querySelector(".mobile-menu");
    logoutBtn = logoutModal.querySelector(".logout-btn");
}else{
    logoutModal = document.querySelector(".logout-modal");
    logoutBtn = logoutModal.querySelector(".logout-btn");
    editProfileBtn = logoutModal.querySelector(".edit-profile-btn");
    editProfileBtn.addEventListener("click", (e)=>{ closeLogoutModal();  openProfileModal(); });
}

logoutBtn.addEventListener("click", logout);



//-----------------------------------------------------------------------------------------------------------

function openLogoutModal(){

    document.querySelector(".logout-modal-backdrop").classList.remove("is-hidden");  

    window.addEventListener('keydown', onAnyKeyDownLogoutModal);
    window.addEventListener('mousedown', onAnyKeyDownLogoutModal);
    window.addEventListener('scroll', ()=>{closeLogoutModal()});
}

function closeLogoutModal(){

    window.removeEventListener('keydown', onAnyKeyDownLogoutModal);
    window.removeEventListener('mousedown', onAnyKeyDownLogoutModal);
    window.removeEventListener('scroll',  ()=>{closeLogoutModal()});
  
    document.querySelector(".logout-modal-backdrop").classList.add("is-hidden");
}

async function logout(){   
    
    if (abortCtrl1) {
        abortCtrl1.abort();
    }

    try{
        loader = createLoader(logoutModal, "into", ["loader-logout-modal", "logout-elm"]);
        
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