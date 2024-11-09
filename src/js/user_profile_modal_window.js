const userProfileCloseBtn = document.querySelector(".user-profile-closeBtn");

userProfileCloseBtn.addEventListener("click", onCloseProfileModal);

function onCloseProfileModal(){
    userProfileCloseBtn.classList.add("is-hidden");
}