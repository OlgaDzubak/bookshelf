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

export {shortTitle, lastBlueWord};