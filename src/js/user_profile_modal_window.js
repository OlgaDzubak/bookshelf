import { bookshelf_API } from './API';
import { headerNotAuthorised, headerAuthorised } from './header';
import {createLoader, getCookie, capitalizeStr} from './help_functions';
import { Notify } from 'notiflix';

const api = new bookshelf_API();

const userProfileModal =  document.querySelector(".user-profile-modal");
const userProfileCloseBtn = document.querySelector(".user-profile-closeBtn");
const userProfileLoadPhotoFile =  document.querySelector("#load-photo-file");
const userProfileForm =  document.querySelector(".user-profile-form");
const userPhotoImg = document.querySelector(".user-photo-img");
const userProfileInput = document.querySelector(".user-profile-input");

userProfileCloseBtn.addEventListener("click", onCloseProfileModal);
userProfileLoadPhotoFile.addEventListener("change", onChangeProfileModalPhotoFile);
userProfileForm.addEventListener("submit", onUserProfileModalFormSubmit);

let abortCtrl1;
let fileAvatar;

export function onCloseProfileModal(){
    
    window.removeEventListener('keydown', onAnyKeyDownProfileModal);
    window.removeEventListener('mousedown', onAnyKeyDownProfileModal);
    window.removeEventListener('scroll', onCloseProfileModal);
  
    userProfileModal.classList.add("is-hidden");
}

export function onAnyKeyDownProfileModal({target, code}){
     
    if (!target.classList.contains('profile-elm') || code === 'Escape') {
        onCloseProfileModal();
    }    
}

function onChangeProfileModalPhotoFile({target}){
   
   var file = target.files[0];
   const maxSizeFile = 5 * 1024 * 1024;
  
   if (file.type.slice(0,5) != "image"){                        //|| (file.type.slice(0,9) === "image/svg"))
    
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

async function onUserProfileModalFormSubmit(e){
    
    e.preventDefault();

    const newName = capitalizeStr(userProfileInput.value);

    const accessToken = getCookie("accessToken");         // зчитуємо поточний accessToken з кукі

        if (abortCtrl1) {
            abortCtrl1.abort();
            console.log("abort previous updateUser");
        }

        try{
            abortCtrl1 = new AbortController();
              
            const formData = new FormData;
            formData.append('avatar', fileAvatar);
            formData.append('name', newName);

            const loader = createLoader(userProfileModal, "into");

            const data = await api.updateUser({accessToken, formData}, abortCtrl1);
            
            loader.remove();

            if (data.user && data.accessToken){                                                                          // якщо юзер та accessToken отримано перевіримо чи збігається accessToken, що отримано з тим який є в кукі

                if (data.accessToken != accessToken){
                   let date = new Date(Date.now() + (24 * 60 * 60 * 1000));
                   date = date.toUTCString();
                   document.cookie = `accessToken=${data.accessToken}; expires=${date}; secure`;
                }
                 
                 userProfileModal.classList.add("is-hidden");
                 userProfileInput.value = "";
                 headerAuthorised(data.user);                
             }
        }catch(error){
            if (error === "Not authorized") {
                document.cookie = 'accessToken=;  max-age=-1;';
                userProfileModal.classList.add("is-hidden");
                userProfileInput.value = "";
                headerNotAuthorised();
            } else if (error === "Wrong file format!"){
                Notify.failure('Wrong file format! Only png/jpg/jpeg file are allowed.', {
                       position: 'right-center',
                       distance: '100px',
                })
            }else{
                Notify.failure('Profile uploading failed. Please reload the page and try again.', {
                       position: 'right-center',
                       distance: '100px',
                });
            }
          }
  
}
