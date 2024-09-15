
import {displayOrdredAmountInShoppingBag } from './help_functions';
import { bookshelf_API } from './API';
import { getCookie } from './help_functions';

const api = new bookshelf_API();

let abortCtrl;

showHeader();



async function showHeader(){

    const accessToken = getCookie("bookshelfAccessToken");         // зчитуємо accessToken з кукі
    
    if (!accessToken){ 
        headerNotAuthorised();
    }else{
        if (abortCtrl) {
            abortCtrl.abort();
            console.log("abort previous refreshUser");
        }
        
        try{
            abortCtrl = new AbortController();
            const {user} = await api.refreshUser(accessToken, abortCtrl);     // отримуэмо дані про юзера з сервера
            if (user){
                if (user.accessToken != JSON.parse(localStorage.getItem("bookshelfAccessToken"))){
                    let date = new Date(Date.now() + (3 * 60 * 1000));
                    date = date.toUTCString();          
                    document.cookie = `bookshelfAccessToken=${data.accessToken}; expires=${date},  ;secure;`;
                }
                headerAuthorised(user);                
            }else{
                throw new Error("Not authorized");
            }
        }catch(error){
            document.cookie = 'bookshelfAccessToken=; max-age=-1;';
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