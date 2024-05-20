import { booksAPI } from './booksAPI';
import {shortTitle, lastBlueWord} from './help_functions';
import { Notify } from 'notiflix';

const fetchBooks = new booksAPI();

const categoryListBox = document.querySelector(".category-list-box");
const categoryList = document.querySelector(".category-list");       
const loader1 =categoryListBox.querySelector(".loader");

const booksBox = document.querySelector(".books-box");                
const booksBoxTitle = booksBox.querySelector(".title-theme-book");
const booksList = booksBox.querySelector(".list");       
const loader2 =booksBox.querySelector(".loader");
const btnScroll = document.querySelector('.btn-up-scroll');      

showCategoryList();
showBestSellersBooks();

categoryListBox.addEventListener('click', showBooksOfCategory);
booksList.addEventListener('click', seeMore);         
btnScroll.addEventListener('click', scrollUp);
window.addEventListener('scroll', scrollTracker);



// функції завантаження даних з бекенду -------------------------------------------------------------------------
        
        // Функція запиту на отримання назв категорій від бекенду
    async function fetchCategoryList() {
        try {
            const { data } = await fetchBooks.getCategoryList();
            if (!data.length) { 
                return Notify.failure("Can't find list of categories on the server. Please reload the page!"); 
            }
            return data;
        }
        catch (error) {
            console.error(error);
            Notify.failure('Sorry, there was a server error, please reload the page', {timeout: 3000});
           return [];
        } 
    }
        // Функція запиту на отримання списку найкращіх книжок від бекенду
    async function fetchBestSellersBooks() {
        try {
            const { data } = await fetchBooks.getTopBooks();
            if (!data.length) { return Notify.failure("Can't find best sellers books on the server. Please reload the page!"); }
            return data;
        }
        catch (error){
            console.error(error);
            Notify.failure('Sorry, there was a server error, please reload the page', {timeout: 3000});
            return [];
        }
    }
        // Функція запиту на отримання списку книг однієї категорії від бекенду
    async function fetchBooksOfCategory(category) {
        try {
            const { data } = await fetchBooks.getBooksByCategory(category);
            if (!data.length) { return Notify.failure("Can't find books of category <" + category + "> on the server. Please reload the page!"); }
            return data;
        }
        catch (error) {
            console.error(error);
            Notify.failure('Sorry, there was a server error, please reload the page');
            return [];
        } 
    }


// функції формування розмітки -----------------------------------------------------------------------------------

        // розмітка списку категорій
    function createCategoryListMarkup(data) {

        let categoryListHTML = "";

        data.forEach(category => {
            const categoryLink = `<li id="${category.list_name}" class="category-list-item">${category.list_name}</li>`;
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
                <p class="author">${shortTitle(author, 34)}</p>
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
        
        loader1.classList.remove('loader-non-active');

        const data = await fetchCategoryList();

        if (data.length) {
            categoryList.innerHTML = createCategoryListMarkup(data);
            categoryListBox.classList.add("category-list-box-not-empty");
        }

        loader1.classList.add('loader-non-active');
    };
        // Відправлення запиту і формування списку best sellers books 
    async function showBestSellersBooks(){

        booksBoxTitle.innerHTML = `${lastBlueWord("Best Sellers Books")}`;
        booksList.innerHTML="";
        booksList.classList.remove('category-books-list');
        booksList.classList.add('best-books-list');
        loader2.classList.remove('loader-non-active');

        const data = await fetchBestSellersBooks();

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

        loader2.classList.add('loader-non-active');

    }
        // Відправлення запиту і формування списку книг однієї категорії 
    async function showBooksOfCategory({target}){

        if ((!target.classList.contains('category-list-item')) && (!target.classList.contains('js-btn-more'))){
            return;
        } else {
            
            const category = target.id.split(" ").join("%20");
            
            if (category === 'category-list-title') {

                showBestSellersBooks();

            } else {

                booksBoxTitle.innerHTML = `${lastBlueWord(target.id)}`;
                booksList.innerHTML="";
                booksList.classList.remove('best-books-list');
                booksList.classList.add('category-books-list');
                loader2.classList.remove('loader-non-active');
                 
                const data  = await fetchBooksOfCategory(category);

                if (data.length) {

                    const pageWidth = document.documentElement.scrollWidth;
                    if (pageWidth < 768) {
                        booksList.innerHTML = createBooksOfCategoryMarcup(data, 1);
                    } else if (pageWidth < 1440 && pageWidth >= 768) {
                        booksList.innerHTML = createBooksOfCategoryMarcup(data, 3);
                    } else {
                        booksList.innerHTML = createBooksOfCategoryMarcup(data, 5);
                    }

                } else {

                    Notify.failure("Sorry, there was a server error, please reload the page");
                    return;

                }
                
                loader2.classList.add('loader-non-active');
                
                scrollUp();

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
