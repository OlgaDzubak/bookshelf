import { booksAPI } from './booksAPI';
import {scrollToBoxTop, scrollUp} from './help_functions';
import {createPagination,
        deleteLastPaginationPage, 
        setPaginationPage, 
        shiftPageLeft, 
        shiftPageRight, 
        nextPageGroupLeft, 
        nextPageGroupRight} from './pagination'
import amazon from '/src/images/svg/amazon_icon.svg';
import appleBook from '/src/images/svg/ibooks.svg';
import bucketTrash from '/src/images/png/trash-03.png';
import stackOfBooks_mobile_1x from '/src/images/shopping_list/stack_of_books_mobile@1x.png';
import stackOfBooks_mobile_2x from '/src/images/shopping_list/stack_of_books_mobile@2x.png';
import stackOfBooks_tablet_1x from '/src/images/shopping_list/stack_of_books_tablet@1x.png';
import stackOfBooks_tablet_2x from '/src/images/shopping_list/stack_of_books_tablet@2x.png';
import stackOfBooks_desktop_1x from '/src/images/shopping_list/stack_of_books_desktop@1x.png';
import stackOfBooks_desktop_2x from '/src/images/shopping_list/stack_of_books_desktop@2x.png';
import { createBooksBoxTitle, createLoader, displayOrdredAmountInShoppingBag, scrollToBoxTop } from './help_functions';

const fetchBooks = new booksAPI();

const bucketCard = [
  {
    img: bucketTrash,
  },
];

const shoppingBooksBox = document.querySelector('.shopping-wrapper');
const shoppingBooksBoxTitle = createBooksBoxTitle(shoppingBooksBox, "Shopping List");
const LOCALSTORAGE_KEY = 'orderedBookID';
let orderedBooksIdArray = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [];
let shoppingBooks = [];
const booksOnPage = 3;
let paginationBox, books_ul;
let currentPage = 1;
let pagesCount;
let visiblePagesCount, abortCtrl1;

const pageWidth = document.documentElement.scrollWidth;
if (pageWidth < 768) {
  visiblePagesCount = 2;
} else if (pageWidth >= 768){
  visiblePagesCount = 3
}

scrollUp();

if (orderedBooksIdArray.length) {
  createShoppingList(currentPage);
}  else {
  createEmptyBooksBox();
}

// ФУНКЦІЇ -----------------------------------------------------------------------------------------------------

  // Центральна функція, робить перевірки, запит та відмальовує
async function createShoppingList() {

    if (abortCtrl1) {
      abortCtrl1.abort();
      console.log("abort previous ordered books fetch");
    }

    const loader1 = createLoader(shoppingBooksBoxTitle);
    
    abortCtrl1 = new AbortController();
    const data = await fetchOrderedBooks(orderedBooksIdArray, abortCtrl1);
    
    loader1.remove();

    if (data.length){

      books_ul = document.createElement("ul");
      books_ul.classList.add("list","shopping_booklist");
      shoppingBooksBoxTitle.after(books_ul);
      books_ul.addEventListener('click', deleteBook);

      shoppingBooks = [];
      data.forEach((item) => shoppingBooks.push(item.data));

      books_ul.innerHTML =  showPage(shoppingBooks, 1, booksOnPage);

      pagesCount = Math.ceil(shoppingBooks.length / booksOnPage);

      //стиворюємо пагінацію, якщо сторінок більше за 1
      if (pagesCount > 1 ) {

        paginationBox = createPagination(shoppingBooks.length, booksOnPage, visiblePagesCount, "shopping_booklist_pagination");
        shoppingBooksBox.append(paginationBox);
        currentPage = setPaginationPage(paginationBox, 1);
        paginationBox.addEventListener('click', ({target})=>{onPaginationClick(paginationBox, target)});

      }
    }
}

  // Функція формування та відправлення запиту
async function fetchOrderedBooks(arr, abortCtrl) {
  try {
    const arrayOfPromises = arr.map(async Id => {
      const response = await fetchBooks.getBookById(Id, abortCtrl);
      return response;
    });
    return await Promise.all(arrayOfPromises);
  } catch (error) {
    const errorBox = document.createElement("div");
    shoppingBooksBox.append(errorBox);
    errorBox.classList.add("error-box");
    errorBox.innerHTML = `<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>`;
  }
}

  // Функція створення розмітки ShoppingBooks
function showPage(dataArray, page, itemsOnPage) {
  
  const startShownItem_idx = (page - 1)* itemsOnPage;
  const lastShownItem_idx = startShownItem_idx + (itemsOnPage-1); 

  const markup = dataArray.map(({ _id, book_image, list_name, author, title, description, buy_links }, idx) =>{
                            
                            return  ` <li data-id="${_id}" class="book-card ${((idx >= startShownItem_idx) && (idx <= lastShownItem_idx)) ? '' : 'non-active' }">

                                        <div class="book-image-div">
                                          <img class="book-image" src='${book_image}' alt='${title}'>
                                        </div>

                                        <div class="book-card-content-div">

                                          <div class="book_information">
                                            <p class="book-title">${title}</p>
                                            <p class="book-category">${list_name}</p>
                                            <p class="book-description">${description ? description : 'No description'}</p>
                                            <p class="book-author">${author}</p>
                                          </div>
                                          
                                          <button data-id="${_id}" class="bucket-btn">
                                            <img src="${bucketCard[0].img}" alt="amazon">
                                          </button>
                                        
                                          <ul class="market_placers_list list">
                                      
                                            <li class="marketplacer_li_one">
                                              <a href="${buy_links[0].url}" class="marketplacer_li_link link">
                                                <img class="image-market" src="${amazon}" alt="amazon">  
                                              </a>
                                            </li>
                                      
                                            <li class="marketplacer_li_two">
                                              <a href="${buy_links[1].url}" class="marketplacer_li_link link">
                                                <img class="image-market" src="${appleBook}" alt="apple-books">      
                                              </a>
                                            </li>
                                      
                                          </ul>

                                        </div>
                                      </li>`;
                            }).join('\n');
  return markup;
}

  // Функція видалення книжки зі списку Shopping list
function deleteBook({target}){

  if (target.classList.contains("bucket-btn")){
    
    //знаходимо всі кнопки bucket-btn та деактивуємо їх (після аніммційних зміщень елемента списку та видалення книги знову їх активуємо)
    const btns = document.querySelectorAll(".bucket-btn");
    btns.forEach(btn=>btn.setAttribute("disabled",""));

    //Знаходимо індекс id книжки, що видалається, в масиві orderedBooksIdArray
    const bookIdDelete_idx = orderedBooksIdArray.indexOf(target.dataset.id);

    //видаляємо id книги та інформацію по книзі з масивів orderedBooksIdArray та shoppingBooks
    orderedBooksIdArray.splice(bookIdDelete_idx, 1);
    shoppingBooks = shoppingBooks.filter(item => item._id != target.dataset.id);
    
    //Перезаписуємо сховище
    localStorage.removeItem(LOCALSTORAGE_KEY);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(orderedBooksIdArray));
    
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
      displayOrdredAmountInShoppingBag(orderedBooksIdArray);

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
      currentPage=shiftPageLeft(paginationBox, 2);
      books_ul.innerHTML=showPage(shoppingBooks, currentPage, booksOnPage);
  }else if (target.classList.contains("number-btn") && (!target.classList.contains("active"))){
    currentPage = setPaginationPage(paginationBox, Number(target.textContent));
    books_ul.innerHTML = showPage(shoppingBooks, currentPage, booksOnPage);
  
  }else if (target.classList.contains("right-three-dots-btn") || target.classList.contains("right-three-dots-svg")) {
      currentPage=shiftPageRight(paginationBox, 2);
      books_ul.innerHTML=showPage(shoppingBooks, currentPage, booksOnPage);
  }else if (target.classList.contains("right-arrow-btn") || target.classList.contains("right-arrow-svg")) {
      // currentPage = shiftPageRight(paginationBox, 1);
    currentPage = setPaginationPage(paginationBox, currentPage+1);
    books_ul.innerHTML = showPage(shoppingBooks, currentPage, booksOnPage);
  }else if (target.classList.contains("right-double-arrow-btn") || target.classList.contains("right-double-arrow-svg")) {
    currentPage = nextPageGroupRight(paginationBox, currentPage, visiblePagesCount);
    books_ul.innerHTML = showPage(shoppingBooks, currentPage, booksOnPage);
    
  }

}