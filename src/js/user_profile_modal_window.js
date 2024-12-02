const userProfileCloseBtn = document.querySelector(".user-profile-closeBtn");
const userProfileModal =  document.querySelector(".user-profile-modal");

userProfileCloseBtn.addEventListener("click", onCloseProfileModal);


export function onCloseProfileModal(){
    
    window.removeEventListener('keydown', onAnyKeyDownProfileModal);
    window.removeEventListener('mousedown', ()=>{onCloseProfileModal()} );
    window.removeEventListener('mousemove', ()=>{onCloseProfileModal()} );
  
    userProfileModal.classList.add("is-hidden");
}


export function onAnyKeyDownProfileModal({target, code}){
  
    if (!target.classList.contains('user-profile-input') || code === 'Escape') {
        onCloseProfileModal();
    }    
}
