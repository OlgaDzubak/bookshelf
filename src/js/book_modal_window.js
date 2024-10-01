import { bookshelf_API } from './API';
import { displayOrdredAmountInShoppingBag, createLoader, rewriteAccessToken } from './help_functions';


const api = new bookshelf_API;
let book_Id, abortCtrl1, abortCtrl2;

const divContainerEl = document.querySelector('.books-box');
const divBackdropEl = document.querySelector('.book-modal-backdrop');
const btnCloseModal = document.querySelector('.btn-modal-close');
const btnAddEl = document.querySelector('.add');
const btnRemoveEl = document.querySelector('.remove');
const textEl = document.querySelector('.modal-message');

const objScroll = {
    scrollPosition: 0,
    disabledScroll() {
        objScroll.scrollPosition = window.scrollY;
        document.body.classList.add('block-scroll');
        document.body.style.cssText = `top: -${objScroll.scrollPosition}px;`;
    },

    enabledScroll() {
        document.body.classList.remove('block-scroll');
        document.body.style.cssText = `top: 0`
        window.scroll({top: objScroll.scrollPosition})
    },
}

divContainerEl.addEventListener('click', onReadId);

function onReadId({target}) {
    if (target.classList.contains('img-book') || target.classList.contains('owerlay')) {
        book_Id = target.parentElement.parentElement.dataset.id;
        createModalWindow(book_Id);
        
    } else if (target.classList.contains('owerlay-content')) {

        book_Id = target.parentElement.parentElement.parentElement.dataset.id;
        createModalWindow(book_Id);

    } else if (target.classList.contains('title-book') || target.classList.contains('author')) {

        book_Id = target.parentElement.dataset.id;
        createModalWindow(book_Id);
    }
}

async function createModalWindow(book_Id) {

    if (abortCtrl1) {
        abortCtrl1.abort();
        console.log("abort previous book fetch");
    }

    objScroll.disabledScroll();

    document.addEventListener("keydown", event => {
        if (event.key === 'Escape') {
            onCloseModal();
        }
    }, {once: true} );

    try {

        abortCtrl1 = new AbortController;
        const response = await api.getBookById(book_Id, abortCtrl1);
        const { author, book_image, description, title, buy_links } = response.data;
        const imageBox = document.querySelector('.book-img-div');
        const nameBookEl = document.querySelector('#name-book');
        const authorEl = document.querySelector('#author');
        const descriptionEl = document.querySelector('#description');
        const marketPlEl = document.querySelector('.market_placers_list');
     
        nameBookEl.textContent = title;
        authorEl.textContent = author;

        if (description === '') {
            descriptionEl.textContent = 'No description';
        } else {
            descriptionEl.textContent = description;
        }
        
        imageBox.innerHTML =   `<img src="${book_image}" alt="${book_image}" class="book-img-modal" loading="auto">`;
        marketPlEl.innerHTML = `<li class="marketplacer_li marketplacer_li_one">
                                    <a href="${buy_links[0].url}" class="marketplacer_li_link link">
                                        <svg id="amazon-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 15">
                                            <path fill="var(--amazon-path1-color)" d="M38.42,21.708c-3.093,2.284-7.591,3.504-11.459,3.504-5.423,0-10.306-2.005-13.999-5.342-.29-.262-.03-.62.318-.416c3.986,2.32,8.915,3.715,14.005,3.715c3.434,0,7.211-.71,10.684-2.185.525-.223.963.343.45.724h.001Zm1.289-1.473c-.395-.507-2.613-.239-3.617-.121-.304.037-.35-.228-.077-.418c1.771-1.247,4.677-.887,5.017-.469s-.088,3.333-1.753,4.724c-.256.213-.499.1-.386-.183.373-.933,1.212-3.025.815-3.533h.001Z" transform="matrix(.9 0 0 0.9-4.692819-7.6908)"/>
                                            <path fill="var(--amazon-path2-color)" d="M36.166,10.894c0,.181.14.304.314.304h2.829l-3.257,4.671c-.197.3-.199.636-.199.834v1.228c0,.176.197.381.386.278c1.845-.98,4.062-.884,5.732-.009.205.107.4-.1.4-.276v-1.293c-.021-.174-.075-.351-.288-.471-.947-.534-2.049-.69-3.094-.664L41.8,11.482c.259-.36.406-.588.409-.762v-1.037c0-.181-.14-.307-.314-.307h-5.425c-.003,0-.006,0-.009,0-.165,0-.299.134-.299.299c0,.003,0,.006,0,.008v1.212l.004-.001ZM16.361,18.451c.176,0,.318-.137.318-.307v-4.491c0-.98-.046-2.336,1.14-2.336c1.173,0,1.017,1.391,1.017,2.336l.002,4.491c0,.163.13.295.297.307h1.653c.176,0,.318-.137.318-.307v-4.491c0-.481-.017-1.195.153-1.623s.587-.694.987-.694c.478,0,.848.161.971.729.078.339.046,1.23.046,1.588v4.496c0,.163.137.295.297.307h1.653c.176,0,.318-.137.318-.307l.004-5.347c0-.908.107-1.943-.416-2.656-.462-.641-1.219-.926-1.91-.926-.973,0-1.88.499-2.28,1.57-.465-1.07-1.11-1.57-2.143-1.57-1.017,0-1.771.499-2.173,1.57h-.03v-1.107c-.012-.153-.14-.276-.3-.283h-1.539c-.176,0-.318.134-.318.304v8.471c.012.151.137.269.295.281h1.65l-.01-.005ZM46.878,9.227c2.449,0,3.775,2.103,3.775,4.778c0,2.584-1.465,4.634-3.775,4.634-2.4,0-3.715-2.103-3.715-4.724c0-2.637,1.326-4.693,3.715-4.693v.005Zm.014,1.723c-1.216,0-1.293,1.658-1.293,2.691s-.016,3.245,1.279,3.245c1.279,0,1.34-1.783,1.34-2.869c0-.715-.03-1.57-.245-2.247-.186-.59-.555-.82-1.079-.82h-.002Zm6.931,7.507c.177,0,.321-.137.323-.307v-4.562c0-.571.03-1.087.262-1.604.189-.408.558-.677.96-.677c1.14,0,1.033,1.356,1.033,2.283v4.601c.016.144.141.255.292.267h1.652c.162,0,.299-.117.318-.267v-5.333c0-.82,0-1.96-.427-2.637-.465-.732-1.18-.998-1.927-.998-1.14,0-1.788.553-2.25,1.711h-.03v-1.296c-.033-.132-.151-.23-.295-.237h-1.531c-.167,0-.304.121-.318.276l.002,8.474c0,.163.137.295.297.307h1.644l-.005-.001ZM31.835,14.403v-.357c-1.195,0-2.456.255-2.456,1.662c0,.713.372,1.196,1.005,1.196.462,0,.88-.286,1.142-.75.325-.577.309-1.107.309-1.75v-.001Zm1.664,4.024c-.109.098-.267.105-.389.039-.548-.455-.647-.667-.947-1.1-.906.924-1.548,1.2-2.721,1.2-1.39,0-2.47-.857-2.47-2.572c0-1.34.724-2.252,1.76-2.698.896-.395,2.147-.464,3.104-.573v-.213c0-.393.03-.857-.203-1.196-.199-.304-.585-.429-.926-.429-.629,0-1.189.323-1.326.992-.028.149-.137.295-.288.302l-1.6-.172c-.134-.03-.285-.139-.245-.347.367-1.941,2.123-2.526,3.691-2.526.803,0,1.853.213,2.486.821.803.75.726,1.75.726,2.839v2.572c0,.773.32,1.112.622,1.531.105.149.128.327-.007.439l-1.262,1.101-.002-.005-.003-.005ZM10.196,14.409v-.357c-1.193,0-2.453.255-2.453,1.662c0,.713.369,1.196,1.003,1.196.465,0,.88-.286,1.142-.75.325-.577.309-1.107.309-1.75l-.001-.001Zm1.664,4.023c-.109.098-.267.105-.389.039-.548-.455-.64-.667-.947-1.1-.906.924-1.547,1.2-2.721,1.2-1.388.001-2.469-.856-2.469-2.571c0-1.34.726-2.252,1.76-2.698.896-.395,2.147-.464,3.104-.573v-.213c0-.393.03-.857-.199-1.196-.203-.304-.587-.429-.926-.429-.629,0-1.191.323-1.333.992-.028.149-.137.295-.285.302l-1.602-.172c-.134-.03-.283-.139-.245-.347C5.977,9.725,7.731,9.14,9.299,9.14c.803,0,1.853.213,2.486.821.803.75.726,1.75.726,2.839v2.572c0,.773.32,1.112.622,1.531.107.149.13.327-.005.439l-1.259,1.094-.005-.005-.004.001Z" transform="matrix(.9 0 0 0.9-4.8006-8.2206)"/>
                                        </svg>  
                                    </a>
                                </li>

                                <li class="marketplacer_li marketplacer_li_two">
                                    <a href="${buy_links[1].url}" class="marketplacer_li_link link">
                                        <svg id="apple-ibooks" xmlns="http://www.w3.org/2000/svg" x="0" y="0" version="1.1" viewBox="0 0 100 100" xml:space="preserve">
                                            <g>
                                                <linearGradient id="gradient-background" x1="-303.017" x2="-303.017" y1="748.267" y2="746.767" gradientTransform="matrix(60 0 0 -60 18231 44901)" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0" stop-color="#aaaaaa"></stop>
                                                    <stop offset="1" stop-color="#909090"></stop>
                                                </linearGradient>

                                                <path fill="url(#gradient-background)" d="M63.6 5c9 0 13.6 0 18.4 1.5 5.3 1.9 9.5 6.1 11.4 11.4C95 22.8 95 27.3 95 36.4v27.2c0 9 0 13.6-1.5 18.4-1.9 5.3-6.1 9.5-11.4 11.4C77.2 95 72.7 95 63.6 95H36.4c-9 0-13.6 0-18.4-1.5-5.3-2-9.5-6.2-11.5-11.5C5 77.2 5 72.7 5 63.6V36.4c0-9 0-13.6 1.5-18.4 2-5.3 6.2-9.5 11.5-11.5C22.8 5 27.3 5 36.4 5h27.2z"></path>
                                                <path fill="#fff" d="M20 32.8s2.9-7.5 14.6-7.5c11.6 0 14.7 9.8 14.7 9.8v42s-3.7-11.2-14.6-11.2c-7.9 0-13.5 5.1-13.5 5.1-.6.5-1.2.2-1.2-.6V32.8zm60 0v37.5c0 .8-.5 1.1-1.2.6 0 0-5.6-5.1-13.5-5.1C54.5 65.8 50.8 77 50.8 77V35s3-9.8 14.7-9.8c11.6 0 14.5 7.6 14.5 7.6z"></path>
                                            </g>
                                            </svg>
                                    </a>
                                </li>`

        divBackdropEl.classList.toggle('is-hidden');
        const orderedBookID_arr = JSON.parse(localStorage.getItem('orderedBookID'));

        if (orderedBookID_arr === null || !orderedBookID_arr.includes(book_Id)) {
            btnAddEl.classList.remove('is-hidden');
        } else {
            btnRemoveEl.classList.remove('is-hidden');
            textEl.classList.remove('is-hidden');
        }

    } catch (error) {
        if (error.code !== 'ERR_CANCELED'){
            console.error(error);

            const errorBox =  document.querySelector(".book-modal-container").createElement("div");
            btnCloseModal.after(errorBox);
            errorBox.classList.add("error-box");
            errorBox.innerHTML = `<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>`;
        }
    }
    
};

btnCloseModal.addEventListener('click', onCloseModal);

function onCloseModal() {
    objScroll.enabledScroll();
    divBackdropEl.classList.add('is-hidden');
    btnRemoveEl.classList.add('is-hidden');
    btnAddEl.classList.add('is-hidden');
    textEl.classList.add('is-hidden');
}

btnAddEl.addEventListener('click', addToShoppingList);
btnRemoveEl.addEventListener('click', removeFromShoppingList);



async function addToShoppingList() {
    console.log("addToShoppingList"); 
    
    if (abortCtrl2) {      
        abortCtrl2.abort();
        console.log("abort previous fetch");
    }

    try{
        console.log("try"); 
        const accessToken = getCookie("accessToken");
        if (!accessToken){  throw new Error("Request failed with status code 401"); }
        
        const loader1 = createLoader(divBackdropEl);
        abortCtrl2 = new AbortController();
        const {data} = await api.addToShoppingList(accessToken, book_Id, abortCtrl2);
        loader1.remove();
        
        if (data){
            console.log(data);   
            const {accessToken: newAccessToken, shoppingList} = data.user;
            
            rewriteAccessToken(newAccessToken);
    
            btnAddEl.classList.add('is-hidden');
            btnRemoveEl.classList.remove('is-hidden');
            textEl.classList.remove('is-hidden');
            localStorage.setItem('bookshelf_orderedbooks', JSON.stringify(shoppingList))
        
            displayOrdredAmountInShoppingBag(shoppingList);    
        }

    }catch(error){
        if (error.message === "Request failed with status code 401"){
            const logoLink = document.querySelector('.logo-link');
            logoLink.click();
          }else{
            const errorBox = document.createElement("div");
            divBackdropEl.append(errorBox);
            errorBox.classList.add("error-box");
            errorBox.innerHTML = `<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>`;
          }
    }



};

function removeFromShoppingList() {
    btnAddEl.classList.remove('is-hidden');
    btnRemoveEl.classList.add('is-hidden');
    textEl.classList.add('is-hidden');
    const dataJson = localStorage.getItem('orderedBookID');
    const arrLs = JSON.parse(dataJson);
    let i = arrLs.indexOf(book_Id);
    arrLs.splice(i, 1);
    localStorage.removeItem('orderedBookID')
    localStorage.setItem('orderedBookID', JSON.stringify(arrLs));
    displayOrdredAmountInShoppingBag(arrLs)
};