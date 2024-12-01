const userProfileCloseBtn = document.querySelector(".user-profile-closeBtn");
const userProfileModal =  document.querySelector(".user-profile-modal");

userProfileCloseBtn.addEventListener("click", onCloseProfileModal);

function onCloseProfileModal(){
    
    window.removeEventListener('keydown', onAnyKeyDown);
    window.removeEventListener('touchstart', onAnyKeyDown);
    userProfileModal.classList.add("is-hidden");
}

export function onAnyKeyDownProfileModal({target, code}){
   
    console.log(target.classList.contains('user-profile-input'));
    
    if (!target.classList.contains('user-profile-input')){
        onCloseProfileModal();
    }    
}