import { bookshelf_API } from './API';
import {getCookie} from './help_functions';

const api = new bookshelf_API();

const userProfileModal =  document.querySelector(".user-profile-modal");
const userProfileCloseBtn = document.querySelector(".user-profile-closeBtn");
const userProfileAddPhotoBtn =  document.querySelector(".add-photo-btn");
const userProfileForm =  document.querySelector(".user-profile-form");

userProfileCloseBtn.addEventListener("click", onCloseProfileModalClick);
userProfileAddPhotoBtn.addEventListener("click", onAddPhotoBtnClick);
userProfileForm.addEventListener("submit", onUserProfileFormSubmit);

let abortCtrl1;

export function onCloseProfileModalClick(){
    
    window.removeEventListener('keydown', onAnyKeyDownProfileModal);
    window.removeEventListener('mousedown', onAnyKeyDownProfileModal );
    window.removeEventListener('scroll', onCloseProfileModalClick );
  
    userProfileModal.classList.add("is-hidden");
}

export function onAnyKeyDownProfileModal({target, code}){
     
    if (!target.classList.contains('profile-elm') || code === 'Escape') {
        onCloseProfileModalClick();
    }    
}

function onAddPhotoBtnClick(){
  // дописати обрання файла фото
  
}

async function onUserProfileFormSubmit(e){
    
    e.preventDefault();

    const userProfileInput = document.querySelector(".user-profile-input");

    const newName = userProfileInput.value;
    console.log("newName=",newName);

    const accessToken = getCookie("accessToken");         // зчитуємо поточний accessToken з кукі

    

    if (!accessToken){
        
        // не авторизовано

    }else{

        console.log("accessToken=", accessToken);
        
        if (abortCtrl1) {
            abortCtrl1.abort();
            console.log("abort previous updateUser");
        }

        try{
            abortCtrl1 = new AbortController();

            const formData = new FormData;
            formData.append('name', newName);

            const data = await api.updateUser(accessToken, formData, abortCtrl1)
            
            if (data){
                console.log("dataNewUserName=",data);
            }

        }catch(error){
            console.log(error);
        }
    }
   
}
