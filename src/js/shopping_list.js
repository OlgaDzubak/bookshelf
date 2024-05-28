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
let shoppingBookList;
let paginationBox;
let currentPage = 1;
let abortCtrl1;


if (orderedBooksIdArray.length) {
  createShoppingList(currentPage);
}  else {
  createEmptyShoppingBooklistBox();
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

      shoppingBookList = document.createElement("ul");
      shoppingBookList.classList.add("list","shopping_booklist");
      shoppingBooksBoxTitle.after(shoppingBookList);
      shoppingBookList.addEventListener('click', deleteBook);

      shoppingBooks = [];
      data.forEach((item) => shoppingBooks.push(item.data));

      if (shoppingBooks.length >= booksOnPage) {

        shoppingBookList.innerHTML = createShoppingBooksMarcup(shoppingBooks, 1, booksOnPage); //createShoppingBooksMarcup(shoppingBooks.slice(0, booksOnPage ));

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
              shoppingBookList.innerHTML = createShoppingBooksMarcup(shoppingBooks, booksOnPage * (page-1) + 1, booksOnPage * page) ;//createShoppingBooksMarcup(shoppingBooks.slice(booksOnPage * (page-1), booksOnPage * page));
              scrollToBoxTop(shoppingBooksBox);

            }
          });
        }

      }else {
        shoppingBookList.innerHTML = createShoppingBooksMarcup(shoppingBooks, 1, booksOnPage);
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
                            
                            return  ` <li data-id="${_id}" class="book-card ${((idx >= startShownItem_idx-1) && (idx <= lastShownItem_idx-1)) ? '' : 'non-active' }">

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
    
    //Знаходимо індекс id книжки, що видалається, в масиві orderedBooksIdArray
    const bookIdDelete_idx = orderedBooksIdArray.indexOf(target.dataset.id);

    //вираховуємо яка сторінка буде активною після видалення книжки поточна або попередня
    if (((bookIdDelete_idx + 1) === orderedBooksIdArray.length) && (shoppingBooks.length % booksOnPage === 1)) {
      currentPage = currentPage - 1;
    }

    //видаляємо id книги та інформацію по книзі з масивів orderedBooksIdArray та shoppingBooks
    orderedBooksIdArray.splice(bookIdDelete_idx, 1);
    shoppingBooks = shoppingBooks.filter(item => item._id != target.dataset.id);
    
    //Перезаписуємо сховище
    localStorage.removeItem(LOCALSTORAGE_KEY);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(orderedBooksIdArray));

    deleteBookItemFromMarkUp(shoppingBookList, target.dataset.id)
  
    //shoppingBookList.innerHTML = createShoppingBooksMarcup(shoppingBooks.slice(booksOnPage * (currentPage-1) , booksOnPage * currentPage));
    
    //Перезаписуємо пагінацію
    const pagesCount = Math.ceil(shoppingBooks.length / booksOnPage);
    const pagination = document.querySelector(".shopping_booklist_pagination");
    if (pagination){
      if (pagesCount > 1){
        pagination.innerHTML = createPaginationMarkup(pagesCount, currentPage);
      }else{
        pagination.remove();
      }
    }

    //Перезаписуємо кількість замовлених книжок в кошику після видалення книжки
    setTimeout(()=>{displayOrdredAmountInShoppingBag(orderedBooksIdArray)},1000);
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

  //Функція додає до shoppingBooksBox контейнер з картинкою коли список замовлених книжок пустий
function createEmptyShoppingBooklistBox(){

  const emptyShoppingBooklistBox = document.createElement("div");
  emptyShoppingBooklistBox.classList.add("empty-shopping_booklist");
  emptyShoppingBooklistBox.innerHTML = `<p class="empty-shopping-box-text">This page is empty, add some books and proceed to order.</p>
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
  shoppingBooksBox.append(emptyShoppingBooklistBox);
}



function deleteBookItemFromMarkUp(list, itemId){ 

        let isSuccess;

        const deletedItem_idx = [...list.children].findIndex((item)=>(item.getAttribute('data-id') === itemId));
        if (deletedItem_idx != -1) { 
          const delItem = list.children[deletedItem_idx];
          delItem.style.transitionProperty = "transform";
          delItem.style.transition = '1200ms linear';
          delItem.style.transform = `translateX(${document.documentElement.clientWidth -  delItem.offsetLeft}px`;

          setTimeout(()=>{ 
            
            list.children[deletedItem_idx].remove();
                       
            const nextIdx =  [...list.children].findIndex((item, idx) => ((idx > deletedItem_idx-1) && item.classList.contains("non-active")));
            if (nextIdx != -1) {
              list.children[nextIdx].classList.remove("non-active");
            }else if (deletedItem_idx-1 % booksOnPage === 0){
                // дописати код
        
            }
          },2000);
          
        } 
  }
