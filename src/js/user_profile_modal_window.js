const userProfileCloseBtn = document.querySelector(".user-profile-closeBtn");
const userProfileModal =  document.querySelector(".user-profile-modal");


userProfileCloseBtn.addEventListener("click", onCloseProfileModal);


function onCloseProfileModal(){
    window.removeEventListener('keydown', onAnyKeyDown);
    userProfileModal.classList.add("is-hidden");
    
}

function onAnyKeyDown({target, currentTarget, code}){
    console.dir(target, currentTarget, code);
    if (code === 'Escape' || target != currentTarget){
        userProfileModal.classList.add("is-hidden");
    }
}