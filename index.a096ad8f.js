var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=e.parcelRequire3984;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var r=o[e];delete o[e];var s={id:e,exports:{}};return t[e]=s,r.call(s.exports,s,s.exports),s.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){o[e]=t},e.parcelRequire3984=r),r("kyEFX").register(JSON.parse('{"5ZPII":"index.a096ad8f.js","kfWnF":"empty-img-mobile@1x.8fbd5955.jpg","cW9vs":"empty-img-mobile@2x.2ea00d8f.jpg","5rc3U":"empty-img-mobile@3x.424036b7.jpg","gpdIz":"empty-img-tablet@1x.90771ee2.jpg","h2Cpp":"empty-img-tablet@2x.5b6d4ccf.jpg","avBN4":"empty-img-tablet@3x.9e70b472.jpg","63WUa":"empty-img-desktop@1x.799f71fc.jpg","elcTK":"empty-img-desktop@2x.2ff1170a.jpg","4tXlI":"empty-img-desktop@3x.5d43da0f.jpg","d1j6q":"index.798d6e07.js"}')),r("bUb57"),r("jeON5"),r("76jN1");var s=r("cTOKP"),n=r("hqv3x");new URL(r("kyEFX").resolve("kfWnF"),import.meta.url).toString();new URL(r("kyEFX").resolve("cW9vs"),import.meta.url).toString();new URL(r("kyEFX").resolve("5rc3U"),import.meta.url).toString();new URL(r("kyEFX").resolve("gpdIz"),import.meta.url).toString();new URL(r("kyEFX").resolve("h2Cpp"),import.meta.url).toString();new URL(r("kyEFX").resolve("avBN4"),import.meta.url).toString();new URL(r("kyEFX").resolve("63WUa"),import.meta.url).toString();new URL(r("kyEFX").resolve("elcTK"),import.meta.url).toString();new URL(r("kyEFX").resolve("4tXlI"),import.meta.url).toString();const a=new(0,s.bookshelf_API),c=document.querySelector(".category-list-box");c.addEventListener("click",b);const l=document.querySelector(".books-box"),i=document.querySelector(".btn-up-scroll");let d,m,p,u,g=!0;const h=document.documentElement.scrollWidth;async function b({target:e}){if(p&&(p.abort(),console.log("abort previous books fetch")),!e.classList.contains("category-list-item")&&!e.classList.contains("js-btn-more"))return;(0,n.changeActiveItem)(m,d,e);const t=e.id.split(" ").join("%20");if("all-categories-item"===t){l.innerHTML="";const e=(0,n.createBooksBoxTitle)(l,"Best Sellers Books");g||(0,n.scrollToBoxTop)(l);const t=(0,n.createLoader)(e,"after");p=new AbortController;const o=await async function(e){try{const{data:t}=await a.getTopBooks(u,e);return t.length?t:Notify.failure("Can't find best sellers books on the server. Please reload the page!")}catch(e){if("ERR_CANCELED"!==e.code){console.error(e);const t=document.createElement("div");l.append(t),t.classList.add("error-box"),t.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'}return[]}}(p);if(t.remove(),o.length){const t=document.createElement("ul");t.classList.add("list","best-books-list"),e.after(t),t.addEventListener("click",f),t.innerHTML=function(e,t){const o=e.map((({category:e,books:o})=>{const r=`<p class="theme-book">${e}</p>`;if(o.length){return`<li class="best-book-container">${r}\n                            <ul class="list-books">${o.splice(0,t).map((({_id:e,book_image:t,title:o,author:r})=>`<li class="item-book" data-id="${e}">\n                    <div class="img-owerlay">\n                        <img src="${t}" alt="${o}" class="img-book" loading="auto">\n                        <div class="owerlay">\n                            <p class="owerlay-content">quick view</p>\n                        </div>\n                    </div>\n                    <p class="title-book">${(0,n.shortTitle)(o,17)}</p>\n                    <p class="title-author">${(0,n.shortTitle)(r,34)}</p>\n                </li>`)).join("")}</ul>\n                            <button type="button" class="button-more js-btn-more" id="${e}">See more</button>\n                        </li>`}return`<li class="off-books best-book-container">${e}\n                            <p class="off-books-text">Sorry, there are no books in this category, please choose another category</p>\n                        </li>`})).join("");return o}(o,u),g?g=!1:(0,n.scrollToBoxTop)(l)}}else{l.innerHTML="";const o=(0,n.createBooksBoxTitle)(l,e.id);(0,n.scrollToBoxTop)(l);const r=(0,n.createLoader)(o,"after");p=new AbortController;const s=await async function(e,t){try{const{data:o}=await a.getBooksOfCategory(u,e,t);return o.length?o:Notify.failure("Can't find books of category <"+e+"> on the server. Please reload the page!")}catch(e){if("ERR_CANCELED"!==e.code){console.error(e);const t=document.createElement("div");l.append(t),t.classList.add("error-box"),t.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'}return[]}}(t,p);if(r.remove(),s.length){const e=document.createElement("ul");o.after(e),e.classList.add("list","category-books-list");const t=document.documentElement.scrollWidth;e.innerHTML=v(s,t<768?1:t<1440&&t>=768?3:5),(0,n.scrollToBoxTop)(l)}}}async function f(e){e.preventDefault();const{target:t}=e;t.classList.contains("js-btn-more")&&b(e)}function v(e,t){if(e.length){return e.map((({_id:e,book_image:t,author:o,title:r})=>`<li class="item-book" data-id="${e}">  \n                <div class="img-owerlay">\n                \n                    <img src="${t}" alt="${r}" class="img-book loading="auto"">\n                    <div class="owerlay">\n                        <p class="owerlay-content">quick view</p>\n                    </div>\n                </div>\n                <p class="title-book">${(0,n.shortTitle)(r,17)}</p>\n                <p class="title-author">${(0,n.shortTitle)(o,34)}</p>\n            </li>`)).join("")}return'<liv class="off-books">\n                            <p class="off-books-text">Sorry, there are no books in this category, please choose another category</p>\n                        </li>'}u=h<768?1:h<1440&&h>=768?3:5,i.addEventListener("click",(()=>{(0,n.scrollUp)(),i.classList.add("is-hidden-btn")})),window.addEventListener("scroll",(()=>{(0,n.scrollTracker)(i)})),async function(){(0,n.scrollUp)(),m=document.createElement("h3"),m.textContent="All categories",m.classList.add("category-list-item","active"),m.setAttribute("id","all-categories-item"),c.prepend(m),m.click();const e=(0,n.createLoader)(m,"after"),t=await async function(){try{const{data:e}=await a.getBookCategories();return e.length?e:Notify.failure("Can't find list of categories on the server. Please reload the page!")}catch(e){if("ERR_CANCELED"!==e.code){console.error(e);const t=document.createElement("div");m.after(t),t.classList.add("error-box"),t.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'}return[]}}();t.length&&(d=document.createElement("ul"),m.after(d),d.classList.add("category-list"),d.innerHTML=function(e){let t="";return e.forEach((e=>{t+=`  <li id="${e}" class="category-list-item"> \n                                       ${e}\n                                    </li> `})),t}(t),c.classList.add("category-list-box-not-empty"));e.remove()}(),r("8e037");const k=document.querySelector(".user-profile-closeBtn"),y=document.querySelector(".user-profile-modal");k.addEventListener("click",(function(){y.classList.add("is-hidden")}));s=r("cTOKP"),n=r("hqv3x");const L=new(0,s.bookshelf_API);let w,x,E;const S=document.querySelector(".books-box"),_=document.querySelector(".book-modal-backdrop"),T=document.querySelector(".btn-modal-close"),H=document.querySelector(".add"),R=document.querySelector(".remove"),C=document.querySelector(".modal-message"),q={scrollPosition:0,disabledScroll(){q.scrollPosition=window.scrollY,document.body.classList.add("block-scroll"),document.body.style.cssText=`top: -${q.scrollPosition}px;`},enabledScroll(){document.body.classList.remove("block-scroll"),document.body.style.cssText="top: 0",window.scroll({top:q.scrollPosition})}};async function A(e){x&&(x.abort(),console.log("abort previous book fetch")),q.disabledScroll(),document.addEventListener("keydown",(e=>{"Escape"===e.key&&F()}),{once:!0});try{x=new AbortController;const t=await L.getBookById(e,x),{author:o,book_image:r,description:s,title:n,buy_links:a}=t.data,c=document.querySelector(".book-img-div"),l=document.querySelector("#name-book"),i=document.querySelector("#author"),d=document.querySelector("#description"),m=document.querySelector(".market_placers_list");l.textContent=n,i.textContent=o,d.textContent=""===s?"No description":s,c.innerHTML=`<img src="${r}" alt="${r}" class="book-img-modal" loading="auto">`,m.innerHTML=`<li class="marketplacer_li marketplacer_li_one">\n                                    <a href="${a[0].url}" class="marketplacer_li_link link">\n                                        <svg id="amazon-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 15">\n                                            <path fill="var(--amazon-path1-color)" d="M38.42,21.708c-3.093,2.284-7.591,3.504-11.459,3.504-5.423,0-10.306-2.005-13.999-5.342-.29-.262-.03-.62.318-.416c3.986,2.32,8.915,3.715,14.005,3.715c3.434,0,7.211-.71,10.684-2.185.525-.223.963.343.45.724h.001Zm1.289-1.473c-.395-.507-2.613-.239-3.617-.121-.304.037-.35-.228-.077-.418c1.771-1.247,4.677-.887,5.017-.469s-.088,3.333-1.753,4.724c-.256.213-.499.1-.386-.183.373-.933,1.212-3.025.815-3.533h.001Z" transform="matrix(.9 0 0 0.9-4.692819-7.6908)"/>\n                                            <path fill="var(--amazon-path2-color)" d="M36.166,10.894c0,.181.14.304.314.304h2.829l-3.257,4.671c-.197.3-.199.636-.199.834v1.228c0,.176.197.381.386.278c1.845-.98,4.062-.884,5.732-.009.205.107.4-.1.4-.276v-1.293c-.021-.174-.075-.351-.288-.471-.947-.534-2.049-.69-3.094-.664L41.8,11.482c.259-.36.406-.588.409-.762v-1.037c0-.181-.14-.307-.314-.307h-5.425c-.003,0-.006,0-.009,0-.165,0-.299.134-.299.299c0,.003,0,.006,0,.008v1.212l.004-.001ZM16.361,18.451c.176,0,.318-.137.318-.307v-4.491c0-.98-.046-2.336,1.14-2.336c1.173,0,1.017,1.391,1.017,2.336l.002,4.491c0,.163.13.295.297.307h1.653c.176,0,.318-.137.318-.307v-4.491c0-.481-.017-1.195.153-1.623s.587-.694.987-.694c.478,0,.848.161.971.729.078.339.046,1.23.046,1.588v4.496c0,.163.137.295.297.307h1.653c.176,0,.318-.137.318-.307l.004-5.347c0-.908.107-1.943-.416-2.656-.462-.641-1.219-.926-1.91-.926-.973,0-1.88.499-2.28,1.57-.465-1.07-1.11-1.57-2.143-1.57-1.017,0-1.771.499-2.173,1.57h-.03v-1.107c-.012-.153-.14-.276-.3-.283h-1.539c-.176,0-.318.134-.318.304v8.471c.012.151.137.269.295.281h1.65l-.01-.005ZM46.878,9.227c2.449,0,3.775,2.103,3.775,4.778c0,2.584-1.465,4.634-3.775,4.634-2.4,0-3.715-2.103-3.715-4.724c0-2.637,1.326-4.693,3.715-4.693v.005Zm.014,1.723c-1.216,0-1.293,1.658-1.293,2.691s-.016,3.245,1.279,3.245c1.279,0,1.34-1.783,1.34-2.869c0-.715-.03-1.57-.245-2.247-.186-.59-.555-.82-1.079-.82h-.002Zm6.931,7.507c.177,0,.321-.137.323-.307v-4.562c0-.571.03-1.087.262-1.604.189-.408.558-.677.96-.677c1.14,0,1.033,1.356,1.033,2.283v4.601c.016.144.141.255.292.267h1.652c.162,0,.299-.117.318-.267v-5.333c0-.82,0-1.96-.427-2.637-.465-.732-1.18-.998-1.927-.998-1.14,0-1.788.553-2.25,1.711h-.03v-1.296c-.033-.132-.151-.23-.295-.237h-1.531c-.167,0-.304.121-.318.276l.002,8.474c0,.163.137.295.297.307h1.644l-.005-.001ZM31.835,14.403v-.357c-1.195,0-2.456.255-2.456,1.662c0,.713.372,1.196,1.005,1.196.462,0,.88-.286,1.142-.75.325-.577.309-1.107.309-1.75v-.001Zm1.664,4.024c-.109.098-.267.105-.389.039-.548-.455-.647-.667-.947-1.1-.906.924-1.548,1.2-2.721,1.2-1.39,0-2.47-.857-2.47-2.572c0-1.34.724-2.252,1.76-2.698.896-.395,2.147-.464,3.104-.573v-.213c0-.393.03-.857-.203-1.196-.199-.304-.585-.429-.926-.429-.629,0-1.189.323-1.326.992-.028.149-.137.295-.288.302l-1.6-.172c-.134-.03-.285-.139-.245-.347.367-1.941,2.123-2.526,3.691-2.526.803,0,1.853.213,2.486.821.803.75.726,1.75.726,2.839v2.572c0,.773.32,1.112.622,1.531.105.149.128.327-.007.439l-1.262,1.101-.002-.005-.003-.005ZM10.196,14.409v-.357c-1.193,0-2.453.255-2.453,1.662c0,.713.369,1.196,1.003,1.196.465,0,.88-.286,1.142-.75.325-.577.309-1.107.309-1.75l-.001-.001Zm1.664,4.023c-.109.098-.267.105-.389.039-.548-.455-.64-.667-.947-1.1-.906.924-1.547,1.2-2.721,1.2-1.388.001-2.469-.856-2.469-2.571c0-1.34.726-2.252,1.76-2.698.896-.395,2.147-.464,3.104-.573v-.213c0-.393.03-.857-.199-1.196-.203-.304-.587-.429-.926-.429-.629,0-1.191.323-1.333.992-.028.149-.137.295-.285.302l-1.602-.172c-.134-.03-.283-.139-.245-.347C5.977,9.725,7.731,9.14,9.299,9.14c.803,0,1.853.213,2.486.821.803.75.726,1.75.726,2.839v2.572c0,.773.32,1.112.622,1.531.107.149.13.327-.005.439l-1.259,1.094-.005-.005-.004.001Z" transform="matrix(.9 0 0 0.9-4.8006-8.2206)"/>\n                                        </svg>  \n                                    </a>\n                                </li>\n\n                                <li class="marketplacer_li marketplacer_li_two">\n                                    <a href="${a[1].url}" class="marketplacer_li_link link">\n                                        <svg id="apple-ibooks" xmlns="http://www.w3.org/2000/svg" x="0" y="0" version="1.1" viewBox="0 0 100 100" xml:space="preserve">\n                                            <g>\n                                                <linearGradient id="gradient-background" x1="-303.017" x2="-303.017" y1="748.267" y2="746.767" gradientTransform="matrix(60 0 0 -60 18231 44901)" gradientUnits="userSpaceOnUse">\n                                                    <stop offset="0" stop-color="#aaaaaa"></stop>\n                                                    <stop offset="1" stop-color="#909090"></stop>\n                                                </linearGradient>\n\n                                                <path fill="url(#gradient-background)" d="M63.6 5c9 0 13.6 0 18.4 1.5 5.3 1.9 9.5 6.1 11.4 11.4C95 22.8 95 27.3 95 36.4v27.2c0 9 0 13.6-1.5 18.4-1.9 5.3-6.1 9.5-11.4 11.4C77.2 95 72.7 95 63.6 95H36.4c-9 0-13.6 0-18.4-1.5-5.3-2-9.5-6.2-11.5-11.5C5 77.2 5 72.7 5 63.6V36.4c0-9 0-13.6 1.5-18.4 2-5.3 6.2-9.5 11.5-11.5C22.8 5 27.3 5 36.4 5h27.2z"></path>\n                                                <path fill="#fff" d="M20 32.8s2.9-7.5 14.6-7.5c11.6 0 14.7 9.8 14.7 9.8v42s-3.7-11.2-14.6-11.2c-7.9 0-13.5 5.1-13.5 5.1-.6.5-1.2.2-1.2-.6V32.8zm60 0v37.5c0 .8-.5 1.1-1.2.6 0 0-5.6-5.1-13.5-5.1C54.5 65.8 50.8 77 50.8 77V35s3-9.8 14.7-9.8c11.6 0 14.5 7.6 14.5 7.6z"></path>\n                                            </g>\n                                            </svg>\n                                    </a>\n                                </li>`,_.classList.toggle("is-hidden");const p=JSON.parse(localStorage.getItem("bookshelf_orderedbooks"));null!==p&&p.includes(e)?(R.classList.remove("is-hidden"),C.classList.remove("is-hidden")):H.classList.remove("is-hidden")}catch(e){if("ERR_CANCELED"!==e.code){console.error(e);const t=document.querySelector(".book-modal-container").createElement("div");T.after(t),t.classList.add("error-box"),t.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'}}}function F(){q.enabledScroll(),_.classList.add("is-hidden"),R.classList.add("is-hidden"),H.classList.add("is-hidden"),C.classList.add("is-hidden")}S.addEventListener("click",(function({target:e}){e.classList.contains("img-book")||e.classList.contains("owerlay")?(w=e.parentElement.parentElement.dataset.id,A(w)):e.classList.contains("owerlay-content")?(w=e.parentElement.parentElement.parentElement.dataset.id,A(w)):(e.classList.contains("title-book")||e.classList.contains("author"))&&(w=e.parentElement.dataset.id,A(w))})),T.addEventListener("click",F),H.addEventListener("click",(async function(){E&&(E.abort(),console.log("abort previous fetch"));try{const e=(0,n.getCookie)("accessToken");if(!e)throw new Error("Request failed with status code 401");const t=(0,n.createLoader)(_,"after");E=new AbortController;const{data:o}=await L.addToShoppingList(e,w,E);if(t.remove(),o){const{accessToken:e,shopping_list:t}=o;(0,n.rewriteAccessToken)(e),H.classList.add("is-hidden"),R.classList.remove("is-hidden"),C.classList.remove("is-hidden"),localStorage.setItem("bookshelf_orderedbooks",JSON.stringify(t)),(0,n.displayOrdredAmountInShoppingBag)(t)}}catch(e){if("Request failed with status code 401"===e.message)document.querySelector(".logo-link").click();else{const e=document.createElement("div");_.append(e),e.classList.add("error-box"),e.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'}}})),R.addEventListener("click",(async function(){E&&(E.abort(),console.log("abort previous fetch"));try{const e=(0,n.getCookie)("accessToken");if(!e)throw new Error("Request failed with status code 401");const t=(0,n.createLoader)(_,"after");E=new AbortController;const{data:o}=await L.removeFromShoppingList(e,w,E);if(t.remove(),o){const{accessToken:e,shopping_list:t}=o;console.log("shoppingList=",t),(0,n.rewriteAccessToken)(e),H.classList.remove("is-hidden"),R.classList.add("is-hidden"),C.classList.add("is-hidden"),localStorage.setItem("bookshelf_orderedbooks",JSON.stringify(t)),(0,n.displayOrdredAmountInShoppingBag)(t)}}catch(e){if("Request failed with status code 401"===e.message){document.querySelector(".logo-link").click()}else{const e=document.createElement("div");_.append(e),e.classList.add("error-box"),e.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'}}})),r("iNkvP"),r("kU5er");const j=document.querySelector(".js-nav-homelink"),B=document.querySelector(".js-mobile-nav-homelink");j.classList.toggle("selected"),B.classList.toggle("mobile-selected");
//# sourceMappingURL=index.a096ad8f.js.map
