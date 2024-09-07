
import {displayOrdredAmountInShoppingBag } from './help_functions';
import { bookshelf_API } from './API';
import { getCookie } from './help_functions';

const api = new bookshelf_API();

let abortCtrl;

const openBtn = document.querySelector('.jsOpenBtn');
const authBtn = document.querySelector('.auth-btn');
const authBtnName = authBtn.querySelector('.login-p');


const accessToken = getCookie("bookshelfAccessToken");         // зчитуємо accessToken з кукі
console.log("accessToken=", accessToken);

if (accessToken){                                              // якщо токен є то оновимо дані юзера

  if (abortCtrl) {
    abortCtrl.abort();
    console.log("abort previous refreshUser");
  }

    abortCtrl = new AbortController();
    const user = api.refreshUser(accessToken, abortCtrl);     // отримуэмо дані про юзера з сервера
    console.log("user=", user);

    if (user){                                                // якщо юзер є то формуємо вигляд хедера

        openBtn.classList.add("is-hidden");
        authBtn.classList.remove("is-hidden");
        authBtnName.textContent = user.email;
    
        if (user.shopping_list.length > 0){
            displayOrdredAmountInShoppingBag(user.shopping_list);
        }

    }else{
        openBtn.classList.remove("is-hidden");
        authBtn.classList.add("is-hidden");
    }
}else{
    openBtn.classList.remove("is-hidden");
    authBtn.classList.add("is-hidden");
}



const shoppingList =  JSON.parse(localStorage.getItem("bookshelf_shoppinglist")) || [];



