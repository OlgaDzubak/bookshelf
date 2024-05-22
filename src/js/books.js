import { booksAPI } from './booksAPI';
import {shortTitle, lastBlueWord} from './help_functions';

const fetchBooks = new booksAPI();

const categoryListBox = document.querySelector(".category-list-box");
const categoryList = categoryListBox.querySelector(".category-list");
const itemAllCategories = categoryListBox.querySelector("#category-list-title");
const loader1 =categoryListBox.querySelector(".loader");

const booksBox = document.querySelector(".books-box");
const booksBoxTitle = booksBox.querySelector(".title-theme-book");
const booksList = booksBox.querySelector(".list");
const loader2 = document.querySelector(".books-box .loader");
const btnScroll = booksBox.querySelector('.btn-up-scroll');     

let abortCtrl1, abortCtrl2, abortCtrl3;                         

showCategoryList();                                             

categoryListBox.addEventListener('click', showBooksOfCategory);  // слухач на меню категорій книжок
itemAllCategories.click();                                       // клікаємо на пункт All Categories, щоб завантажити best sellers books
booksList.addEventListener('click', seeMore);                    // слухач на кнопку seeMore з блоку Best Sellers Books
btnScroll.addEventListener('click', scrollUp);                   // слухач на кнопку скролу на початок сторінки
window.addEventListener('scroll', scrollTracker);                // слухач на подію скролу сторінки щоб своєчасно показати кнопку повернення на початок сторінки


// функції завантаження даних з бекенду -------------------------------------------------------------------------
        
        // Функція запиту на отримання назв категорій від бекенду
    async function fetchCategoryList(abortCtrl1) {
        try {
            const { data } = await fetchBooks.getCategoryList(abortCtrl1);
            if (!data.length) { 
                return Notify.failure("Can't find list of categories on the server. Please reload the page!"); 
            }
            return data;
        }
        catch (error) {
            if (error.code !== 'ERR_CANCELED'){
                console.error(error);
                categoryList.innerHTML = `<li class="error-box">
                                            <p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>
                                          </li>`;
            }
           return [];
        } 
    }
        // Функція запиту на отримання списку найкращіх книжок від бекенду
    async function fetchBestSellersBooks(abortCtrl2) {

        try {
            const { data } = await fetchBooks.getTopBooks(abortCtrl2);
            if (!data.length) { return Notify.failure("Can't find best sellers books on the server. Please reload the page!"); }
            return data;
        }
        catch (error){
            if (error.code !== 'ERR_CANCELED'){
                console.error(error);
                booksList.innerHTML = `<li class="error-box">
                                            <p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>
                                       </li>`;
            }
            return [];
        }
    }
        // Функція запиту на отримання списку книг однієї категорії від бекенду
    async function fetchBooksOfCategory(category, abortCtrl3) {
        try {

            const { data } = await fetchBooks.getBooksByCategory(category, abortCtrl3);
            if (!data.length) { return Notify.failure("Can't find books of category <" + category + "> on the server. Please reload the page!"); }
            return data;
        }
        catch (error) {
            if (error.code !== 'ERR_CANCELED'){
                console.error(error);
                booksList.innerHTML =  `<li class="error-box">
                                            <p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>
                                        </li>`;
            }
            return [];
        } 
    }

// функції формування розмітки -----------------------------------------------------------------------------------

        // розмітка списку категорій
    function createCategoryListMarkup(data) {

        let categoryListHTML = "";

        data.forEach(category => {
            const categoryLink = `  <li id="${category.list_name}" class="category-list-item"> 
                                        ${category.list_name}
                                    </li> `;
            categoryListHTML += categoryLink;
        });

        return categoryListHTML;
    };
        // розмітка best sellers books
    function createBestSellersBooksMarcup(data, querty) {

        const markup = data.map(({list_name, books}) => {
            const category = `<p class="theme-book">${list_name}</p>`;

            if (books.length) {
                let booksOfCategory = books.splice(0, querty).map(({_id, book_image, title, author}) => 
                `<li class="item-book" data-id="${_id}">
                    <div class="img-owerlay">
                        <img src="${book_image}" alt="${title}" class="img-book">
                        <div class="owerlay">
                            <p class="owerlay-content">quick view</p>
                        </div>
                    </div>
                    <p class="title-book">${shortTitle(title, 17)}</p>
                    <p class="author">${shortTitle(author, 34)}</p>
                </li>`).join('');

                return `<li class="best-book-container">${category}
                            <ul class="list-books">${booksOfCategory}</ul>
                            <button type="button" class="button-more js-btn-more" id="${list_name}">See more</button>
                        </li>`
            } else {
                return `<li class="off-books best-book-container">${category}
                            <p class="off-books-text">Sorry, there are no books in this category, please choose another category</p>
                        </li>`
            }}).join('');

            return markup;
    }
        // розмітка books of category
    function createBooksOfCategoryMarcup(data, querty) {

        if(data.length){
            const markup = data.map(({_id, book_image, author, title}) => 
            `<li class="item-book" data-id="${_id}">  
                <div class="img-owerlay">
                    <img src="${book_image}" alt="${title}" class="img-book">
                    <div class="owerlay">
                        <p class="owerlay-content">quick view</p>
                    </div>
                </div>
                <p class="title-book">${shortTitle(title, 17)}</p>
                <p class="title-author">${shortTitle(author, 34)}</p>
            </li>`
            ).join('')

            return markup;
        } else {
                return `<liv class="off-books">
                            <p class="off-books-text">Sorry, there are no books in this category, please choose another category</p>
                        </li>`
        }
    }


// функції виводу даних на сайт ----------------------------------------------------------------------------------

        // Відправлення запиту і формування списку під час завантаження сторінки 
    async function showCategoryList() {
        scrollUp();
        if (abortCtrl1) {
            abortCtrl1.abort();
            console.log("abort showCategoryList");
        } 

        loader1.classList.remove('loader-non-active');
        
        abortCtrl1 = new AbortController();
        const data = await fetchCategoryList(abortCtrl1);

        if (data.length) {
            categoryList.innerHTML = createCategoryListMarkup(data);
            categoryListBox.classList.add("category-list-box-not-empty");
        }

        loader1.classList.add('loader-non-active');
    };
        // Відправлення запиту і формування списку best sellers books 
    async function showBestSellersBooks(){
        
        if (abortCtrl2) {
            abortCtrl2.abort();
            console.log("abort showBestSellersBooks");
        } 
        
        booksBoxTitle.innerHTML = `${lastBlueWord("Best Sellers Books")}`;
        booksList.innerHTML=""
        booksList.classList.remove("category-books-list");
        booksList.classList.add("best-books-list");

        loader2.classList.toggle("loader-non-active");
        abortCtrl2 = new AbortController();

        const data = await fetchBestSellersBooks(abortCtrl2);

        if (data.length) {
            
            const pageWidth = document.documentElement.scrollWidth;

            if (pageWidth < 768) {
                booksList.innerHTML = createBestSellersBooksMarcup(data, 1);
            } else if (pageWidth < 1440 && pageWidth >= 768) {
                booksList.innerHTML = createBestSellersBooksMarcup(data, 3);
            } else {
                booksList.innerHTML = createBestSellersBooksMarcup(data, 5);
            }
            
        }

        loader2.classList.toggle('loader-non-active');
    }
        // Відправлення запиту і формування списку книг однієї категорії 
    async function showBooksOfCategory({target}){

        if ((!target.classList.contains('category-list-item')) && (!target.classList.contains('js-btn-more'))){
            return;
        } else {
            
            const category = target.id.split(" ").join("%20");
            
            if (category === 'category-list-title') {
              //  scrollToTitle();
                showBestSellersBooks();
               // scrollToTitle();

            } else {
                          
                if (abortCtrl3) {
                    abortCtrl3.abort();
                    console.log("abort showBooksOfCategory");
                }

                booksBoxTitle.innerHTML = `${lastBlueWord(target.id)}`;
                booksList.innerHTML=""
                
                scrollToTitle();

                booksList.classList.remove("best-books-list");
                booksList.classList.add("category-books-list");

                loader2.classList.toggle('loader-non-active');
                
                abortCtrl3 = new AbortController();
                const data  = await fetchBooksOfCategory(category, abortCtrl3);

                if (data.length) {

                    const pageWidth = document.documentElement.scrollWidth;
                    if (pageWidth < 768) {
                        booksList.innerHTML = createBooksOfCategoryMarcup(data, 1);
                    } else if (pageWidth < 1440 && pageWidth >= 768) {
                        booksList.innerHTML = createBooksOfCategoryMarcup(data, 3);
                    } else {
                        booksList.innerHTML = createBooksOfCategoryMarcup(data, 5);
                    }

                }

                loader2.classList.toggle('loader-non-active');
            
                scrollToTitle();
            }
            
        }
        
    }


// функції для кнопки see more та скролу на початок сторінки -----------------------------------------------------

        //Функція для кнопки seeMore cписку книг однієї категорії
    async function seeMore(event) {
        
        event.preventDefault();
            
        const { target } = event;
                
        try {
            if(!target.classList.contains('js-btn-more')) { 
                return;
            } else {
                showBooksOfCategory(event);
                scrollUp();
            }
        } catch (error) {

            console.error(error);
            Notify.failure('Sorry, there was a server error, please reload the page');

        }
    }
        // Функція скролу на початок сторінки
    function scrollUp() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        btnScroll.classList.add('is-hidden-btn')
    }
        // Функція показу кнопки повернення на початок сторінки
    function scrollTracker() {
        const offset = window.scrollY || window.pageYOffSet;
        const highDocument = document.documentElement.clientHeight;
        if (offset > highDocument) {
            btnScroll.classList.remove('is-hidden-btn');
        } else {
            btnScroll.classList.add('is-hidden-btn');
        }
    }

    function scrollToTitle(){
        window.scroll({
            top: booksBoxTitle.offsetTop ,
            left: 0,
            behavior: "smooth",
          });
    }