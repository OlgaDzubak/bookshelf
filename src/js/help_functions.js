import loaderHTML from './loader';

// Функція відображає в купівельному кошику кількість замовлень
function displayOrdredAmountInShoppingBag(arr) {
  const ordredAmountBox = document.querySelector('.ordered-amount-box');
  if (!arr.length) {
      return ordredAmountBox.style.display = "none";
  } else {
      ordredAmountBox.style.display = "block"
      ordredAmountBox.firstElementChild.textContent = arr.length;
      return;
  }
}

// Функція що скорочує рядок string до довжини value та додає три крапки в кінці
function shortTitle(string, value) {
  if(string.length > Number(value)){
      switch (subStrCount(string, " ")){
        case 0: return string.slice(0, Number(value-2)) + '...';
        case 1:  return string.slice(0, Number(value-1)) + '...';
        default: return string.slice(0, Number(value-2)) + '...';
      }
  }else{
      return string;
  }
}

// Функція, яка підраховує кількість входжень рядка subStr в str
function subStrCount(str, subStr){

  const step = subStr.length;
  let count = 0;
  let helpStr = str;
  let pos = str.indexOf(subStr);
  
  while (pos >= 0){
    count = count + 1;
    helpStr = helpStr.slice(pos+step);
    pos = helpStr.indexOf(subStr);
  }
  return count;  
}
  
// Функція що робить синім кольором останнє слово в рядку string
function lastBlueWord(string) {
    const arrWord = string.split(" ");
    const firstWord = arrWord.splice(0, arrWord.length - 1);
    return `${firstWord.join(' ')} <span class="last-word-color">${arrWord.join('')}</span>`
}

//Функція створює та повертає loader, який додає в документ після/в/попереду елементу el. Параметр where визначає куди саме додається loader
function createLoader(el, where){

        const loader = document.createElement("div");
        loader.classList.add("loader-box");
        loader.innerHTML = loaderHTML;

        switch (where) {
          case "after":
            el.after(loader);
            break;
          case "into" :
            el.prepend(loader);
            break;
          case "befor":
            el.before(loader);
            break;
        }
        return loader;
}

//Функція перезаписує клас .active в меню list, включаючи елемент headerElement
function changeActiveItem(headerElement, list, checkedElement){

  if ((headerElement.innerText === checkedElement.innerText) && (!headerElement.classList.contains("active"))){ 
    headerElement.classList.add("active");
  } else if ((headerElement.innerText != checkedElement.innerText) && (headerElement.classList.contains("active"))) {
    headerElement.classList.remove("active");
  }

  if (list){
    Array.from(list.children).forEach((item) => { 
      if ((item.innerText != checkedElement.innerText) && item.classList.contains("active")) {
          item.classList.remove("active");
      } else if (item.innerText === checkedElement.innerText) {
          item.classList.add("active");
      }
    });
  }
}

//Функція створює заголовок h2 в контейнері box з текстом titleStr і робить останє столово блакитним
function createBooksBoxTitle(box, titleStr){
  const title = document.createElement("h2");
  title.classList.add("title-theme-book");
  title.innerHTML = `${lastBlueWord(titleStr)}`;
  box.prepend(title);
  return title;
}


// Функція скролу до заголовку списку книжок
function scrollToBoxTop(box){

  const titleTopY = box.offsetTop;
  const docHeight = document.documentElement.offsetHeight;
  const windowHeight = document.documentElement.clientHeight;
  const docWidth =  document.documentElement.offsetWidth;
  const docCurrentScrollY = window.scrollY;
  
  switch (docWidth >= 1440) {
      case true :
          if (docCurrentScrollY > 0) { 
              window.scroll({top: titleTopY - 112 , left: 0, behavior: "smooth",});
          }
          break;
      case false :
          if ((docHeight - titleTopY) < windowHeight){
              window.scroll({top: docHeight , left: 0, behavior: "smooth",});                    
          }else if (titleTopY + 180 > windowHeight) {
              window.scroll({top: titleTopY - 90 , left: 0, behavior: "smooth",});
          }
          break;
      default:
          break;
  }

}

// Функція скролу на початок сторінки
function scrollUp() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth',
  });
}


// Функція показу кнопки повернення на початок сторінки
function scrollTracker(scrollUpBtn) {
  const offset = window.scrollY || window.pageYOffSet;
  const highDocument = document.documentElement.clientHeight;
  if (offset > highDocument) {
      scrollUpBtn.classList.remove('is-hidden-btn');
  } else {
      scrollUpBtn.classList.add('is-hidden-btn');
  }
}

function getCookie(cookieName){
  if (document.cookie){
    const cookies = document.cookie.split(";");
    const ck = cookies.find((cookie)=> cookie.includes(cookieName));
    return ck.split("=")[1];
  }
}

function rewriteAccessToken(newAccessToken){
  const currentAccessToken = getCookie("accessToken");
          
  if (newAccessToken != currentAccessToken){
    let date = new Date(Date.now() + (3 * 60 * 1000));//(24 * 60 * 60 * 1000));
    date = date.toUTCString();
    document.cookie = `accessToken=${newAccessToken}; expires=${date}; secure`;
  }
}

const capitalizeStr = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

//-------------------------------------------------------------------------------------------------------------------
export {  displayOrdredAmountInShoppingBag, 
          shortTitle, 
          lastBlueWord, 
          createLoader, 
          changeActiveItem,  
          createBooksBoxTitle, 
          scrollToBoxTop,
          scrollUp,
          scrollTracker,
          getCookie,
          rewriteAccessToken,
          headerNotAuthorised,
          headerAuthorised,
          onAuthBtnClick,
          capitalizeStr
       };