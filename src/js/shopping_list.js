import { bookshelf_API } from './API';
import {createPagination,
        deleteLastPaginationPage, 
        setPaginationPage, 
        shiftPageLeft, 
        shiftPageRight, 
        nextPageGroupLeft, 
        nextPageGroupRight} from './pagination'


import stackOfBooks_mobile_1x from '/src/images/shopping_list/stack_of_books_mobile@1x.png';
import stackOfBooks_mobile_2x from '/src/images/shopping_list/stack_of_books_mobile@2x.png';
import stackOfBooks_tablet_1x from '/src/images/shopping_list/stack_of_books_tablet@1x.png';
import stackOfBooks_tablet_2x from '/src/images/shopping_list/stack_of_books_tablet@2x.png';
import stackOfBooks_desktop_1x from '/src/images/shopping_list/stack_of_books_desktop@1x.png';
import stackOfBooks_desktop_2x from '/src/images/shopping_list/stack_of_books_desktop@2x.png';

import emptyImgMobile_1x  from '/src/images/png/empty-img-mobile@1x.jpg';
import emptyImgMobile_2x  from '/src/images/png/empty-img-mobile@2x.jpg';
import emptyImgMobile_3x  from '/src/images/png/empty-img-mobile@3x.jpg';
import emptyImgTablet_1x  from '/src/images/png/empty-img-tablet@1x.jpg';
import emptyImgTablet_2x  from '/src/images/png/empty-img-tablet@2x.jpg';
import emptyImgTablet_3x  from '/src/images/png/empty-img-tablet@3x.jpg';
import emptyImgDesktop_1x  from '/src/images/png/empty-img-desktop@1x.jpg';
import emptyImgDesktop_2x  from '/src/images/png/empty-img-desktop@2x.jpg';
import emptyImgDesktop_3x  from '/src/images/png/empty-img-desktop@3x.jpg';


import { createBooksBoxTitle, createLoader, displayOrdredAmountInShoppingBag, scrollUp} from './help_functions';

const api = new bookshelf_API();

const shoppingBooksBox = document.querySelector('.shopping-wrapper');
const shoppingBooksBoxTitle = createBooksBoxTitle(shoppingBooksBox, "Shopping List");

const booksOnPage = 3;
let paginationBox, pagesCount, books_ul, visiblePagesCount, abortCtrl1, abortCtrl2, loader1, currentPage = 1, shoppingBooks = [];

const pageWidth = document.documentElement.scrollWidth;
if (pageWidth < 768) {
  visiblePagesCount = 2;
} else if (pageWidth >= 768){
  visiblePagesCount = 3
}

//дістаємо з бази книги. що замовлені користувачем
createShoppingList();


// ФУНКЦІЇ -----------------------------------------------------------------------------------------------------

  // Центральна функція, робить перевірки, запит та відмальовує
async function createShoppingList() {

    if (abortCtrl1) { 
      abortCtrl1.abort();
    }

    try{

      loader1 = createLoader(shoppingBooksBoxTitle, "after", []);

      abortCtrl1 = new AbortController();
      const data = await api.getShoppingList(abortCtrl1);
      
      loader1.remove();

      if (data){

        const {books} = data;


        if (books.length === 0){
          createEmptyBooksBox();
        }else{
          
          shoppingBooks = [...books];
          books_ul = document.createElement("ul");
          books_ul.classList.add("list","shopping_booklist");
          shoppingBooksBoxTitle.after(books_ul);
          books_ul.addEventListener('click', deleteBook);

          books_ul.innerHTML = showPage(shoppingBooks, 1, booksOnPage);

          pagesCount = Math.ceil(shoppingBooks.length / booksOnPage); 

          //стиворюємо пагінацію, якщо сторінок більше за 1
          if (pagesCount > 1 ) {
            
            paginationBox = createPagination(shoppingBooks.length, booksOnPage, visiblePagesCount, "shopping_booklist_pagination");
            shoppingBooksBox.append(paginationBox);
            currentPage = setPaginationPage(paginationBox, 1);
            paginationBox.addEventListener('click', ({target})=>{onPaginationClick(paginationBox, target)});

          }
        }

        scrollUp();
      }

    }catch(error){
      
      console.log("error=",error);

      loader1.remove();
      if (error.message === "Request failed with status code 401"){
        document.querySelector('.logo-link').click();
      }else{
        const errorBox = document.createElement("div");
        shoppingBooksBox.append(errorBox);
        errorBox.classList.add("error-box");
        errorBox.innerHTML = `<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>`;
      }
    }

}

  // Функція створення розмітки ShoppingBooks
function showPage(dataArray, page, itemsOnPage) {
  
  const startShownItem_idx = (page - 1)* itemsOnPage;
  const lastShownItem_idx = startShownItem_idx + (itemsOnPage-1); 
  
  const markup = dataArray.map(({ _id, book_image, list_name, author, title, description, buy_links }, idx) =>{

                        let bookImage_markup = book_image ? `<img class="book-image" src='${book_image}' alt='${title}'>`
                                                          : `<picture>
                                                              <source
                                                                srcset="${emptyImgMobile_1x} 1x, ${emptyImgMobile_2x} 2x, ${emptyImgMobile_3x} 3x"
                                                                media="(max-width: 767.9px)"
                                                              >
                                                              <source
                                                                srcset="${emptyImgTablet_1x} 1x, ${emptyImgTablet_2x} 2x, ${emptyImgTablet_3x} 3x"
                                                                media="(min-width: 768px) and (max-width: 1439.8px)"
                                                              >
                                                              <source
                                                                srcset="${emptyImgDesktop_1x} 1x, ${emptyImgDesktop_2x} 2x, ${emptyImgDesktop_3x} 3x"
                                                                media="(min-width: 1440px)"
                                                              >
                                                        
                                                              <img 
                                                                class="book-image" 
                                                                src='${emptyImgMobile_3x}' 
                                                                alt='${title}'
                                                              >
                                                             </picture>`;

                                return  ` <li data-id="${_id}" class="book-card ${((idx >= startShownItem_idx) && (idx <= lastShownItem_idx)) ? '' : 'non-active' }">

                                        <div class="book-image-div">
                                          ${bookImage_markup}
                                        </div>

                                        <div class="book-card-content-div">

                                          <div class="book_information">
                                            <p class="book-title">${title}</p>
                                            <p class="book-category">${list_name}</p>
                                            <p class="book-description">${description ? description : 'No description'}</p>
                                            <p class="book-author">${author}</p>
                                          </div>
                                          
                                          <button data-id="${_id}" class="bucket-btn" aria-label="delete book from shopping list">
                                            <svg class="trash_bucket_icon" viewBox="0 0 32 32">
                                                <path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.6667" d="M12 4h8M4 8h24M25.333 8l-0.935 14.026c-0.14 2.104-0.21 3.156-0.665 3.954-0.4 0.702-1.004 1.267-1.731 1.62-0.826 0.4-1.881 0.4-3.99 0.4h-4.025c-2.109 0-3.163 0-3.99-0.4-0.727-0.353-1.331-0.917-1.731-1.62-0.455-0.798-0.525-1.85-0.665-3.954l-0.935-14.026M13.333 14v6.667M18.667 14v6.667"></path>
                                            </svg>
                                          </button>
                                        
                                          <ul class="market_placers_list list">
                                      
                                            <li class="marketplacer_li_one">
                                              <a href="${buy_links[0].url}" class="marketplacer_li_link link" target="_blank" aria-label="to buy the book on the amazon">
                                                <svg id="amazon-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 15">
                                                  <path fill="var(--amazon-path1-color)" d="M38.42,21.708c-3.093,2.284-7.591,3.504-11.459,3.504-5.423,0-10.306-2.005-13.999-5.342-.29-.262-.03-.62.318-.416c3.986,2.32,8.915,3.715,14.005,3.715c3.434,0,7.211-.71,10.684-2.185.525-.223.963.343.45.724h.001Zm1.289-1.473c-.395-.507-2.613-.239-3.617-.121-.304.037-.35-.228-.077-.418c1.771-1.247,4.677-.887,5.017-.469s-.088,3.333-1.753,4.724c-.256.213-.499.1-.386-.183.373-.933,1.212-3.025.815-3.533h.001Z" transform="matrix(.9 0 0 0.9-4.692819-7.6908)"/>
                                                  <path fill="var(--amazon-path2-color)" d="M36.166,10.894c0,.181.14.304.314.304h2.829l-3.257,4.671c-.197.3-.199.636-.199.834v1.228c0,.176.197.381.386.278c1.845-.98,4.062-.884,5.732-.009.205.107.4-.1.4-.276v-1.293c-.021-.174-.075-.351-.288-.471-.947-.534-2.049-.69-3.094-.664L41.8,11.482c.259-.36.406-.588.409-.762v-1.037c0-.181-.14-.307-.314-.307h-5.425c-.003,0-.006,0-.009,0-.165,0-.299.134-.299.299c0,.003,0,.006,0,.008v1.212l.004-.001ZM16.361,18.451c.176,0,.318-.137.318-.307v-4.491c0-.98-.046-2.336,1.14-2.336c1.173,0,1.017,1.391,1.017,2.336l.002,4.491c0,.163.13.295.297.307h1.653c.176,0,.318-.137.318-.307v-4.491c0-.481-.017-1.195.153-1.623s.587-.694.987-.694c.478,0,.848.161.971.729.078.339.046,1.23.046,1.588v4.496c0,.163.137.295.297.307h1.653c.176,0,.318-.137.318-.307l.004-5.347c0-.908.107-1.943-.416-2.656-.462-.641-1.219-.926-1.91-.926-.973,0-1.88.499-2.28,1.57-.465-1.07-1.11-1.57-2.143-1.57-1.017,0-1.771.499-2.173,1.57h-.03v-1.107c-.012-.153-.14-.276-.3-.283h-1.539c-.176,0-.318.134-.318.304v8.471c.012.151.137.269.295.281h1.65l-.01-.005ZM46.878,9.227c2.449,0,3.775,2.103,3.775,4.778c0,2.584-1.465,4.634-3.775,4.634-2.4,0-3.715-2.103-3.715-4.724c0-2.637,1.326-4.693,3.715-4.693v.005Zm.014,1.723c-1.216,0-1.293,1.658-1.293,2.691s-.016,3.245,1.279,3.245c1.279,0,1.34-1.783,1.34-2.869c0-.715-.03-1.57-.245-2.247-.186-.59-.555-.82-1.079-.82h-.002Zm6.931,7.507c.177,0,.321-.137.323-.307v-4.562c0-.571.03-1.087.262-1.604.189-.408.558-.677.96-.677c1.14,0,1.033,1.356,1.033,2.283v4.601c.016.144.141.255.292.267h1.652c.162,0,.299-.117.318-.267v-5.333c0-.82,0-1.96-.427-2.637-.465-.732-1.18-.998-1.927-.998-1.14,0-1.788.553-2.25,1.711h-.03v-1.296c-.033-.132-.151-.23-.295-.237h-1.531c-.167,0-.304.121-.318.276l.002,8.474c0,.163.137.295.297.307h1.644l-.005-.001ZM31.835,14.403v-.357c-1.195,0-2.456.255-2.456,1.662c0,.713.372,1.196,1.005,1.196.462,0,.88-.286,1.142-.75.325-.577.309-1.107.309-1.75v-.001Zm1.664,4.024c-.109.098-.267.105-.389.039-.548-.455-.647-.667-.947-1.1-.906.924-1.548,1.2-2.721,1.2-1.39,0-2.47-.857-2.47-2.572c0-1.34.724-2.252,1.76-2.698.896-.395,2.147-.464,3.104-.573v-.213c0-.393.03-.857-.203-1.196-.199-.304-.585-.429-.926-.429-.629,0-1.189.323-1.326.992-.028.149-.137.295-.288.302l-1.6-.172c-.134-.03-.285-.139-.245-.347.367-1.941,2.123-2.526,3.691-2.526.803,0,1.853.213,2.486.821.803.75.726,1.75.726,2.839v2.572c0,.773.32,1.112.622,1.531.105.149.128.327-.007.439l-1.262,1.101-.002-.005-.003-.005ZM10.196,14.409v-.357c-1.193,0-2.453.255-2.453,1.662c0,.713.369,1.196,1.003,1.196.465,0,.88-.286,1.142-.75.325-.577.309-1.107.309-1.75l-.001-.001Zm1.664,4.023c-.109.098-.267.105-.389.039-.548-.455-.64-.667-.947-1.1-.906.924-1.547,1.2-2.721,1.2-1.388.001-2.469-.856-2.469-2.571c0-1.34.726-2.252,1.76-2.698.896-.395,2.147-.464,3.104-.573v-.213c0-.393.03-.857-.199-1.196-.203-.304-.587-.429-.926-.429-.629,0-1.191.323-1.333.992-.028.149-.137.295-.285.302l-1.602-.172c-.134-.03-.283-.139-.245-.347C5.977,9.725,7.731,9.14,9.299,9.14c.803,0,1.853.213,2.486.821.803.75.726,1.75.726,2.839v2.572c0,.773.32,1.112.622,1.531.107.149.13.327-.005.439l-1.259,1.094-.005-.005-.004.001Z" transform="matrix(.9 0 0 0.9-4.8006-8.2206)"/>
                                                </svg>  
                                              </a>
                                            </li>
                                      
                                            <li class="marketplacer_li_two">
                                              <a href="${buy_links[1].url}" class="marketplacer_li_link link" target="_blank" aria-label="to buy the book on the apple books">
                                                <svg id="apple-ibooks" xmlns="http://www.w3.org/2000/svg" x="0" y="0" version="1.1" viewBox="0 0 100 100" xml:space="preserve">
                                                      <g>
                                                        <linearGradient id="gradient-background${idx}" x1="-303.017" x2="-303.017" y1="748.267" y2="746.767" gradientTransform="matrix(60 0 0 -60 18231 44901)" gradientUnits="userSpaceOnUse">
                                                          <stop offset="0" stop-color="#aaaaaa"></stop>
                                                          <stop offset="1" stop-color="#909090"></stop>
                                                        </linearGradient>

                                                        <path fill="url(#gradient-background${idx})" d="M63.6 5c9 0 13.6 0 18.4 1.5 5.3 1.9 9.5 6.1 11.4 11.4C95 22.8 95 27.3 95 36.4v27.2c0 9 0 13.6-1.5 18.4-1.9 5.3-6.1 9.5-11.4 11.4C77.2 95 72.7 95 63.6 95H36.4c-9 0-13.6 0-18.4-1.5-5.3-2-9.5-6.2-11.5-11.5C5 77.2 5 72.7 5 63.6V36.4c0-9 0-13.6 1.5-18.4 2-5.3 6.2-9.5 11.5-11.5C22.8 5 27.3 5 36.4 5h27.2z"></path>
                                                        <path fill="#fff" d="M20 32.8s2.9-7.5 14.6-7.5c11.6 0 14.7 9.8 14.7 9.8v42s-3.7-11.2-14.6-11.2c-7.9 0-13.5 5.1-13.5 5.1-.6.5-1.2.2-1.2-.6V32.8zm60 0v37.5c0 .8-.5 1.1-1.2.6 0 0-5.6-5.1-13.5-5.1C54.5 65.8 50.8 77 50.8 77V35s3-9.8 14.7-9.8c11.6 0 14.5 7.6 14.5 7.6z"></path>
                                                      </g>
                                                  </svg>
                                              </a>
                                            </li>
                                      
                                          </ul>

                                        </div>
                                      </li>`;
                            }).join('\n');
  return markup;
}

  // Функція видалення книжки зі списку Shopping list
async function deleteBook({target}){

  if (target.classList.contains("bucket-btn")){

    const btns = document.querySelectorAll(".bucket-btn"); 
    btns.forEach(btn=>btn.setAttribute("disabled",""));

    //Видаляємо id книги з shoppinglist користувача в базі даних
    if (abortCtrl2) { 
      abortCtrl2.abort(); 
    }

    try{

      const book_id = target.dataset.id;                      // id книги, яку видаляємо
      const delitedBookContainer = target.parentElement;      // контейнер книги, яку видаляємо 
      const LOCALSTORAGE_KEY ="bookshelf_orderedbooks"
      const orderedBooksIdArray = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));   // забираємо з localStorage масив id обраних книжок до видалення
      const bookIdDelete_idx = orderedBooksIdArray.indexOf(book_id);                    // Знаходимо індекс id книжки, що видалається, в масиві orderedBooksIdArray   

      abortCtrl2 = new AbortController();
      const {shopping_list} = await api.removeFromShoppingList(book_id, abortCtrl2);

      if (shopping_list){

        // перезаписуємо localStorage новим масивом id за вичетом id видаленої книги
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(shopping_list));    
       
        //  orderedBooksIdArray.splice(bookIdDelete_idx, 1);

        //видаляємо інформацію по книзі з масивe shoppingBooks
        shoppingBooks = shoppingBooks.filter(item => item._id != book_id);        

        // зміщуємо елемент, що видаляться, вправо за межі екрану
        const delItem = books_ul.children[bookIdDelete_idx];
        delItem.classList.add("shift-right");

        //вираховуємо який номер на сторінці має єлемент, що видаляється (від 0 до booksOnPage-1)
        const numberOnPage = bookIdDelete_idx - booksOnPage* Math.trunc((bookIdDelete_idx) / booksOnPage);
        
        //зміщуємо вгору всі елементи, що стоять на сторінці за елементом, який видаляється. 
        //Ставимо відтермінування setTimeout для того щоб зміщення вгору відбулося після зміщення вправо елемента delItem
        const time = 600;
        setTimeout(()=>{ 
          if (bookIdDelete_idx+1 < books_ul.children.length){
            
            //визначаэмо діапазон індексів елементів, які треба змістити вгору
            const from_idx= bookIdDelete_idx+1;
            const to_idx= (bookIdDelete_idx+(booksOnPage-1-numberOnPage) >= (books_ul.children.length-1)) ? books_ul.children.length-1 : bookIdDelete_idx+(booksOnPage-1-numberOnPage);
            
            for (let i = from_idx; i <= to_idx; i++){
              let books_li = books_ul.children[i];
              books_li.classList.add("shift-up");
            }
          }
        }, time);

        //фізично видаляємо елемент delItem зі списку list, скасовуємо стилі зміщення, відображаємо на поточній сторінці перший елемент з наступної сторінки, та перемалбовуємо пагінацію
        setTimeout(()=>{ 

          //фізично видаляємо елемент зі списку list 
          books_ul.children[bookIdDelete_idx].remove();

          //Перезаписуємо кількість замовлених книжок в кошику після видалення книжки
          displayOrdredAmountInShoppingBag(shopping_list);

          //активуємо всі кнопки bucket-btn
          btns.forEach(btn=>btn.removeAttribute("disabled"));

          //якщо після видалення елементу список list залишився пустим, то виводимо елемент Emptybooks_ulBox
          if (books_ul.children.length === 0){
            createEmptyBooksBox();
          }else{
          
            // скасовуємо стилі зміщення в елементів списку
            [...books_ul.children].forEach((li)=>{
              li.classList.remove("shift-right");
              li.classList.remove("shift-up");
            });

            //шукаємо наступний елемент, що йде за останнім видимим елементом на сторінці
            const nextIdx =  [...books_ul.children].findIndex((li, idx) => ((idx > bookIdDelete_idx-1) && li.classList.contains("non-active")));

            if (nextIdx != -1) {
              books_ul.children[nextIdx].classList.remove("non-active");                                                     //якщо наступний елемент є то показуємо його
            }
            if (Math.ceil(shoppingBooks.length / booksOnPage) < pagesCount){
              currentPage = deleteLastPaginationPage(paginationBox);
              pagesCount = pagesCount-1;
              if (pagesCount < 2){
                paginationBox.remove();
              }
            }
            books_ul.innerHTML = showPage(shoppingBooks, currentPage, booksOnPage);                                        // відображаємо книжки активної сторінки
          }
        }, 2*time);   
                  
      }

    }catch(error){
      if (error.message === "Request failed with status code 401"){
          document.querySelector('.logo-link').click();
      }else{
          const errorBox = document.createElement("div");
          divBackdropEl.append(errorBox);
          errorBox.classList.add("error-box");
          errorBox.innerHTML = `<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>`;
      }
    }    
  }
}

  //Функція додає до shoppingBooksBox контейнер з картинкою коли список замовлених книжок пустий
function createEmptyBooksBox(){

  const emptybooks_ulBox = document.createElement("div");
  emptybooks_ulBox.classList.add("empty-shopping_booklist");
  emptybooks_ulBox.innerHTML = `<p class="empty-shopping-box-text">This page is empty, add some books and proceed to order.</p>
                                <div class="empty-shopping-box-picturebox">
                                  <picture>
                                    <source
                                      srcset="${stackOfBooks_mobile_1x} 1x, ${stackOfBooks_mobile_2x} 2x"
                                      media="(max-width: 767.9px)"
                                    >
                                    <source
                                    srcset="${stackOfBooks_tablet_1x} 1x, ${stackOfBooks_tablet_2x} 2x"
                                      media="(min-width: 768px) and (max-width: 1439.8px)"
                                    >
                                    <source
                                    srcset="${stackOfBooks_desktop_1x} 1x, ${stackOfBooks_desktop_2x} 2x"
                                      media="(min-width: 1440px)"
                                    >
                                    <img 
                                      src=${stackOfBooks_desktop_1x}
                                      alt="stack of books" 
                                    >
                                  </picture>
                                </div>`
  shoppingBooksBox.append(emptybooks_ulBox);
}

  // Обробка події натискання на кнопки пагінації
function onPaginationClick(paginationBox, target){
    
  if (target.classList.contains("left-double-arrow-btn") || target.classList.contains("left-double-arrow-svg")) {

    currentPage = nextPageGroupLeft(paginationBox, currentPage, visiblePagesCount);
    books_ul.innerHTML = showPage(shoppingBooks, currentPage, booksOnPage);
    
  }else if (target.classList.contains("left-arrow-btn") || target.classList.contains("left-arrow-svg")) {
    
    currentPage= setPaginationPage(paginationBox, currentPage-1, visiblePagesCount);
    books_ul.innerHTML = showPage(shoppingBooks, currentPage, booksOnPage);

  }else if (target.classList.contains("left-three-dots-btn") || target.classList.contains("left-three-dots-svg")) {
      
      currentPage = shiftPageLeft(paginationBox, 2);
      books_ul.innerHTML = showPage(shoppingBooks, currentPage, booksOnPage);

  }else if (target.classList.contains("number-btn") && (!target.classList.contains("active"))){

    currentPage = setPaginationPage(paginationBox, Number(target.textContent));
    books_ul.innerHTML = showPage(shoppingBooks, currentPage, booksOnPage);
  
  }else if (target.classList.contains("right-three-dots-btn") || target.classList.contains("right-three-dots-svg")) {
      
    currentPage=shiftPageRight(paginationBox, 2);
      books_ul.innerHTML=showPage(shoppingBooks, currentPage, booksOnPage);

  }else if (target.classList.contains("right-arrow-btn") || target.classList.contains("right-arrow-svg")) {

    currentPage = setPaginationPage(paginationBox, currentPage+1);
    books_ul.innerHTML = showPage(shoppingBooks, currentPage, booksOnPage);

  }else if (target.classList.contains("right-double-arrow-btn") || target.classList.contains("right-double-arrow-svg")) {

    currentPage = nextPageGroupRight(paginationBox, currentPage, visiblePagesCount);
    books_ul.innerHTML = showPage(shoppingBooks, currentPage, booksOnPage);
    
  }

}
