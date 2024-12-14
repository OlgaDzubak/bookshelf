import { bookshelf_API } from './API';
import { headerNotAuthorised, headerAuthorised } from './header';
import {createLoader, getCookie, capitalizeStr} from './help_functions';

const api = new bookshelf_API();

const userProfileModal =  document.querySelector(".user-profile-modal");
const userProfileCloseBtn = document.querySelector(".user-profile-closeBtn");
const userProfileLoadPhotoFile =  document.querySelector("#load-photo-file");
const userProfileForm =  document.querySelector(".user-profile-form");
const userPhotoImg = document.querySelector(".user-photo-img");
const userProfileInput = document.querySelector(".user-profile-input");
userProfileCloseBtn.addEventListener("click", onCloseProfileModalClick);
userProfileLoadPhotoFile.addEventListener("click", onLoadPhotoFileClick);
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

function onLoadPhotoFileClick({target}){
    const file = target.files[0];
    console.log(file);

    const maxSizeFile = 5 * 1024 * 1024;
    if (file.size > maxSizeFile) {
      Notify.failure('Файл повинен бути менше 5Mb', {
        position: 'center-top',
        distance: '10px',
      });
      return;
    }
    console.dir(userPhotoImg);
    const objectURL = URL.createObjectURL(file);
    console.log(objectURL);
  
}

async function onUserProfileFormSubmit(e){
    
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
            formData.append('avatar', fileAvatar)
            formData.append('name', newName);

            const loader = createLoader(userProfileModal, "into");

            const {accessToken:newAccessToken, user} = await api.updateUser({accessToken, name: newName}, abortCtrl1)
            
            loader.remove();

            if (user && newAccessToken){                                                                          // якщо юзер та accessToken отримано перевіримо чи збігається accessToken, що отримано з тим який є в кукі

                if (newAccessToken != accessToken){
                   let date = new Date(Date.now() + (24 * 60 * 60 * 1000));
                   date = date.toUTCString();
                   document.cookie = `accessToken=${newAccessToken}; expires=${date}; secure`;
                }
                 
                 headerAuthorised(user);                
             }else{ 
                 throw new Error("Not authorized");
             }


        }catch(error){

            console.log(error);

            document.cookie = 'accessToken=;  max-age=-1;';
            headerNotAuthorised();
        }
   
    userProfileModal.classList.add("is-hidden");
    userProfileInput.value = "";
   
}
