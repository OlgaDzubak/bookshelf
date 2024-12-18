
import { displayOrdredAmountInShoppingBag } from './help_functions';
import { bookshelf_API } from './API';
import { getCookie, createLoader } from './help_functions';
import { onAnyKeyDownProfileModal, onCloseProfileModal} from './user_profile_modal_window'

const api = new bookshelf_API();
let abortCtrl;

const navigation = document.querySelector('.navigation');
const openBtn = document.querySelector('.jsOpenBtn');
const authBtn = document.querySelector('.auth-btn');
const authBtnImg= authBtn.querySelector('.user-img');
const userPhotoImg = document.querySelector(".user-photo-img");
const authBtnName= authBtn.querySelector('.login-p');
const userProfileModal = document.querySelector(".user-profile-modal");

authBtn.addEventListener('click', onAuthBtnClick);

showHeader();





async function showHeader(){

    const accessToken = getCookie("accessToken");         // зчитуємо поточний accessToken з кукі

    if (!accessToken){ 
        headerNotAuthorised();                                            // Якшо accessToken в кукі немає, то малюємо хедер без авторизації
    }else{                                                                // Якшо accessToken в кукі є, то спробуємо оновити інформацію про юзера

        if (abortCtrl) {
            abortCtrl.abort();
            console.log("abort previous refreshUser");
        }
        
        try{

            abortCtrl = new AbortController();

            const ss = createLoader();
            const {accessToken:newAccessToken, user} = await api.refreshUser(accessToken, abortCtrl);              // отримуємо дані про юзера та його accessToken з сервера

            if (user && newAccessToken){                                                                          // якщо юзер та accessToken отримано перевіримо чи збігається accessToken, що отримано з тим який є в кукі

               if (newAccessToken != accessToken){
                  let date = new Date(Date.now() + (24 * 60 * 60 * 1000));
                  date = date.toUTCString();
                  document.cookie = `accessToken=${newAccessToken}; expires=${date}; secure`;
               }
                
                headerAuthorised(user);                
            }else{ 
                throw new Error("Not authorized");
            }

        }catch(error){
            document.cookie = 'accessToken=;  max-age=-1;';
            headerNotAuthorised();
        }
    }
}

export function headerNotAuthorised(){

    openBtn.classList.remove("is-hidden");
    authBtn.classList.add("is-hidden");
    navigation.classList.add("is-hidden");

    localStorage.removeItem("bookshelf_orderedbooks");
}

export function headerAuthorised(user){
    authBtnName.textContent = user.name;
    if (user.avatarURL){
        authBtnImg.src = user.avatarURL;
        userPhotoImg.src = user.avatarURL;

    }else{
        authBtnImg.src = "/src/images/svg/sprite.svg#name_icon";
        userPhotoImg.src = "/src/images/svg/sprite.svg#name_icon";
    }
    
    openBtn.classList.add("is-hidden");
    authBtn.classList.remove("is-hidden");
    navigation.classList.remove("is-hidden");    

    if (user.shopping_list.length > 0){
        displayOrdredAmountInShoppingBag(user.shopping_list);
        localStorage.setItem("bookshelf_orderedbooks",JSON.stringify(user.shopping_list));
    }
}

function onAuthBtnClick(){

    userProfileModal.classList.remove("is-hidden");

    window.addEventListener('keydown', onAnyKeyDownProfileModal);
    window.addEventListener('mousedown', onAnyKeyDownProfileModal);
    window.addEventListener('scroll', onCloseProfileModal);
}
