
import { displayOrdredAmountInShoppingBag } from './help_functions';
import { bookshelf_API } from './API';
import { openAuthModal } from './autorization_modal_window';
import { openLogoutModal } from './logout_modal_window';
import { openMobileMenu } from './mobile_menu';
import userIcon from  '../images/svg/user_Icon.svg';

const api = new bookshelf_API();
let abortCtrl, burgerBtn, userLoginBtn, navigation, authBtn;

burgerBtn = document.querySelector(".burger-menu-btn");
burgerBtn.addEventListener('click', openMobileMenu);

userLoginBtn = document.querySelector('.header .user-login-btn');
userLoginBtn.addEventListener('click', openAuthModal);

authBtn = document.querySelector('.header .auth-btn');
authBtn.addEventListener('click', openLogoutModal);

navigation = document.querySelector('.navigation');

showHeader();


// ----------------------------------------------------------------------------------------------

async function showHeader(){

        if (abortCtrl) { abortCtrl.abort(); }
        
        try{

            abortCtrl = new AbortController();

            const {user} = await api.refreshUser(abortCtrl);

            if (user){
                headerAuthorised(user);                
            }else{ 
                throw new Error("Not authorized");
            }

        }catch(error){
            headerNotAuthorised();
        }
}
function headerNotAuthorised(){
    
    const userLoginBtn = document.querySelector('.user-login-btn');
    const authBtn = document.querySelector('.auth-btn');
    const navigation = document.querySelector('.navigation');
  //  const userLogoutBtn = document.querySelector('.mobile-menu .logout-btn');

    document.cookie = 'accessToken=;  max-age=-1;';
    localStorage.removeItem("bookshelf_orderedbooks");

    userLoginBtn.classList.remove("is-hidden");
    authBtn.classList.add("is-hidden");
    navigation.classList.add("is-hidden");
 //   userLogoutBtn.classList.add("is-hidden");
}
function headerAuthorised(user){

    const userLoginBtn = document.querySelector('.user-login-btn');
    const authBtn = document.querySelector('.auth-btn');
    const navigation = document.querySelector('.navigation');
    const authBtnImg= authBtn.querySelector('.user-img');
    const authBtnName= authBtn.querySelector('.login-p');
    const userPhotoImg = document.querySelector('.user-photo-img');
    const userLogoutBtn = document.querySelector('.mobile-menu .logout-btn');

    authBtnName.textContent = user.name;
   

    if (user.avatarURL){
        authBtnImg.src = user.avatarURL;
        userPhotoImg.src = user.avatarURL;
    }else{
        authBtnImg.src = userIcon;
        userPhotoImg.src = userIcon;
    }
    
    userLoginBtn.classList.add("is-hidden");
    authBtn.classList.remove("is-hidden");
    navigation.classList.remove("is-hidden");
    userLogoutBtn.classList.remove("is-hidden");

    if (user.shopping_list.length > 0){
        displayOrdredAmountInShoppingBag(user.shopping_list);
        localStorage.setItem("bookshelf_orderedbooks",JSON.stringify(user.shopping_list));
    }

    
}

export {
    headerNotAuthorised,
    headerAuthorised,    
}