
import {displayOrdredAmountInShoppingBag } from './help_functions';
import { bookshelf_API } from './API';
import { getCookie } from './help_functions';

const api = new bookshelf_API();

let abortCtrl;

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

function headerNotAuthorised(){

    const navigation = document.querySelector('.navigation');
    const openBtn = document.querySelector('.jsOpenBtn');
    const authBtn = document.querySelector('.auth-btn');

    openBtn.classList.remove("is-hidden");
    authBtn.classList.add("is-hidden");
    navigation.classList.add("is-hidden");

    localStorage.removeItem("bookshelf_orderedbooks");
}

function headerAuthorised(user){

    const navigation = document.querySelector('.navigation');
    const openBtn = document.querySelector('.jsOpenBtn');
    const authBtn = document.querySelector('.auth-btn');
    const authBtnName= authBtn.querySelector('.login-p');

    authBtnName.textContent = user.name;
    openBtn.classList.add("is-hidden");
    authBtn.classList.remove("is-hidden");
    navigation.classList.remove("is-hidden");    

    if (user.shopping_list.length > 0){
        displayOrdredAmountInShoppingBag(user.shopping_list);
        localStorage.setItem("bookshelf_orderedbooks",JSON.stringify(user.shopping_list));
    }
}
