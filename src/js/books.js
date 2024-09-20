import { bookshelf_API } from './API';
import { shortTitle, 
         createLoader, 
         createBooksBoxTitle, 
         changeActiveItem, 
         scrollToBoxTop, 
         scrollUp,
         scrollTracker } from './help_functions';

import emptyImgMobile_1x  from '/src/images/png/empty-img-mobile@1x.jpg';
import emptyImgMobile_2x  from '/src/images/png/empty-img-mobile@2x.jpg';
import emptyImgMobile_3x  from '/src/images/png/empty-img-mobile@3x.jpg';
import emptyImgMobile_1x  from '/src/images/png/empty-img-tablet@1x.jpg';
import emptyImgMobile_2x  from '/src/images/png/empty-img-tablet@2x.jpg';
import emptyImgMobile_3x  from '/src/images/png/empty-img-tablet@3x.jpg';
import emptyImgDesktop_1x  from '/src/images/png/empty-img-desktop@1x.jpg';
import emptyImgDesktop_2x  from '/src/images/png/empty-img-desktop@2x.jpg';
import emptyImgDesktop_3x  from '/src/images/png/empty-img-desktop@3x.jpg';

const api = new bookshelf_API();

const categoryListBox = document.querySelector(".category-list-box");
categoryListBox.addEventListener('click', showBooksOfCategory);
const booksBox = document.querySelector(".books-box");
const scrollUpBtn = document.querySelector('.btn-up-scroll');

let categoryList, itemAllCategories, abortCtrl1, per_page;
let firstLoading = true;

const pageWidth = document.documentElement.scrollWidth; 

if (pageWidth < 768) {
    per_page = 1;
} else if (pageWidth < 1440 && pageWidth >= 768) {
    per_page = 3;
} else {
    per_page = 5;
}

scrollUpBtn.addEventListener('click', ()=>{
    scrollUp(); 
    scrollUpBtn.classList.add('is-hidden-btn');
});

window.addEventListener('scroll', ()=>{scrollTracker(scrollUpBtn)});

showCategoryList();  

// ФУНКЦІЇ виводу даних на сайт ----------------------------------------------------------------------------------

        // Відправлення запиту і формування списку під час завантаження сторінки 
    async function showCategoryList() {
        
        scrollUp();
        
        //створюємо заголовок All categories і відразу натискаємо на нього, щоб визвати завантаження Best Sellers Books
        itemAllCategories = document.createElement("h3");
        itemAllCategories.textContent = "All categories"
        itemAllCategories.classList.add("category-list-item", "active");
        itemAllCategories.setAttribute("id","all-categories-item");
        categoryListBox.prepend(itemAllCategories);
        itemAllCategories.click();

        //створюємо loader
        const loader1 = createLoader(itemAllCategories);
        
        //завантажуємо з сервера список категорій книжок
        const data = await fetchCategoryList();

        //якщо отримали непусті дані, то малюємо розмітку
        if (data.length) {

            categoryList = document.createElement("ul");
            itemAllCategories.after(categoryList);
            
            categoryList.classList.add("category-list");
            categoryList.innerHTML = createCategoryListMarkup(data);
            categoryListBox.classList.add("category-list-box-not-empty");
        }

        //видаляємо loader після виконання запиту
        loader1.remove(); 
        
    };

        // Обробка події натискання категорії в меню категорій книжок (відправлення запиту і формування списку книг категорії)
    async function showBooksOfCategory({target}){
        
        //відміна попереднього запиту best-books або category-books
        if (abortCtrl1) {
            abortCtrl1.abort();
            console.log("abort previous books fetch");
        }

        if ((!target.classList.contains('category-list-item')) && (!target.classList.contains('js-btn-more'))){
            return;
        } 
        
        // переносимо клас .active на обрану категорію
        changeActiveItem(itemAllCategories, categoryList, target);

        //формуємо категорію в потрібному форматі для запиту на сервер
        const category = target.id.split(" ").join("%20");
        
        //якщо оано пункт All categories, то формуємо список Best Sellers Books, якщо обрано іншу категорію, то формуємо список книжок для цієї категорії
         if (category === 'all-categories-item') {

            booksBox.innerHTML="";
            const booksBoxTitle = createBooksBoxTitle(booksBox, "Best Sellers Books");

            if (!firstLoading) { 
                scrollToBoxTop(booksBox);
            }

            const loader2 = createLoader(booksBoxTitle);

            abortCtrl1 = new AbortController();
            const data = await fetchBestSellersBooks(abortCtrl1);
    
            loader2.remove();
    
            if (data.length) {
    
                const bestBooksList = document.createElement("ul");
                bestBooksList.classList.add("list","best-books-list");
                booksBoxTitle.after(bestBooksList);
                bestBooksList.addEventListener('click', seeMore);

                bestBooksList.innerHTML = createBestSellersBooksMarcup(data, per_page);

                if (!firstLoading) {
                    scrollToBoxTop(booksBox);
                }else {
                    firstLoading = false;
                }
            }
        } 
        else {
                        
            booksBox.innerHTML="";
            
            const booksBoxTitle = createBooksBoxTitle(booksBox, target.id);

            scrollToBoxTop(booksBox);

            const loader2 = createLoader(booksBoxTitle);
            
            abortCtrl1 = new AbortController();
            const data  = await fetchBooksOfCategory(category, abortCtrl1);
            
            loader2.remove();

            if (data.length) {

                const categoryBooksList = document.createElement("ul");
                booksBoxTitle.after(categoryBooksList);
                categoryBooksList.classList.add("list", "category-books-list");

                const pageWidth = document.documentElement.scrollWidth;

                if (pageWidth < 768) {
                    categoryBooksList.innerHTML = createBooksOfCategoryMarcup(data, 1);
                } else if (pageWidth < 1440 && pageWidth >= 768) {
                    categoryBooksList.innerHTML = createBooksOfCategoryMarcup(data, 3);
                } else {
                    categoryBooksList.innerHTML = createBooksOfCategoryMarcup(data, 5);
                }
                scrollToBoxTop(booksBox);

            }
        }
    }

        //Обробка події натискання кнопки seeMore
    async function seeMore(event) {
    
        event.preventDefault();
            
        const { target } = event;
                
        if(!target.classList.contains('js-btn-more')) { return; }

        showBooksOfCategory(event);
    }
    


// ФУНКЦІЇ завантаження даних з бекенду -------------------------------------------------------------------------
        
        // Функція запиту на отримання назв категорій від бекенду
    async function fetchCategoryList() {
        try {
            const {data} = await api.getBookCategories();
            if (!data.length) { 
                return Notify.failure("Can't find list of categories on the server. Please reload the page!"); 
            }
            return data;
        }
        catch (error) {
            if (error.code !== 'ERR_CANCELED'){
                
                console.error(error);

                const errorBox = document.createElement("div");
                itemAllCategories.after(errorBox);
                errorBox.classList.add("error-box");
                errorBox.innerHTML = `<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>`;
            }
           return [];
        } 
    }
        // Функція запиту на отримання списку найкращіх книжок від бекенду
    async function fetchBestSellersBooks(abortCtrl1) {

        try {
            const { data } = await api.getTopBooks(per_page, abortCtrl1);
            if (!data.length) { return Notify.failure("Can't find best sellers books on the server. Please reload the page!"); }
            return data;
        }
        catch (error){
            if (error.code !== 'ERR_CANCELED'){

                console.error(error);

                const errorBox = document.createElement("div");
                booksBox.append(errorBox);
                errorBox.classList.add("error-box");
                errorBox.innerHTML = `<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>`;

            }
            return [];
        }
    }
        // Функція запиту на отримання списку книг однієї категорії від бекенду
    async function fetchBooksOfCategory(category, abortCtrl1) {
        try {

            const { data } = await api.getBooksOfCategory(per_page, category, abortCtrl1);
            if (!data.length) { return Notify.failure("Can't find books of category <" + category + "> on the server. Please reload the page!"); }
            return data;
        }
        catch (error) {
            if (error.code !== 'ERR_CANCELED'){

                console.error(error);

                const errorBox = document.createElement("div");
                booksBox.append(errorBox);
                errorBox.classList.add("error-box");
                errorBox.innerHTML = `<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>`;

            }
            return [];
        } 
    }



// ФУНКЦІЇ формування розмітки -----------------------------------------------------------------------------------

        // розмітка списку категорій
    function createCategoryListMarkup(data) {

        let categoryListHTML = "";

        data.forEach(category => {
            const categoryLink = `  <li id="${category}" class="category-list-item"> 
                                       ${category}
                                    </li> `;
            categoryListHTML += categoryLink;
        });

        return categoryListHTML;
    };

        // розмітка best sellers books
    function createBestSellersBooksMarcup(data, querty) {
 //ПОПРАВИТИ КОД ПІД ЗАГЛУШКУ КАРТИНКИ
                // <picture>
                // <source
                // srcset="${emptyImgMobile_1x } 1x, ${ emptyImgMobile_2x } 2x, ${ emptyImgMobile_3x } 3x "
                // media="(max-width: 767.9px)"
                // >
                // <source
                // srcset="${emptyImgTablet_1x } 1x, ${ emptyImgTablet_2x } 2x, ${ emptyImgTablet_3x } 3x "
                // media="(min-width: 768px) and (max-width: 1439.8px)"
                // >
                // <source
                // srcset="${emptyImgDesktop_1x } 1x, ${ emptyImgDesktop_2x } 2x, ${ emptyImgDesktop_3x } 3x "
                // media="(min-width: 1440px)"
                // >
                // <img 
                // src=${ emptyImgDesktop_3x }
                // alt= ${title}
                // class="img-book 
                // loading="auto"
                // >
                // </picture>
        const markup = data.map(({category, books}) => {
            const categoryName = `<p class="theme-book">${category}</p>`;

            if (books.length) {
                let booksOfCategory = books.splice(0, querty).map(({_id, book_image, title, author}) => 
                `<li class="item-book" data-id="${_id}">
                    <div class="img-owerlay">
                        <img src="${book_image}" alt="${title}" class="img-book" loading="auto">
                        <div class="owerlay">
                            <p class="owerlay-content">quick view</p>
                        </div>
                    </div>
                    <p class="title-book">${shortTitle(title, 17)}</p>
                    <p class="title-author">${shortTitle(author, 34)}</p>
                </li>`).join('');

                return `<li class="best-book-container">${categoryName}
                            <ul class="list-books">${booksOfCategory}</ul>
                            <button type="button" class="button-more js-btn-more" id="${category}">See more</button>
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
                
                    <img src="${book_image}" alt="${title}" class="img-book loading="auto"">
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
