import { bookshelf_API } from '../API';
import { headerNotAuthorised, headerAuthorised } from '../header';
import {createLoader, objScroll, getCookie, capitalizeStr} from '../help_functions';
import { Notify } from 'notiflix';

const api = new bookshelf_API();

const userProfileModalBackdrop =  document.querySelector(".user-profile-modal-backdrop");
const userProfileModal =  document.querySelector(".user-profile-modal");
const userProfileCloseBtn = userProfileModal.querySelector(".close-button");
const userProfileLoadPhotoFile =  document.querySelector("#load-photo-file");
const userProfileForm =  document.querySelector(".user-profile-form");
const userPhotoImg = document.querySelector(".user-photo-img");
const userProfileInput = document.querySelector(".user-profile-input");

userProfileCloseBtn.addEventListener("click", (e)=>{closeProfileModal(); });
userProfileLoadPhotoFile.addEventListener("change", (e)=>{ changeProfileModalPhotoFile(e.target.files[0]); });
userProfileForm.addEventListener("submit", (e)=>{ e.preventDefault(); userProfileModalFormSubmit(); });

let abortCtrl1, fileAvatar, loader;

function openProfileModal(){
    
    objScroll.disabledScroll();
    userProfileModalBackdrop.classList.remove("is-hidden");
    window.addEventListener('keydown', onEscKeyDown);
}

function closeProfileModal(){
    
    userProfileModalBackdrop.classList.add("is-hidden");
    objScroll.enabledScroll();
    window.removeEventListener('keydown', onEscKeyDown);

    userPhotoImg.src = document.querySelector(".user-img").src;
    userProfileInput.value = "";
 
}

function changeProfileModalPhotoFile(file){
   
 //  var file = target.files[0];
   const maxSizeFile = 5 * 1024 * 1024;
  
   if (file.type.slice(0,5) != "image"){
    
        Notify.failure('Wrong file format. Please choose image file.', {
            position: 'right-center',
            distance: '100px',
        })
        fileAvatar='';
        return;
   }

    if (file.size > maxSizeFile) {
      Notify.failure('File size should be less then 5Mb.', {
        position: 'right-center',
        distance: '100px',
      })
      fileAvatar='';
      return;
    }
    fileAvatar = file;
    userPhotoImg.src =  URL.createObjectURL(file);

}    

async function userProfileModalFormSubmit(){
    
     if (abortCtrl1) { abortCtrl1.abort(); }
 
     try{
 
         const newName = capitalizeStr(userProfileInput.value);
 
         const formData = new FormData;
         formData.append('avatar', fileAvatar);
         formData.append('name', newName);
 
         loader = createLoader(userProfileModal, "into", ["loader-modal"]);
         
         abortCtrl1 = new AbortController();
         const data = await api.updateUser(formData, abortCtrl1);
         
         if (data.user){
            loader.remove();
            closeProfileModal();
            headerAuthorised(data.user);                
         }else{
             throw new Error(data);
         }

     }catch(error){
         
         loader.remove();
         
         if(error.message === "Not authorized") {
             closeProfileModal();
             headerNotAuthorised();
         }else if (error.message === "Wrong file format!"){
            Notify.failure('Wrong file format! Only png/jpg/jpeg file are allowed.', 
                          { position: 'right-center', distance: '330px',})
         }else{
              Notify.failure('Profile uploading failed. Please reload the page and try again.', 
                          { position: 'right-center', distance: '100px',});
         }
     }

}

function onEscKeyDown(e) {
    if (e.code === 'Escape') {
        closeProfileModal();
    }
}

export {
openProfileModal,
}
