const userProfileCloseBtn = document.querySelector(".user-profile-closeBtn");
const userProfileModal =  document.querySelector(".user-profile-modal");

userProfileCloseBtn.addEventListener("click", onCloseProfileModal);

function onCloseProfileModal(){
    
    window.removeEventListener('keydown', onAnyKeyDown);
    window.removeEventListener('mousemove', onAnyKeyDown);
    window.removeEventListener('touchstart', onAnyKeyDown);
    userProfileModal.classList.add("is-hidden");
}

export function onAnyKeyDown({target,code}){

    if (!target.classList.contains('user-profile-input')){
        onCloseProfileModal();
    }    
}