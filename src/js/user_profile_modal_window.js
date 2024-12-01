const userProfileCloseBtn = document.querySelector(".user-profile-closeBtn");
const userProfileModal =  document.querySelector(".user-profile-modal");


window.addEventListener('keydown', onAnyKeyDown);
window.addEventListener('mousemove', onAnyKeyDown);
window.addEventListener('touchstart', onAnyKeyDown);
userProfileCloseBtn.addEventListener("click", onCloseProfileModal);


function onCloseProfileModal(){
    removeOnAnyKeyDown();
    userProfileModal.classList.add("is-hidden");
}

function onAnyKeyDown({target}){
    onCloseProfileModal();
}

function removeOnAnyKeyDown(){
    window.removeEventListener('keydown', onAnyKeyDown);
    window.removeEventListener('mousemove', onAnyKeyDown);
    window.removeEventListener('touchstart', onAnyKeyDown);
}