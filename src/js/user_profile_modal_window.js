const userProfileCloseBtn = document.querySelector(".user-profile-closeBtn");
const userProfileModal =  document.querySelector(".user-profile-modal");


userProfileCloseBtn.addEventListener("click", onCloseProfileModal);
window.addEventListener('keydown', onAnyKeyDown);
window.addEventListener('mousemove', onAnyKeyDown);
window.addEventListener('touchstart', onAnyKeyDown);


function onCloseProfileModal(){

    window.removeEventListener('keydown', onAnyKeyDown);
    window.removeEventListener('mousemove', onAnyKeyDown);
    window.removeEventListener('touchstart', onAnyKeyDown);

    userProfileModal.classList.add("is-hidden");
    
}

function onAnyKeyDown({target}){
    

    window.removeEventListener('keydown', onAnyKeyDown);
    window.removeEventListener('mousemove', onAnyKeyDown);
    window.removeEventListener('touchstart', onAnyKeyDown);

    userProfileModal.classList.add("is-hidden");
    
    
}