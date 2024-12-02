const userProfileModal =  document.querySelector(".user-profile-modal");
const userProfileCloseBtn = document.querySelector(".user-profile-closeBtn");
const userProfileAddPhotoBtn =  document.querySelector(".add-photo-btn");
const userProfileForm =  document.querySelector(".user-profile-form");

userProfileCloseBtn.addEventListener("click", onCloseProfileModalClick);
userProfileAddPhotoBtn.addEventListener("click", onAddPhotoBtnClick);
userProfileForm.addEventListener("submit", onUserProfileFormSubmit);





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

function onUserProfileFormSubmit(e){
    
    console.log("onSaveChangesBtnClick");

    e.preventDefault();

    const userProfileInput = document.querySelector(".user-profile-input");

    console.log("inputNameValue=", userProfileInput.value);

}