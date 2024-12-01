const userProfileCloseBtn = document.querySelector(".user-profile-closeBtn");
const userProfileModal =  document.querySelector(".user-profile-modal");

window.addEventListener('keydown', onAnyKeyDown);
userProfileCloseBtn.addEventListener("click", onCloseProfileModal);


function onCloseProfileModal(){
    window.removeEventListener('keydown', onAnyKeyDown);
    userProfileModal.classList.add("is-hidden");
    
}


function onAnyKeyDown({target, currentTarget, code}){
    if (e.code === 'Escape' || target != currentTarget){
        userProfileModal.classList.add("is-hidden");
    }
}