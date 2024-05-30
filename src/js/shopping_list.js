import { booksAPI } from './booksAPI';
import {scrollToBoxTop} from './help_functions';
import amazon from '/src/images/svg/amazon_icon.svg';
import appleBook from '/src/images/svg/ibooks_icon.svg';
import bucketTrash from '/src/images/png/trash-03.png';
import stackOfBooks_mobile_1x from '/src/images/shopping_list/stack_of_books_mobile@1x.png';
import stackOfBooks_mobile_2x from '/src/images/shopping_list/stack_of_books_mobile@2x.png';
import stackOfBooks_tablet_1x from '/src/images/shopping_list/stack_of_books_tablet@1x.png';
import stackOfBooks_tablet_2x from '/src/images/shopping_list/stack_of_books_tablet@2x.png';
import stackOfBooks_desktop_1x from '/src/images/shopping_list/stack_of_books_desktop@1x.png';
import stackOfBooks_desktop_2x from '/src/images/shopping_list/stack_of_books_desktop@2x.png';


import { createBooksBoxTitle, createLoader, displayOrdredAmountInShoppingBag, scrollToBoxTop } from './help_functions';
const fetchBooks = new booksAPI();

const photoItemsOne = [
  {
    img: amazon,
  },
];
const photoItemsTwo = [
  {
    img: appleBook,
  },
];
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
let books_ul;
let paginationBox;
let currentPage = 1;
let abortCtrl1;


if (orderedBooksIdArray.length) {
  createShoppingList(currentPage);
}  else {
  createEmptyBooksBox();
}


// ФУНКЦІЇ -----------------------------------------------------------------------------------------------------

  // Центральна функція, робить перевірки, запит та відмальовує
async function createShoppingList(activePage) {

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

      if (shoppingBooks.length >= booksOnPage) {

        books_ul.innerHTML = createShoppingBooksMarcup(shoppingBooks, 0, booksOnPage-1);

        const pagesCount = Math.ceil(shoppingBooks.length / booksOnPage);

        if (pagesCount > 1 ) {

          paginationBox = document.createElement("div");
          paginationBox.classList.add("shopping_booklist_pagination");
          paginationBox.innerHTML = createPaginationMarkup(pagesCount, currentPage);
          shoppingBooksBox.append(paginationBox);

          paginationBox.addEventListener('click', (event)=>{
            clickedButton = event.target;
            if (!clickedButton.classList.contains("active")){
              const page = Number(clickedButton.textContent);
              setPaginationPage(paginationBox, page);
              books_ul.innerHTML = createShoppingBooksMarcup(shoppingBooks, booksOnPage * (page-1), booksOnPage * page-1) ; //createShoppingBooksMarcup(shoppingBooks.slice(booksOnPage * (page-1), booksOnPage * page));
              scrollToBoxTop(shoppingBooksBox);
            }
          });
        }

      }else {
        books_ul.innerHTML = createShoppingBooksMarcup(shoppingBooks, 0, booksOnPage-1);
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
function createShoppingBooksMarcup(dataArray, startShownItem_idx, lastShownItem_idx) {
  const markup = dataArray.map(({ _id, book_image, list_name, author, title, description, buy_links }, idx) =>{
                            
                            return  ` <li data-id="${_id}" class="book-card ${((idx >= startShownItem_idx) && (idx <= lastShownItem_idx)) ? '' : 'non-active' }">

                                        <div class="book-image-div">
                                          <img class="book-image" src='${book_image}' alt='${title}'>
                                        </div>

                                        <div class="book_information">
                                          <p class="book-title">${title}</p>
                                          <p class="book-category">${list_name}</p>
                                          <p class="book-description">${description ? description : 'No description'}</p>
                                          <p class="book-author">${author}</p>
                                        </div>

                                        <div class="closer">
                                          <button data-id="${_id}" class="bucket-btn">
                                            <img class="image-bucket" src="${bucketCard[0].img}" alt="amazon">
                                          </button>
                                        </div>
                                      
                                        <div class="market_places_div">
                                          <ul class="market_placers_list list">
                                      
                                            <li class="marketplacer_li_one">
                                              <a href="${buy_links[0].url}" class="marketplacer_li_link link">
                                                <img class="image-market" src="${photoItemsOne[0].img}" alt="amazon">  
                                              </a>
                                            </li>
                                      
                                            <li class="marketplacer_li_two">
                                              <a href="${buy_links[1].url}" class="marketplacer_li_link link">
                                                <img src="${photoItemsTwo[0].img}" alt="apple-books">      
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
      if (books_ul.children.length ===0){
        createEmptyBooksBox();
      }
      
      // скасовуємо стилі зміщення в елементів списку
      [...books_ul.children].forEach((li)=>{
        li.classList.remove("shift-right");
        li.classList.remove("shift-up");
      });

      //шукаємо наступний елемент, що йде за останнім видимим елементом на сторінці
      const nextIdx =  [...books_ul.children].findIndex((li, idx) => ((idx > bookIdDelete_idx-1) && li.classList.contains("non-active")));
      const pagesCount = Math.ceil(shoppingBooks.length / booksOnPage)

      if (nextIdx != -1) {
        books_ul.children[nextIdx].classList.remove("non-active");                                                     //якщо наступний елемент є то показуємо його
      }else if((bookIdDelete_idx === orderedBooksIdArray.length) && (shoppingBooks.length % booksOnPage === 0)) {      //якщо наступного елемента немає і на поточній сторінці не залишилося книжок, то переходимо на попередню сторінку
        currentPage = currentPage - 1;                                                                                 // запом'ятовуємо номер активної сторінки
        books_ul.innerHTML = createShoppingBooksMarcup(shoppingBooks, booksOnPage * (currentPage-1) , booksOnPage * currentPage - 1); // відображаємо книжки активної сторінки
      }

      //Перезаписуємо пагінацію
      const paginationBox = document.querySelector(".shopping_booklist_pagination");
      if (paginationBox){
        if (pagesCount > 1){
          paginationBox.innerHTML = createPaginationMarkup(pagesCount, currentPage);
        }else{
          paginationBox.remove();
        }
      }
      
    }, 2*time);   
    
  }
}

  // Функція яка повертає розмітку пагінації
function createPaginationMarkup(pagesCount, activePage){
  let paginationMarkup = "";
  for (let i=1; i<=pagesCount; i++ ){
       if (i === activePage ) { 
        paginationMarkup = paginationMarkup + `<button type="button" class="btn-two active">${i}</button>`;
      } else{
        paginationMarkup = paginationMarkup + `<button type="button" class="btn-two">${i}</button>`;
      }
  } 
  return paginationMarkup;
};

  //Додає клас активної сторінки
function setPaginationPage(paginationList, page) {
  if (paginationList){
    for (const button of paginationList.children) {
      if (Number(button.textContent) === page) {
        button.classList.add('active');
        currentPage = page;
      }

      if (Number(button.textContent) !== page) {
        button.classList.remove('active');
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