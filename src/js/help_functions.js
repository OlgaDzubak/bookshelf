import loaderHTML from './loader';

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

//Функція створює та повертає loader, який додає в документ після елементу elementAfter
function createLoader(elementAfter){
        const loader = document.createElement("div");
        loader.classList.add("loader-box");
        loader.innerHTML = loaderHTML;
        elementAfter.after(loader);
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


export {shortTitle, lastBlueWord, createLoader, changeActiveItem,  createBooksBoxTitle};