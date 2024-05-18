import { booksAPI } from './booksAPI';
import {shortTitle, lastBlueWord} from './help_functions';
import { Notify } from 'notiflix';

const fetchBooks = new booksAPI()
const categoryListBox = document.querySelector(".category-list-box");   // сюди буде рендеритися список категорій книжок
const booksBox = document.querySelector(".books-box");                  // сюди буде рендеритися список best sellers books
const loader1 =categoryListBox.querySelector(".loader");
const loader2 =booksBox.querySelector(".loader");
const btnScroll = document.querySelector('.btn-up-scroll');             // Змінна та слухач на кнопку скарола

showBestSellersBooks();
showCategoryList();                                                     // завантажуємо та показуємо список категорій


categoryListBox.addEventListener('click', showBooksOfCategory);         // подія на обрання категорії
booksBox.addEventListener('click', seeMore);                            // подія на кнопку seeMore
btnScroll.addEventListener('click', scrollUp)
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
        }catch (error){
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
        let categoryListHTML = `<include src="partials/loader.html "></include>
                                <h3 id="category-list-title" class="category-list-item">All categories</h3>`;
        data.forEach(category => {
            const categoryLink = `<p id="${category.list_name}" class="category-list-item">${category.list_name}</p>`;
            categoryListHTML += categoryLink;
        });
        return categoryListHTML;
    };
        // розмітка best sellers books
    function createBestSellersBooksMarcup(data, querty) {

        const markup = data.map(({list_name, books}) => {
            const titleBook = `<p class="theme-book">${list_name}</p>`;

            if (books.length) {
                let book = books.splice(0, querty).map(({_id, book_image, title, author}) => 
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

                return `<div class="best-book-container">${titleBook}
                            <ul class="list-books">${book}</ul>
                            <button type="button" class="button-more js-btn-more" id="${list_name}">See more</button>
                        </div>`
            } else {
                return `<div class="off-books">
                            <p class="off-books-text">Sorry, there are no books in this category, please choose another category</p>
                        </div>`
            }}).join('');

            return `<include src="partials/loader.html "></include>
                    <h2 class="title-theme-book">Best Sellers <span class="last-word-color">Books</span></h2>
                    ${markup}`;
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

            return `<h2 class="title-theme-book">${lastBlueWord(data[0].list_name)}</h2>
                    <ul class="list-books category">${markup}</ul>`
        } else {
                return `<div class="off-books">
                            <p class="off-books-text">Sorry, there are no books in this category, please choose another category</p>
                        </div>`
        }
    }



// функції виводу даних на сайт ----------------------------------------------------------------------------------

        // Відправлення запиту і формування списку під час завантаження сторінки 
    async function showCategoryList() {
        
        loader1.classList.remove('loader-non-active');

        const data = await fetchCategoryList();

        if (data.length) {
            categoryListBox.innerHTML = createCategoryListMarkup(data);
            categoryListBox.classList.add("category-list-box-not-empty");
        }else{          
            loader1.classList.add('loader-non-active');
        }
    };
        // Відправлення запиту і формування списку best sellers books 
    async function showBestSellersBooks(){
        
        loader2.classList.remove('loader-non-active');

        const data = await fetchBestSellersBooks();

        if (data.length) {
            
            const pageWidth = document.documentElement.scrollWidth;

            if (pageWidth < 768) {
                booksBox.innerHTML = createBestSellersBooksMarcup(data, 1);
            } else if (pageWidth < 1440 && pageWidth >= 768) {
                booksBox.innerHTML = createBestSellersBooksMarcup(data, 3);
            } else {
                booksBox.innerHTML = createBestSellersBooksMarcup(data, 5);
            }
            
        } else {
            loader2.classList.add('loader-non-active');
        }

    }
        // Відправлення запиту і формування списку книг однієї категорії 
    async function showBooksOfCategory({target}){
        if ((!target.classList.contains('category-list-item')) && (!target.classList.contains('js-btn-more'))){
            return;
        } else {
            let category = target.id.split(" ").join("%20");
            if (category === 'category-list-title') {
                booksBox.innerHTML = '';
                showBestSellersBooks();
            } else {
                booksBox.innerHTML ='';
                const pageWidth = document.documentElement.scrollWidth;

                 const data  = await fetchBooksOfCategory(category);
                if (data.length) {

                    if (pageWidth < 768) {
                        booksBox.innerHTML = createBooksOfCategoryMarcup(data, 1);
                    } else if (pageWidth < 1440 && pageWidth >= 768) {
                        booksBox.innerHTML = createBooksOfCategoryMarcup(data, 3);
                    } else {
                        booksBox.innerHTML = createBooksOfCategoryMarcup(data, 5);
                    }
                } else {
                    Notify.failure("Sorry, there was a server error, please reload the page");
                    return;
                }
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