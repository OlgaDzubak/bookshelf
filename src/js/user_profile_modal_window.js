const userProfileCloseBtn = document.querySelector(".user-profile-closeBtn");
const userProfileModal =  document.querySelector(".user-profile-modal");

userProfileCloseBtn.addEventListener("click", onCloseProfileModal);

function onCloseProfileModal(){
    userProfileModal.classList.add("is-hidden");
}