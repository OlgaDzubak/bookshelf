function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},r={},s=t.parcelRequire3984;null==s&&((s=function(e){if(e in o)return o[e].exports;if(e in r){var t=r[e];delete r[e];var s={id:e,exports:{}};return o[e]=s,t.call(s.exports,s,s.exports),s.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){r[e]=t},t.parcelRequire3984=s),s("kyEFX").register(JSON.parse('{"5ZPII":"index.5c73e550.js","kfWnF":"empty-img-mobile@1x.8fbd5955.jpg","cW9vs":"empty-img-mobile@2x.2ea00d8f.jpg","5rc3U":"empty-img-mobile@3x.424036b7.jpg","gpdIz":"empty-img-tablet@1x.90771ee2.jpg","h2Cpp":"empty-img-tablet@2x.5b6d4ccf.jpg","avBN4":"empty-img-tablet@3x.9e70b472.jpg","63WUa":"empty-img-desktop@1x.799f71fc.jpg","elcTK":"empty-img-desktop@2x.2ff1170a.jpg","4tXlI":"empty-img-desktop@3x.5d43da0f.jpg","d1j6q":"index.76783da1.js"}')),s("bUb57"),s("jeON5"),s("76jN1");var n,a=s("cTOKP"),c=s("hqv3x");n=new URL(s("kyEFX").resolve("kfWnF"),import.meta.url).toString();var l;l=new URL(s("kyEFX").resolve("cW9vs"),import.meta.url).toString();var i;i=new URL(s("kyEFX").resolve("5rc3U"),import.meta.url).toString();var d;d=new URL(s("kyEFX").resolve("gpdIz"),import.meta.url).toString();var m;m=new URL(s("kyEFX").resolve("h2Cpp"),import.meta.url).toString();var p;p=new URL(s("kyEFX").resolve("avBN4"),import.meta.url).toString();var u;u=new URL(s("kyEFX").resolve("63WUa"),import.meta.url).toString();var g;g=new URL(s("kyEFX").resolve("elcTK"),import.meta.url).toString();var h;h=new URL(s("kyEFX").resolve("4tXlI"),import.meta.url).toString();const b=new(0,a.bookshelf_API),v=document.querySelector(".category-list-box");v.addEventListener("click",$);const f=document.querySelector(".books-box"),k=document.querySelector(".btn-up-scroll"),y=document.querySelector("body");let x,w,L,S,E,_=!1,T=!1,H=!0;const R=document.documentElement.scrollWidth;async function $({target:t}){if(L&&(L.abort(),console.log("abort previous books fetch")),!t.classList.contains("category-list-item")&&!t.classList.contains("js-btn-more"))return;(0,c.changeActiveItem)(w,x,t);const o=t.id.split(" ").join("%20");f.innerHTML="";const r=(0,c.createBooksBoxTitle)(f,"");if(H||((0,c.scrollToBoxTop)(f),E=(0,c.createLoader)(r,"after",["loader-box-trans"])),"all-categories-item"===o){r.innerText="Best Sellers Books",L=new AbortController;const t=await async function(e){try{const{data:t}=await b.getTopBooks(S,e);return t.length?t:Notify.failure("Can't find best sellers books on the server. Please reload the page!")}catch(e){if("ERR_CANCELED"!==e.code){console.error(e);const t=document.createElement("div");f.append(t),t.classList.add("error-box"),t.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'}return[]}}(L);if(T=!0,t.length){const o=document.createElement("ul");o.classList.add("list","best-books-list"),r.after(o),o.addEventListener("click",C),o.innerHTML=function(t,o){const r=t.map((({category:t,books:r})=>{const s=`<p class="theme-book">${t}</p>`;if(r.length){return`<li class="best-book-container">${s}\n                            <ul class="list-books">${r.splice(0,o).map((({_id:t,book_image:o,title:r,author:s})=>`<li class="item-book" data-id="${t}">\n                    <div class="img-owerlay">\n\n                        ${o?`<img src="${o}" alt="${r}" class="img-book" loading="auto">`:`<picture>\n                                            <source\n                                                srcset="${e(n)} 1x, ${e(l)} 2x, ${e(i)} 3x "\n                                                media="(max-width: 767.9px)"\n                                                >\n                                            <source\n                                                srcset="${e(d)} 1x, ${e(m)} 2x, ${e(p)} 3x "\n                                                media="(min-width: 768px) and (max-width: 1439.8px)"\n                                                >\n                                            <source\n                                                srcset="${e(u)} 1x, ${e(g)} 2x, ${e(h)} 3x "\n                                                media="(min-width: 1440px)"\n                                                >\n                                            <img \n                                                src=${e(h)}\n                                                alt= ${r}\n                                                class="img-book \n                                                loading="auto"\n                                                >\n                                        </picture>`}\n                        \n                        <div class="owerlay">\n                            <p class="owerlay-content">quick view</p>\n                        </div>\n\n                    </div>\n                    <p class="title-book">${(0,c.shortTitle)(r,17)}</p>\n                    <p class="title-author">${(0,c.shortTitle)(s,34)}</p>\n                </li>`)).join("")}</ul>\n                            <button type="button" class="button-more js-btn-more" id="${t}">See more</button>\n                        </li>`}return`<li class="off-books best-book-container">${t}\n                            <p class="off-books-text">Sorry, there are no books in this category, please choose another category</p>\n                        </li>`})).join("");return r}(t,S),H?H=!1:(0,c.scrollToBoxTop)(f)}}else{r.innerText=t.id,L=new AbortController;const e=await async function(e,t){try{const{data:o}=await b.getBooksOfCategory(S,e,t);return o.length?o:Notify.failure("Can't find books of category <"+e+"> on the server. Please reload the page!")}catch(e){if("ERR_CANCELED"!==e.code){console.error(e);const t=document.createElement("div");f.append(t),t.classList.add("error-box"),t.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'}return[]}}(o,L);if(e.length){const t=document.createElement("ul");r.after(t),t.classList.add("list","category-books-list");const o=document.documentElement.scrollWidth;t.innerHTML=q(e,o<768?1:o<1440&&o>=768?3:5),(0,c.scrollToBoxTop)(f)}}T&&_&&E.remove()}async function C(e){e.preventDefault();const{target:t}=e;t.classList.contains("js-btn-more")&&$(e)}function q(e,t){if(e.length){return e.map((({_id:e,book_image:t,author:o,title:r})=>`<li class="item-book" data-id="${e}">  \n                <div class="img-owerlay">\n                \n                    <img src="${t}" alt="${r}" class="img-book loading="auto"">\n                    <div class="owerlay">\n                        <p class="owerlay-content">quick view</p>\n                    </div>\n                </div>\n                <p class="title-book">${(0,c.shortTitle)(r,17)}</p>\n                <p class="title-author">${(0,c.shortTitle)(o,34)}</p>\n            </li>`)).join("")}return'<liv class="off-books">\n                            <p class="off-books-text">Sorry, there are no books in this category, please choose another category</p>\n                        </li>'}S=R<768?1:R<1440&&R>=768?3:5,k.addEventListener("click",(()=>{(0,c.scrollUp)(),k.classList.add("is-hidden-btn")})),window.addEventListener("scroll",(()=>{(0,c.scrollTracker)(k)})),T||_||(E=(0,c.createLoader)(y,"into",[])),async function(){(0,c.scrollUp)(),w=document.createElement("h3"),w.textContent="All categories",w.classList.add("category-list-item","active"),w.setAttribute("id","all-categories-item"),v.prepend(w),w.click();const e=await async function(){try{const{data:e}=await b.getBookCategories();return e.length?e:Notify.failure("Can't find list of categories on the server. Please reload the page!")}catch(e){if("ERR_CANCELED"!==e.code){console.error(e);const t=document.createElement("div");w.after(t),t.classList.add("error-box"),t.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'}return[]}}();_=!0,T&&_&&E.remove();e.length&&(x=document.createElement("ul"),w.after(x),x.classList.add("category-list"),x.innerHTML=function(e){let t="";return e.forEach((e=>{t+=`  <li id="${e}" class="category-list-item"> \n                                       ${e}\n                                    </li> `})),t}(e),v.classList.add("category-list-box-not-empty"))}(),s("8e037"),s("b0rNy"),s("itneM");a=s("cTOKP"),c=s("hqv3x");const A=new(0,a.bookshelf_API);let F,j,M;const U=document.querySelector(".books-box"),N=document.querySelector(".book-modal-backdrop"),B=document.querySelector(".book-modal-container"),I=document.querySelector(".btn-modal-close"),O=document.querySelector(".add"),P=document.querySelector(".remove"),X=document.querySelector(".modal-message"),Z={scrollPosition:0,disabledScroll(){Z.scrollPosition=window.scrollY,document.body.classList.add("block-scroll"),document.body.style.cssText=`top: -${Z.scrollPosition}px;`},enabledScroll(){document.body.classList.remove("block-scroll"),document.body.style.cssText="top: 0",window.scroll({top:Z.scrollPosition})}};async function z(e){j&&(j.abort(),console.log("abort previous book fetch")),Z.disabledScroll(),document.addEventListener("keydown",(e=>{"Escape"===e.key&&W()}),{once:!0});try{j=new AbortController;const t=await A.getBookById(e,j),{author:o,book_image:r,description:s,title:n,buy_links:a}=t.data,c=document.querySelector(".book-img-div"),l=document.querySelector("#name-book"),i=document.querySelector("#author"),d=document.querySelector("#description"),m=document.querySelector(".market_placers_list");l.textContent=n,i.textContent=o,d.textContent=""===s?"No description":s,c.innerHTML=`<img src="${r}" alt="${r}" class="book-img-modal" loading="auto">`,m.innerHTML=`<li class="marketplacer_li marketplacer_li_one">\n                                    <a href="${a[0].url}" class="marketplacer_li_link link" target="_blank">\n                                        <svg id="amazon-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 15">\n                                            <path fill="var(--amazon-path1-color)" d="M38.42,21.708c-3.093,2.284-7.591,3.504-11.459,3.504-5.423,0-10.306-2.005-13.999-5.342-.29-.262-.03-.62.318-.416c3.986,2.32,8.915,3.715,14.005,3.715c3.434,0,7.211-.71,10.684-2.185.525-.223.963.343.45.724h.001Zm1.289-1.473c-.395-.507-2.613-.239-3.617-.121-.304.037-.35-.228-.077-.418c1.771-1.247,4.677-.887,5.017-.469s-.088,3.333-1.753,4.724c-.256.213-.499.1-.386-.183.373-.933,1.212-3.025.815-3.533h.001Z" transform="matrix(.9 0 0 0.9-4.692819-7.6908)"/>\n                                            <path fill="var(--amazon-path2-color)" d="M36.166,10.894c0,.181.14.304.314.304h2.829l-3.257,4.671c-.197.3-.199.636-.199.834v1.228c0,.176.197.381.386.278c1.845-.98,4.062-.884,5.732-.009.205.107.4-.1.4-.276v-1.293c-.021-.174-.075-.351-.288-.471-.947-.534-2.049-.69-3.094-.664L41.8,11.482c.259-.36.406-.588.409-.762v-1.037c0-.181-.14-.307-.314-.307h-5.425c-.003,0-.006,0-.009,0-.165,0-.299.134-.299.299c0,.003,0,.006,0,.008v1.212l.004-.001ZM16.361,18.451c.176,0,.318-.137.318-.307v-4.491c0-.98-.046-2.336,1.14-2.336c1.173,0,1.017,1.391,1.017,2.336l.002,4.491c0,.163.13.295.297.307h1.653c.176,0,.318-.137.318-.307v-4.491c0-.481-.017-1.195.153-1.623s.587-.694.987-.694c.478,0,.848.161.971.729.078.339.046,1.23.046,1.588v4.496c0,.163.137.295.297.307h1.653c.176,0,.318-.137.318-.307l.004-5.347c0-.908.107-1.943-.416-2.656-.462-.641-1.219-.926-1.91-.926-.973,0-1.88.499-2.28,1.57-.465-1.07-1.11-1.57-2.143-1.57-1.017,0-1.771.499-2.173,1.57h-.03v-1.107c-.012-.153-.14-.276-.3-.283h-1.539c-.176,0-.318.134-.318.304v8.471c.012.151.137.269.295.281h1.65l-.01-.005ZM46.878,9.227c2.449,0,3.775,2.103,3.775,4.778c0,2.584-1.465,4.634-3.775,4.634-2.4,0-3.715-2.103-3.715-4.724c0-2.637,1.326-4.693,3.715-4.693v.005Zm.014,1.723c-1.216,0-1.293,1.658-1.293,2.691s-.016,3.245,1.279,3.245c1.279,0,1.34-1.783,1.34-2.869c0-.715-.03-1.57-.245-2.247-.186-.59-.555-.82-1.079-.82h-.002Zm6.931,7.507c.177,0,.321-.137.323-.307v-4.562c0-.571.03-1.087.262-1.604.189-.408.558-.677.96-.677c1.14,0,1.033,1.356,1.033,2.283v4.601c.016.144.141.255.292.267h1.652c.162,0,.299-.117.318-.267v-5.333c0-.82,0-1.96-.427-2.637-.465-.732-1.18-.998-1.927-.998-1.14,0-1.788.553-2.25,1.711h-.03v-1.296c-.033-.132-.151-.23-.295-.237h-1.531c-.167,0-.304.121-.318.276l.002,8.474c0,.163.137.295.297.307h1.644l-.005-.001ZM31.835,14.403v-.357c-1.195,0-2.456.255-2.456,1.662c0,.713.372,1.196,1.005,1.196.462,0,.88-.286,1.142-.75.325-.577.309-1.107.309-1.75v-.001Zm1.664,4.024c-.109.098-.267.105-.389.039-.548-.455-.647-.667-.947-1.1-.906.924-1.548,1.2-2.721,1.2-1.39,0-2.47-.857-2.47-2.572c0-1.34.724-2.252,1.76-2.698.896-.395,2.147-.464,3.104-.573v-.213c0-.393.03-.857-.203-1.196-.199-.304-.585-.429-.926-.429-.629,0-1.189.323-1.326.992-.028.149-.137.295-.288.302l-1.6-.172c-.134-.03-.285-.139-.245-.347.367-1.941,2.123-2.526,3.691-2.526.803,0,1.853.213,2.486.821.803.75.726,1.75.726,2.839v2.572c0,.773.32,1.112.622,1.531.105.149.128.327-.007.439l-1.262,1.101-.002-.005-.003-.005ZM10.196,14.409v-.357c-1.193,0-2.453.255-2.453,1.662c0,.713.369,1.196,1.003,1.196.465,0,.88-.286,1.142-.75.325-.577.309-1.107.309-1.75l-.001-.001Zm1.664,4.023c-.109.098-.267.105-.389.039-.548-.455-.64-.667-.947-1.1-.906.924-1.547,1.2-2.721,1.2-1.388.001-2.469-.856-2.469-2.571c0-1.34.726-2.252,1.76-2.698.896-.395,2.147-.464,3.104-.573v-.213c0-.393.03-.857-.199-1.196-.203-.304-.587-.429-.926-.429-.629,0-1.191.323-1.333.992-.028.149-.137.295-.285.302l-1.602-.172c-.134-.03-.283-.139-.245-.347C5.977,9.725,7.731,9.14,9.299,9.14c.803,0,1.853.213,2.486.821.803.75.726,1.75.726,2.839v2.572c0,.773.32,1.112.622,1.531.107.149.13.327-.005.439l-1.259,1.094-.005-.005-.004.001Z" transform="matrix(.9 0 0 0.9-4.8006-8.2206)"/>\n                                        </svg>  \n                                    </a>\n                                </li>\n\n                                <li class="marketplacer_li marketplacer_li_two">\n                                    <a href="${a[1].url}" class="marketplacer_li_link link">\n                                        <svg id="apple-ibooks" xmlns="http://www.w3.org/2000/svg" x="0" y="0" version="1.1" viewBox="0 0 100 100" xml:space="preserve">\n                                            <g>\n                                                <linearGradient id="gradient-background" x1="-303.017" x2="-303.017" y1="748.267" y2="746.767" gradientTransform="matrix(60 0 0 -60 18231 44901)" gradientUnits="userSpaceOnUse">\n                                                    <stop offset="0" stop-color="#aaaaaa"></stop>\n                                                    <stop offset="1" stop-color="#909090"></stop>\n                                                </linearGradient>\n\n                                                <path fill="url(#gradient-background)" d="M63.6 5c9 0 13.6 0 18.4 1.5 5.3 1.9 9.5 6.1 11.4 11.4C95 22.8 95 27.3 95 36.4v27.2c0 9 0 13.6-1.5 18.4-1.9 5.3-6.1 9.5-11.4 11.4C77.2 95 72.7 95 63.6 95H36.4c-9 0-13.6 0-18.4-1.5-5.3-2-9.5-6.2-11.5-11.5C5 77.2 5 72.7 5 63.6V36.4c0-9 0-13.6 1.5-18.4 2-5.3 6.2-9.5 11.5-11.5C22.8 5 27.3 5 36.4 5h27.2z"></path>\n                                                <path fill="#fff" d="M20 32.8s2.9-7.5 14.6-7.5c11.6 0 14.7 9.8 14.7 9.8v42s-3.7-11.2-14.6-11.2c-7.9 0-13.5 5.1-13.5 5.1-.6.5-1.2.2-1.2-.6V32.8zm60 0v37.5c0 .8-.5 1.1-1.2.6 0 0-5.6-5.1-13.5-5.1C54.5 65.8 50.8 77 50.8 77V35s3-9.8 14.7-9.8c11.6 0 14.5 7.6 14.5 7.6z"></path>\n                                            </g>\n                                            </svg>\n                                    </a>\n                                </li>`,N.classList.toggle("is-hidden");const p=JSON.parse(localStorage.getItem("bookshelf_orderedbooks"));null!==p&&p.includes(e)?(P.classList.remove("is-hidden"),X.classList.remove("is-hidden")):O.classList.remove("is-hidden")}catch(e){if("ERR_CANCELED"!==e.code){console.error(e);const t=document.querySelector(".book-modal-container").createElement("div");I.after(t),t.classList.add("error-box"),t.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'}}}function W(){Z.enabledScroll(),N.classList.add("is-hidden"),P.classList.add("is-hidden"),O.classList.add("is-hidden"),X.classList.add("is-hidden")}U.addEventListener("click",(function({target:e}){e.classList.contains("owerlay")?(F=e.parentElement.parentElement.dataset.id,z(F)):e.classList.contains("owerlay-content")?(F=e.parentElement.parentElement.parentElement.dataset.id,z(F)):(e.classList.contains("title-book")||e.classList.contains("author"))&&(F=e.parentElement.dataset.id,z(F))})),I.addEventListener("click",W),O.addEventListener("click",(async function(){M&&(M.abort(),console.log("abort previous fetch"));try{const e=(0,c.getCookie)("accessToken");if(!e)throw new Error("Request failed with status code 401");const t=(0,c.createLoader)(B,"into");M=new AbortController;const{data:o}=await A.addToShoppingList(e,F,M);if(t.remove(),o){const{accessToken:e,shopping_list:t}=o;(0,c.rewriteAccessToken)(e),O.classList.add("is-hidden"),P.classList.remove("is-hidden"),X.classList.remove("is-hidden"),localStorage.setItem("bookshelf_orderedbooks",JSON.stringify(t)),(0,c.displayOrdredAmountInShoppingBag)(t)}}catch(e){if("Request failed with status code 401"===e.message)document.querySelector(".logo-link").click();else{const e=document.createElement("div");N.append(e),e.classList.add("error-box"),e.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'}}})),P.addEventListener("click",(async function(){M&&(M.abort(),console.log("abort previous fetch"));try{const e=(0,c.getCookie)("accessToken");if(!e)throw new Error("Request failed with status code 401");const t=(0,c.createLoader)(B,"into");M=new AbortController;const{data:o}=await A.removeFromShoppingList(e,F,M);if(t.remove(),o){const{accessToken:e,shopping_list:t}=o;console.log("shoppingList=",t),(0,c.rewriteAccessToken)(e),O.classList.remove("is-hidden"),P.classList.add("is-hidden"),X.classList.add("is-hidden"),localStorage.setItem("bookshelf_orderedbooks",JSON.stringify(t)),(0,c.displayOrdredAmountInShoppingBag)(t)}}catch(e){if("Request failed with status code 401"===e.message){document.querySelector(".logo-link").click()}else{const e=document.createElement("div");N.append(e),e.classList.add("error-box"),e.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'}}})),s("iNkvP"),s("kU5er");const D=document.querySelector(".js-nav-homelink"),J=document.querySelector(".js-mobile-nav-homelink");D.classList.toggle("selected"),J.classList.toggle("mobile-selected");
//# sourceMappingURL=index.5c73e550.js.map
