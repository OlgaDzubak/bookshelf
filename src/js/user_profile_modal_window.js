const userProfileModal =  document.querySelector(".user-profile-modal");
const userProfileCloseBtn = document.querySelector(".user-profile-closeBtn");
const userProfileAddPhotoBtn =  document.querySelector(".add-photo-btn");

userProfileCloseBtn.addEventListener("click", onCloseProfileModalClick);
userProfileAddPhotoBtn.addEventListener("click", onAddPhotoBtnClick);


export function onCloseProfileModalClick(){
    
    window.removeEventListener('keydown', onAnyKeyDownProfileModal);
    window.removeEventListener('mousedown', onAnyKeyDownProfileModal );
    window.removeEventListener('scroll', onCloseProfileModalClick );
  
    userProfileModal.classList.add("is-hidden");
}


export function onAnyKeyDownProfileModal(event){
  
    console.dir(event);
    
    if (!event.target.classList.contains('user-profile-input') || event.code === 'Escape') {
        onCloseProfileModalClick();
    }    
}

function onAddPhotoBtnClick(){
  // дописати обрання файла фото
  
}
