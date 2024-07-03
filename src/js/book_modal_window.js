import { booksAPI } from './booksAPI';
import { displayOrdredAmountInShoppingBag } from './help_functions';
import amazon from '/src/images/svg/amazon_icon.svg';
import appleBook from '/src/images/svg/ibooks.svg';

const books = new booksAPI;
let book_Id, abortCtrl1;

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
        console.log(objScroll.scrollPosition);
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
    console.dir(target);
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
        const response = await books.getBookById(book_Id, abortCtrl1);
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
                                    <img class="image-market" src="${amazon}" alt="amazon">  
                                    </a>
                                </li>

                                <li class="marketplacer_li marketplacer_li_two">
                                    <a href="${buy_links[1].url}" class="marketplacer_li_link link">
                                    <img class="image-market" src="${appleBook}" alt="apple-books">      
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
            console.error("тут");    
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

btnAddEl.addEventListener('click', addLocalStorage);
btnRemoveEl.addEventListener('click', removeLocalStorage);

function addLocalStorage() {
    btnAddEl.classList.add('is-hidden');
    btnRemoveEl.classList.remove('is-hidden');
    textEl.classList.remove('is-hidden');
    const dataJson = localStorage.getItem('orderedBookID');
    let arrLs = JSON.parse(dataJson); //book_Id
    /* console.log(arrLs) */
    if (arrLs === null) {
        arrLs = [];
    }
    arrLs.push(book_Id);
    localStorage.setItem('orderedBookID', JSON.stringify(arrLs));
    displayOrdredAmountInShoppingBag(arrLs)
};

function removeLocalStorage() {
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