import { bookshelf_API } from './API';
import {createLoader, objScroll, headerNotAuthorised} from './help_functions';
import {openProfileModal} from './user_profile_modal_window';

const api = new bookshelf_API();

let abortCtrl1, loader;

const logoutModalBackDrop =  document.querySelector(".logout-modal-backdrop");
const editProfileBtn =  document.querySelector(".edit-profile-btn");
const logoutBtn =  document.querySelector(".logout-btn");

logoutBtn.addEventListener("submit", (e)=>{logoutSubmit()});
editProfileBtn.addEventListener("click", (e)=>{  closeLogoutModal();  openProfileModal(); });


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

function onAnyKeyDownLogoutModal({target, code}){
   
    if (!target.classList.contains('logout-elm') || code === 'Escape') {
        closeLogoutModal();
    }    
}


export {
    openLogoutModal,
}