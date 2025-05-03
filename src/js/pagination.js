
// Функція яка створює та повертає елемент пагінації 
function createPagination(dataLenght, itemsOnPage, visiblePagesCount, className){
    const pagesCount = Math.ceil(dataLenght / itemsOnPage);
    const paginationList = document.createElement("div");
    paginationList.classList.add(className);
    paginationList.innerHTML = createPaginationMarkup(pagesCount, visiblePagesCount);
    return paginationList;
}

// Функція яка повертає розмітку пагінації
function createPaginationMarkup(pagesCount, visibleBtnCount){

let paginationMarkup = "";

paginationMarkup = `<button type="button" class="pgn-btn left-double-arrow-btn" aria-label="go back skiping the previous page">
                        <svg class="left-double-arrow-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 13 13">
                            <path class="left-double-arrow-svg path" fill="var(--pgn-fill-color)" d="M9.71589,11.6509c-.08592-.0852-.15412-.1866-.20065-.2983s-.0705-.2316-.0705-.3526.02396-.2408.0705-.3525.11473-.2131.20065-.2983L13.9234,6.15086c.0859-.08522.1541-.1866.2006-.29831s.0705-.23152.0705-.35253-.0239-.24082-.0705-.35253-.1147-.21309-.2006-.2983c-.1718-.17073-.4041-.26656-.6463-.26656s-.4745.09583-.6462.26656L8.42339,9.05669C7.9084,9.57232,7.61914,10.2713,7.61914,11s.28926,1.4277.80425,1.9434l4.20751,4.2075c.1707.1693.4012.2648.6417.2658.1206.0007.2402-.0224.3519-.068s.2132-.1129.2989-.1978c.0859-.0852.1541-.1866.2006-.2983s.0705-.2315.0705-.3526-.0239-.2408-.0705-.3525-.1147-.2131-.2006-.2983L9.71589,11.6509Z" transform="translate(-7.40682-4.499673)"/>
                            <path class="left-double-arrow-svg path" fill="var(--pgn-fill-color)" d="M9.71589,11.6509c-.08592-.0852-.15412-.1866-.20065-.2983s-.0705-.2316-.0705-.3526.02396-.2408.0705-.3525.11473-.2131.20065-.2983L13.9234,6.15086c.0859-.08522.1541-.1866.2006-.29831s.0705-.23152.0705-.35253-.0239-.24082-.0705-.35253-.1147-.21309-.2006-.2983c-.1718-.17073-.4041-.26656-.6463-.26656s-.4745.09583-.6462.26656L8.42339,9.05669C7.9084,9.57232,7.61914,10.2713,7.61914,11s.28926,1.4277.80425,1.9434l4.20751,4.2075c.1707.1693.4012.2648.6417.2658.1206.0007.2402-.0224.3519-.068s.2132-.1129.2989-.1978c.0859-.0852.1541-.1866.2006-.2983s.0705-.2315.0705-.3526-.0239-.2408-.0705-.3525-.1147-.2131-.2006-.2983L9.71589,11.6509Z" transform="translate(-1.40682-4.499673)"/>
                        </svg>
                    </button>` +

                    `<button type="button" class="pgn-btn left-arrow-btn" aria-label="go to the previous page">
                        <svg class="left-arrow-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 7.5 13">
                            <path class="left-arrow-svg path" fill="var(--pgn-fill-color)"<path d="M9.71589,11.6509c-.08592-.0852-.15412-.1866-.20065-.2983s-.0705-.2316-.0705-.3526.02396-.2408.0705-.3525.11473-.2131.20065-.2983L13.9234,6.15086c.0859-.08522.1541-.1866.2006-.29831s.0705-.23152.0705-.35253-.0239-.24082-.0705-.35253-.1147-.21309-.2006-.2983c-.1718-.17073-.4041-.26656-.6463-.26656s-.4745.09583-.6462.26656L8.42339,9.05669C7.9084,9.57232,7.61914,10.2713,7.61914,11s.28926,1.4277.80425,1.9434l4.20751,4.2075c.1707.1693.4012.2648.6417.2658.1206.0007.2402-.0224.3519-.068s.2132-.1129.2989-.1978c.0859-.0852.1541-.1866.2006-.2983s.0705-.2315.0705-.3526-.0239-.2408-.0705-.3525-.1147-.2131-.2006-.2983L9.71589,11.6509Z" transform="translate(-7.40682-4.499673)""/>
                        </svg>
                    </button>` +
    
                    // `<button type="button" class="pgn-btn three-dots-btn left-three-dots-btn visually-hidden aria-label="show previous pagination buttons">
                    //     <svg class="three-dots-svg left-three-dots-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22">
                    //         <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(4 16.516716)"/>
                    //         <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(18 16.516716)"/>
                    //         <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(11 16.516716)"/>
                    //     </svg>
    // </button>`;
                        `<button type="button" class="pgn-btn three-dots-btn left-three-dots-btn hidden aria-label="show previous pagination buttons">
                        <svg class="three-dots-svg left-three-dots-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22">
                            <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(4 16.516716)"/>
                            <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(18 16.516716)"/>
                            <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(11 16.516716)"/>
                        </svg>
                    </button>`;

for (let i = 1; i <= pagesCount; i++ ){
    if (i <= visibleBtnCount){
        paginationMarkup = paginationMarkup + `<button type="button" class="pgn-btn number-btn" aria-label="go to the page">${i}</button>`;
    }else{
        // paginationMarkup = paginationMarkup + `<button type="button" class="pgn-btn number-btn visually-hidden">${i}</button>`;
        paginationMarkup = paginationMarkup + `<button type="button" class="pgn-btn number-btn hidden">${i}</button>`;
    }
}

if (pagesCount > visibleBtnCount)  {

            paginationMarkup = paginationMarkup +
                        `<button type="button" class="pgn-btn three-dots-btn right-three-dots-btn">
                        <svg class="three-dots-svg right-three-dots-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22">
                            <ellipse class="right-three-dots-svg ellipse" rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(4 16.516716)"/>
                            <ellipse class="right-three-dots-svg ellipse" rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(18 16.516716)"/>
                            <ellipse class="right-three-dots-svg ellipse" rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(11 16.516716)"/>
                        </svg>
                        </button>`;
}else{
            paginationMarkup = paginationMarkup +
            // `<button type="button" class="right-three-dots-btn visually-hidden" aria-label="show next pagination buttons">
            // <svg class="three-dots-svg right-three-dots-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22">
            //     <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(4 16.516716)"/>
            //     <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(18 16.516716)"/>
            //     <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(11 16.516716)"/>
            // </svg>
    // </button>`;
                
            `<button type="button" class="right-three-dots-btn hidden" aria-label="show next pagination buttons">
            <svg class="three-dots-svg right-three-dots-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22">
                <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(4 16.516716)"/>
                <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(18 16.516716)"/>
                <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(11 16.516716)"/>
            </svg>
            </button>`;
}

paginationMarkup = paginationMarkup +                   
                    `<button type="button" class="pgn-btn right-arrow-btn" aria-label="go to the next page">
                        <svg class="right-arrow-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 7.5 13">
                        <path class="right-arrow-svg path" fill="var(--pgn-fill-color)" d="M9.71589,11.6509c-.08592-.0852-.15412-.1866-.20065-.2983s-.0705-.2316-.0705-.3526.02396-.2408.0705-.3525.11473-.2131.20065-.2983L13.9234,6.15086c.0859-.08522.1541-.1866.2006-.29831s.0705-.23152.0705-.35253-.0239-.24082-.0705-.35253-.1147-.21309-.2006-.2983c-.1718-.17073-.4041-.26656-.6463-.26656s-.4745.09583-.6462.26656L8.42339,9.05669C7.9084,9.57232,7.61914,10.2713,7.61914,11s.28926,1.4277.80425,1.9434l4.20751,4.2075c.1707.1693.4012.2648.6417.2658.1206.0007.2402-.0224.3519-.068s.2132-.1129.2989-.1978c.0859-.0852.1541-.1866.2006-.2983s.0705-.2315.0705-.3526-.0239-.2408-.0705-.3525-.1147-.2131-.2006-.2983L9.71589,11.6509Z" transform="matrix(-1 0 0-1 15.40682 17.499673)"/>
                        </svg>
                    </button>` +

                    `<button type="button" class="pgn-btn right-double-arrow-btn" aria-label="go forward skiping the next page">
                        <svg class="right-double-arrow-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 13 13">
                        <path class="right-double-arrow-svg path" fill="var(--pgn-fill-color)" d="M9.71589,11.6509c-.08592-.0852-.15412-.1866-.20065-.2983s-.0705-.2316-.0705-.3526.02396-.2408.0705-.3525.11473-.2131.20065-.2983L13.9234,6.15086c.0859-.08522.1541-.1866.2006-.29831s.0705-.23152.0705-.35253-.0239-.24082-.0705-.35253-.1147-.21309-.2006-.2983c-.1718-.17073-.4041-.26656-.6463-.26656s-.4745.09583-.6462.26656L8.42339,9.05669C7.9084,9.57232,7.61914,10.2713,7.61914,11s.28926,1.4277.80425,1.9434l4.20751,4.2075c.1707.1693.4012.2648.6417.2658.1206.0007.2402-.0224.3519-.068s.2132-.1129.2989-.1978c.0859-.0852.1541-.1866.2006-.2983s.0705-.2315.0705-.3526-.0239-.2408-.0705-.3525-.1147-.2131-.2006-.2983L9.71589,11.6509Z" transform="matrix(-1 0 0-1 14.40682 17.499673)"/>
                        <path class="right-double-arrow-svg path" fill="var(--pgn-fill-color)" d="M9.71589,11.6509c-.08592-.0852-.15412-.1866-.20065-.2983s-.0705-.2316-.0705-.3526.02396-.2408.0705-.3525.11473-.2131.20065-.2983L13.9234,6.15086c.0859-.08522.1541-.1866.2006-.29831s.0705-.23152.0705-.35253-.0239-.24082-.0705-.35253-.1147-.21309-.2006-.2983c-.1718-.17073-.4041-.26656-.6463-.26656s-.4745.09583-.6462.26656L8.42339,9.05669C7.9084,9.57232,7.61914,10.2713,7.61914,11s.28926,1.4277.80425,1.9434l4.20751,4.2075c.1707.1693.4012.2648.6417.2658.1206.0007.2402-.0224.3519-.068s.2132-.1129.2989-.1978c.0859-.0852.1541-.1866.2006-.2983s.0705-.2315.0705-.3526-.0239-.2408-.0705-.3525-.1147-.2131-.2006-.2983L9.71589,11.6509Z" transform="matrix(-1 0 0-1 20.40682 17.499673)"/>
                        </svg>
                    </button> `;

return paginationMarkup;
};

// Додає клас активної сторінки та управляю активацією та дезактивацією кнопок зі стрілками та трикрапками
function setPaginationPage(paginationList, page) {
    if (paginationList && page>0){
    
        const allPagesBtns = paginationList.querySelectorAll(".number-btn");
        let visiblePagesBtns = [...allPagesBtns].filter(btn => !btn.classList.contains("visually-hidden"));
        const visibleBtnCount = visiblePagesBtns.length;
        
        const leftDoubleArrowBtn = paginationList.querySelector('.left-double-arrow-btn');
        const leftArrowBtn = paginationList.querySelector('.left-arrow-btn');
        const rightDoubleArrowBtn = paginationList.querySelector('.right-double-arrow-btn');
        const rightArrowBtn = paginationList.querySelector('.right-arrow-btn');
        const leftThreeDots = paginationList.querySelector('.left-three-dots-btn');
        const rightThreeDots = paginationList.querySelector('.right-three-dots-btn');
    
        //Обробка кнопок з цифрами сторінок
        for (const button of allPagesBtns) {
           
            if (Number(button.textContent) === page){

                button.classList.add('active');

                //if (button.classList.contains('visually-hidden')){
                if (button.classList.contains('hidden')){
                    if (button.textContent <= visiblePagesBtns[0].textContent){ 
                        //visiblePagesBtns[visibleBtnCount-1].setAttribute("disabled","");
                        //visiblePagesBtns[visibleBtnCount-1].classList.add('visually-hidden');
                        //rightThreeDots.removeAttribute("disabled","");
                        //rightThreeDots.classList.remove('visually-hidden');
                        visiblePagesBtns[visibleBtnCount - 1].classList.add('hidden');
                        rightThreeDots.classList.remove('hidden');
                    } else {
                        // visiblePagesBtns[0].setAttribute("disabled","");
                        // visiblePagesBtns[0].classList.add('visually-hidden');
                        // leftThreeDots.removeAttribute("disabled","");
                        // leftThreeDots.classList.remove('visually-hidden');
                        visiblePagesBtns[0].classList.add('hidden');
                        leftThreeDots.classList.remove('hidden');

                        if (Number(button.textContent) === allPagesBtns.length){
                            // rightThreeDots.setAttribute("disabled","");
                            // rightThreeDots.classList.add('visually-hidden');
                            rightThreeDots.classList.add('hidden');
                        }
                    }
                    // button.removeAttribute("disabled","");
                    // button.classList.remove('visually-hidden');
                    button.classList.remove('hidden');
                }

            }else {
                button.classList.remove('active');
            }
        }
        //visiblePagesBtns = [...allPagesBtns].filter(btn => !btn.classList.contains("visually-hidden"));
        visiblePagesBtns = [...allPagesBtns].filter(btn => !btn.classList.contains("hidden"));
        

        //Обробка кнопок зі стрілкамми та трикрапками
        if (page === 1){
            leftArrowBtn.setAttribute('disabled',"");
        } else {
            leftArrowBtn.removeAttribute('disabled',"");
        }

        if (page === allPagesBtns.length) { 
            rightArrowBtn.setAttribute('disabled',"");
        } else{
            rightArrowBtn.removeAttribute('disabled',"");
        }
    
        if (Number(visiblePagesBtns[visibleBtnCount-1].textContent)  === allPagesBtns.length) {
            rightDoubleArrowBtn.setAttribute('disabled',"");
            rightThreeDots.setAttribute('disabled', "");
            //rightThreeDots.classList.add('visually-hidden');
            rightThreeDots.classList.add('hidden');
        }else{
            rightDoubleArrowBtn.removeAttribute('disabled',"");
            rightThreeDots.removeAttribute('disabled',"");
            //rightThreeDots.classList.remove('visually-hidden');
            rightThreeDots.classList.remove('hidden');
        }
        
        if (Number(visiblePagesBtns[visibleBtnCount-1].textContent) - visibleBtnCount  < 1) {
            leftDoubleArrowBtn.setAttribute('disabled',"");
            leftThreeDots.setAttribute('disabled',"");
            //leftThreeDots.classList.add('visually-hidden');
            leftThreeDots.classList.add('hidden');
        }else{
            leftDoubleArrowBtn.removeAttribute('disabled',"");
            leftThreeDots.removeAttribute('disabled',"");
            //leftThreeDots.classList.remove('visually-hidden');
            leftThreeDots.classList.remove('hidden');
        }
    }
    return page;
};

// Зміщення вліво на shift сторінок
function shiftPageLeft(paginationList, shift){

    const pages = paginationList.querySelectorAll(".number-btn");
    //const visiblePages = [...pages].filter(item => !item.classList.contains('visually-hidden'));
    const visiblePages = [...pages].filter(item => !item.classList.contains('hidden'));
    const firstVisiblePageNumber = Number(visiblePages[0].textContent);
    const activePage_idx = visiblePages.findIndex(item => item.classList.contains('active'));
    const activePageNumber = Number(visiblePages[activePage_idx].textContent);

    let returnPage = activePageNumber;

    if (shift) {
        if (firstVisiblePageNumber - shift >= 1) {
            for (let i=firstVisiblePageNumber-1; i>=firstVisiblePageNumber-shift; i--){
                returnPage = setPaginationPage(paginationList, i);
            }
            returnPage  = setPaginationPage(paginationList, firstVisiblePageNumber-1);;
        }else {
            for (let i=firstVisiblePageNumber-1; i>=1; i--){
                returnPage = setPaginationPage(paginationList, i);
            }
        }
    }
    return returnPage;
}

// Зміщення вправо на shift сторінок
function shiftPageRight(paginationList, shift){

    const pages = paginationList.querySelectorAll(".number-btn");
    //const visiblePages = [...pages].filter(item => !item.classList.contains('visually-hidden'));
    const visiblePages = [...pages].filter(item => !item.classList.contains('hidden'));
    const activePage_idx = visiblePages.findIndex(item => item.classList.contains('active'));
    const activePageNumber = Number(visiblePages[activePage_idx].textContent);
    const visLen = visiblePages.length;

    const lastVisiblePageNumber = Number(visiblePages[visLen-1].textContent);
    const lastPageNumber = Number(pages[pages.length-1].textContent);

    let returnPage = activePageNumber;

    if (shift) {
        if (lastPageNumber - lastVisiblePageNumber >= shift) {
            for (let i=lastVisiblePageNumber; i<=lastVisiblePageNumber + shift; i++){
                returnPage = setPaginationPage(paginationList, i);
            }
            returnPage = setPaginationPage(paginationList, lastVisiblePageNumber+1);
        }else {
            for (let i = lastVisiblePageNumber; i <= lastPageNumber; i++){
                returnPage = setPaginationPage(paginationList, i);
            }
        }
    }
    return returnPage;
}

// Зміщення вліво на групу сторінок сторінок, що візуально відкриті в пагінації
function nextPageGroupLeft(paginationList){

    const pages = document.querySelectorAll(".number-btn");
    // const visiblePages = [...pages].filter(item => !item.classList.contains('visually-hidden'));
    const visiblePages = [...pages].filter(item => !item.classList.contains('hidden'));
    const activePage_idx = visiblePages.findIndex(item => item.classList.contains('active'));
    const visLen = visiblePages.length;

    const pageFirst = visiblePages[0].textContent - visLen > 1 ? visiblePages[0].textContent - visLen : 1;
    const pageLast = pageFirst + (visLen - 1);

    pages.forEach(page =>{
        if (page.textContent >= pageFirst && page.textContent <= pageLast){
            //page.classList.remove('visually-hidden');
            page.classList.remove('hidden');
           // if (page.disabled) {page.removeAttribute('disabled','');}
        } else {
            // page.classList.add('visually-hidden');
            page.classList.add('hidden');
            // if (page.classList.contains('active')) {page.classList.remove('active');}
        }
            
    });

    return setPaginationPage(paginationList, pageFirst  + activePage_idx);
}

// Зміщення вправо на групу сторінок сторінок, що візуально відкриті в пагінації
function nextPageGroupRight(paginationList){

    const pages = document.querySelectorAll(".number-btn");
    // const visiblePages = [...pages].filter(item => !item.classList.contains('visually-hidden'));
    const visiblePages = [...pages].filter(item => !item.classList.contains('hidden'));
    const activePage_idx = visiblePages.findIndex(item => item.classList.contains('active'));
    const visLen = visiblePages.length;

    const pageFirst = Number(visiblePages[visLen-1].textContent) + visLen < pages.length ? Number(visiblePages[visLen-1].textContent) + 1 : pages.length - (visLen - 1);
    const pageLast = pageFirst + (visLen - 1);

    pages.forEach(page =>{
        if (page.textContent>=pageFirst && page.textContent<=pageLast){
            // page.classList.remove('visually-hidden');
            page.classList.remove('hidden');
            // if (page.disabled) {page.removeAttribute('disabled','');}
        } else {
            // page.classList.add('visually-hidden');
            page.classList.add('hidden');
            // if (page.classList.contains('active')) {page.classList.remove('active');}
        }
    });

    return setPaginationPage(paginationList, pageFirst  + activePage_idx);

}

//Видалення останньої сторінки з пагінації
function deleteLastPaginationPage(paginationList){

    const pages = paginationList.querySelectorAll(".number-btn");
    const activePageNumber = Number(paginationList.querySelector(".number-btn.active").textContent);
    const pLen = pages.length;

    let firstVisibleBtn_idx = 0;

    if (pages.length > 0){
        let lastPage = pages[pLen-1];
        const lastPageNumber= Number(lastPage.textContent);

        // if (!lastPage.classList.contains('visually-hidden')){
        //     firstVisibleBtn_idx = [...pages].findIndex(item=>!item.classList.contains('visually-hidden'));
        // }    
        if (!lastPage.classList.contains('hidden')){
            firstVisibleBtn_idx = [...pages].findIndex(item=>!item.classList.contains('hidden'));
        }  
        
        lastPage.remove();

        if (firstVisibleBtn_idx >= 1){ 
            // pages[firstVisibleBtn_idx - 1].classList.remove('visually-hidden'); 
            pages[firstVisibleBtn_idx-1].classList.remove('hidden'); 
        }
        
        if (pLen > 1 && activePageNumber === lastPageNumber) {
                return setPaginationPage(paginationList, Number(pages[pLen-2].textContent)); 
        }else{
            return setPaginationPage(paginationList, activePageNumber); 
        }
    }
    return 0;
}


export {createPagination,
        createPaginationMarkup,
        setPaginationPage,
        shiftPageLeft,
        shiftPageRight,
        nextPageGroupLeft,
        nextPageGroupRight,
        deleteLastPaginationPage
       }