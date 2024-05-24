import { booksAPI } from './booksAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import amazon from '/src/images/svg/amazon_icon.svg';
import appleBook from '/src/images/svg/ibooks_icon.svg';
import bucketTrash from '/src/images/png/trash-03.png';
import { countShoppingBook } from './header';
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
const shoppingListDiv = document.querySelector('.shopping_booklist');
shoppingListDiv.addEventListener('click', removeBook);

const paginationList = document.querySelector('.shopping_booklist_pagination');
const rows = 3;
let currentPage = 0;

const LOCALSTORAGE_KEY = 'orderedBookID';
let orderedBooksId_str = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
if (!orderedBooksId_str) orderedBooksId_str = "";

const emptyShoppingBooklistBox = document.querySelector('.empty-shopping_booklist')

createShoppingList();


// ФУНКЦІЇ -----------------------------------------------------------------------------------------------------

  // Центральна функція, робить перевірки, запит та відмальовує
  async function createShoppingList() {
    let response = [];
    
    if (orderedBooksId_str.length) {
      response = await fetchOrderedBooks(orderedBooksId_str);
    }
    countShoppingBook(orderedBooksId_str);
    
    const shoppingBook = [];

    if (!response.length) {
      shoppingListDiv.remove();
      paginationList.remove();      
      emptyShoppingBooklistBox.classList.remove = "non-active";
      emptyShoppingBooklistBox.classList.add = "active";
      return;
    }

    response.forEach(({ data }) => shoppingBook.push(data));
    paginationList.innerHTML = '';

    if (shoppingBook.length > rows) {
      createPagination(shoppingBook, rows, currentPage);
      sliceArrayBooks(shoppingBook, rows, currentPage);
      controlPage(currentPage);
    } else {
      shoppingListDiv.innerHTML = await createMarcup(shoppingBook);
    }
  }

  // Функція формування та відправлення паралельного запиту
  async function fetchOrderedBooks(arr) {
    try {
      const arrayOfPromises = arr.map(async Id => {
        const response = await fetchBooks.getBookById(Id);
        return response;
      });

      // Запускаємо усі проміси паралельно і чекаємо на їх завершення
      return await Promise.all(arrayOfPromises);
    } catch (error) {
      Notify.failure('Sorry, there was a server error, please reload the page');
    }
  }

  // Функція створення розмітки
  async function createMarcup(arr) {
    const markup = arr
      .map(
        ({ _id, book_image, list_name, author, title, description, buy_links }) =>
          `<li class="book_card">
      <div class="book-image-div">
        <img class="book-image" src=${book_image} alt=${title}>
      </div>

      <div class="book_information">
        <p class="book-title">${title}</p>
        <p class="book-category">${list_name}</p>
        <p class="book-description">${
          description ? description : 'No description'
        }</p>
        <p class="book-author">${author}</p>
      </div>

      <div class="closer">
        <button data-id="${_id}" class="closer-btn">
          <img class="image-bucket" src="${bucketCard[0].img}" alt="amazon">
        </button>
      </div>

      <div class="market_places_div">
        <ul class="market_placers_list list">
          <li class="marketplacer_li_two">
            <a href="${buy_links[0].url}" class="marketplacer_li_link link">
              <img class="image-market" src="${
                photoItemsOne[0].img
              }" alt="amazon">  
            </a>
          </li>

          <li class="marketplacer_li">
            <a href="${buy_links[1].url}" class="marketplacer_li_link link">
              <img src="${photoItemsTwo[0].img}" alt="apple-books">      
            </a>
          </li>

          <li class="marketplacer_li">
            <a href="${buy_links[2].url}" class="marketplacer_li_link link">
              <img src="${photoItemsThree[0].img}" alt="barnes-and-noble">
            </a>
          </li>
      </div>
    </li>`
      )
      .join('');

    return markup;
  }

  // Функція видалення книг з шопінг листа
  async function removeBook(event) {
    const { target } = event;

    if (!target.classList.contains('closer-btn')) {
      return;
    } else {
      const bookId = target.dataset.id;
      localStorage.removeItem(LOCALSTORAGE_KEY);
      const bookDelete = orderedBooksId_str.indexOf(bookId);
      orderedBooksId_str.splice(bookDelete, 1);
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(orderedBooksId_str));
      countShoppingBook(orderedBooksId_str);
      return await createShoppingList();
    }
  }
  // Пагінація усі функції
  
    // Функція яка відмображає три елемента масиву відповідно до сторінки
    async function sliceArrayBooks(arr, rows, page) {
      const start = rows * page;
      const end = start + rows;
      const paginateArr = arr.slice(start, end);
      console.log(paginateArr);

      if (!paginateArr.length) {
        currentPage = page - 1;
        createShoppingList();
        return;
      }

      const markup = await createMarcup(paginateArr);

      shoppingListDiv.innerHTML = '';
      shoppingListDiv.innerHTML = markup;
    }

    // Функція яка створює кнопки пагінації в залежності від розміру масиву
    function createPagination(arr, rows) {
      const pagesCount = Math.ceil(arr.length / rows);

      if (arr.length <= rows) {
        return (paginationList.innerHTML = '');
      }

      for (let i = 0; i < pagesCount; i += 1) {
        const button = document.createElement('button');
        button.textContent = i + 1;
        button.classList.add('btn-two');

        button.addEventListener('click', event => {
          currentPage = Number(event.target.textContent) - 1;

          sliceArrayBooks(arr, rows, currentPage);
          controlPage(currentPage);
        });

        paginationList.append(button);
      }
    }

    // Додає клас активної сторінки
    function controlPage(page) {
      for (const button of paginationList.children) {
        if (Number(button.textContent) - 1 === page) {
          button.classList.add('active');
        }

        if (Number(button.textContent) - 1 !== page) {
          button.classList.remove('active');
        }
      }
    }
