var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},s=e.parcelRequire3984;function r(e,t){if(!(e.length>Number(t)))return e;switch(function(e,t){const o=t.length;let s=0,r=e,n=e.indexOf(t);for(;n>=0;)s+=1,r=r.slice(n+o),n=r.indexOf(t);return s}(e," ")){case 0:default:return e.slice(0,Number(t-2))+"...";case 1:return e.slice(0,Number(t-1))+"..."}}function n(e){const t=e.split(" ");return`${t.splice(0,t.length-1).join(" ")} <span class="last-word-color">${t.join("")}</span>`}null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in o){var s=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,s.call(r.exports,r,r.exports),r.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){o[e]=t},e.parcelRequire3984=s),s("jeON5"),s("76jN1");const l=new(0,(x=s("aiKfP")).booksAPI),i=document.querySelector(".category-list-box"),a=i.querySelector(".category-list"),c=i.querySelector("#category-list-title"),d=i.querySelector(".loader"),u=document.querySelector(".books-box"),g=u.querySelector(".title-theme-book"),m=u.querySelector(".list"),b=document.querySelector(".books-box .loader"),y=u.querySelector(".btn-up-scroll");let p,h,f;function k(e,t){return e.map((({list_name:e,books:o})=>{const s=`<p class="theme-book">${e}</p>`;if(o.length){return`<li class="best-book-container">${s}\n                            <ul class="list-books">${o.splice(0,t).map((({_id:e,book_image:t,title:o,author:s})=>`<li class="item-book" data-id="${e}">\n                    <div class="img-owerlay">\n                        <img src="${t}" alt="${o}" class="img-book">\n                        <div class="owerlay">\n                            <p class="owerlay-content">quick view</p>\n                        </div>\n                    </div>\n                    <p class="title-book">${r(o,17)}</p>\n                    <p class="author">${r(s,34)}</p>\n                </li>`)).join("")}</ul>\n                            <button type="button" class="button-more js-btn-more" id="${e}">See more</button>\n                        </li>`}return`<li class="off-books best-book-container">${s}\n                            <p class="off-books-text">Sorry, there are no books in this category, please choose another category</p>\n                        </li>`})).join("")}function L(e,t){if(e.length){return e.map((({_id:e,book_image:t,author:o,title:s})=>`<li class="item-book" data-id="${e}">  \n                <div class="img-owerlay">\n                    <img src="${t}" alt="${s}" class="img-book">\n                    <div class="owerlay">\n                        <p class="owerlay-content">quick view</p>\n                    </div>\n                </div>\n                <p class="title-book">${r(s,17)}</p>\n                <p class="title-author">${r(o,34)}</p>\n            </li>`)).join("")}return'<liv class="off-books">\n                            <p class="off-books-text">Sorry, there are no books in this category, please choose another category</p>\n                        </li>'}async function v(){h&&(h.abort(),console.log("abort showBestSellersBooks")),g.innerHTML=`${n("Best Sellers Books")}`,m.innerHTML="",m.classList.remove("category-books-list"),m.classList.add("best-books-list"),b.classList.toggle("loader-non-active"),h=new AbortController;const e=await async function(e){try{const{data:t}=await l.getTopBooks(e);return t.length?t:Notify.failure("Can't find best sellers books on the server. Please reload the page!")}catch(e){return"ERR_CANCELED"!==e.code&&(console.error(e),m.innerHTML='<li class="error-box">\n                                            <p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>\n                                       </li>'),[]}}(h);if(e.length){const t=document.documentElement.scrollWidth;m.innerHTML=k(e,t<768?1:t<1440&&t>=768?3:5)}b.classList.toggle("loader-non-active")}async function w({target:e}){if(e.classList.contains("category-list-item")||e.classList.contains("js-btn-more")){const t=e.id.split(" ").join("%20");if("category-list-title"===t)v();else{f&&(f.abort(),console.log("abort showBooksOfCategory")),g.innerHTML=`${n(e.id)}`,m.innerHTML="",E(),m.classList.remove("best-books-list"),m.classList.add("category-books-list"),b.classList.toggle("loader-non-active"),f=new AbortController;const o=await async function(e,t){try{const{data:o}=await l.getBooksByCategory(e,t);return o.length?o:Notify.failure("Can't find books of category <"+e+"> on the server. Please reload the page!")}catch(e){return"ERR_CANCELED"!==e.code&&(console.error(e),m.innerHTML='<li class="error-box">\n                                            <p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>\n                                        </li>'),[]}}(t,f);if(o.length){document.documentElement.scrollWidth;m.innerHTML=L(o)}b.classList.toggle("loader-non-active"),E()}}}function S(){window.scrollTo({top:0,behavior:"smooth"}),y.classList.add("is-hidden-btn")}function E(){window.scroll({top:g.offsetTop,left:0,behavior:"smooth"})}!async function(){S(),p&&(p.abort(),console.log("abort showCategoryList"));d.classList.remove("loader-non-active"),p=new AbortController;const e=await async function(e){try{const{data:t}=await l.getCategoryList(e);return t.length?t:Notify.failure("Can't find list of categories on the server. Please reload the page!")}catch(e){return"ERR_CANCELED"!==e.code&&(console.error(e),a.innerHTML='<li class="error-box">\n                                            <p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>\n                                          </li>'),[]}}(p);e.length&&(a.innerHTML=function(e){let t="";return e.forEach((e=>{const o=`  <li id="${e.list_name}" class="category-list-item"> \n                                        ${e.list_name}\n                                    </li> `;t+=o})),t}(e),i.classList.add("category-list-box-not-empty"));d.classList.add("loader-non-active")}(),i.addEventListener("click",w),c.click(),m.addEventListener("click",(async function(e){e.preventDefault();const{target:t}=e;try{if(!t.classList.contains("js-btn-more"))return;w(e),S()}catch(e){console.error(e),Notify.failure("Sorry, there was a server error, please reload the page")}})),y.addEventListener("click",S),window.addEventListener("scroll",(function(){const e=window.scrollY||window.pageYOffSet,t=document.documentElement.clientHeight;e>t?y.classList.remove("is-hidden-btn"):y.classList.add("is-hidden-btn")})),s("8e037");var x=s("aiKfP"),q=s("bUb57");const $=new(0,x.booksAPI);let N;const C=document.querySelector(".books-box"),T=document.querySelector(".back"),B=document.querySelector(".btn-modal-close"),I=document.querySelector(".add"),O=document.querySelector(".remove"),_=document.querySelector(".modal-message"),j={scrollPosition:0,disabledScroll(){j.scrollPosition=window.scrollY,document.body.classList.add("block-scroll"),document.body.style.cssText=`top: -${j.scrollPosition}px;`},enabledScroll(){document.body.classList.remove("block-scroll"),document.body.style.cssText="top: 0",window.scroll({top:j.scrollPosition})}};async function H(e){j.disabledScroll(),document.addEventListener("keydown",(e=>{"Escape"===e.key&&M()}),{once:!0});try{const t=await $.getBookById(e),{author:o,book_image:s,description:r,title:n,buy_links:l}=t.data,i=document.querySelector(".book-img"),a=document.querySelector("#name-book"),c=document.querySelector("#author"),d=document.querySelector("#description"),u=document.querySelector("#amazon"),g=document.querySelector("#apple"),m=document.querySelector("#barnes");i.innerHTML="";const b=`<img src="${s}" alt="${s}" class="img-modal">`;a.textContent=n,c.textContent=o,d.textContent=""===r?"No description":r,u.attributes[0].value=l[0].url,g.attributes[0].value=l[1].url,m.attributes[0].value=l[2].url,i.innerHTML=b,T.classList.toggle("is-hidden");const y=localStorage.getItem("orderedBookID"),p=JSON.parse(y);null!==p&&p.includes(e)?(O.classList.remove("is-hidden"),_.classList.remove("is-hidden")):I.classList.remove("is-hidden")}catch(e){console.error(e),Notify.failure("Sorry, there was a server error, please reload the page")}}function M(){j.enabledScroll(),T.classList.toggle("is-hidden"),O.classList.add("is-hidden"),I.classList.add("is-hidden"),_.classList.add("is-hidden")}C.addEventListener("click",(function(e){"img-book"===e.target.classList[0]||"owerlay"===e.target.classList[0]?(N=e.target.parentElement.parentElement.dataset.id,H(N)):"owerlay-content"===e.target.classList[0]?(N=e.target.parentElement.parentElement.parentElement.dataset.id,H(N)):"title-book"!==e.target.classList[0]&&"author"!==e.target.classList[0]||(N=e.target.parentElement.dataset.id,H(N))})),B.addEventListener("click",M),I.addEventListener("click",(function(){I.classList.add("is-hidden"),O.classList.remove("is-hidden"),_.classList.remove("is-hidden");const e=localStorage.getItem("orderedBookID");let t=JSON.parse(e);null===t&&(t=[]);t.push(N),localStorage.setItem("orderedBookID",JSON.stringify(t)),(0,q.countShoppingBook)(t)})),O.addEventListener("click",(function(){I.classList.remove("is-hidden"),O.classList.add("is-hidden"),_.classList.add("is-hidden");const e=localStorage.getItem("orderedBookID"),t=JSON.parse(e);let o=t.indexOf(N);t.splice(o,1),localStorage.removeItem("orderedBookID"),localStorage.setItem("orderedBookID",JSON.stringify(t)),(0,q.countShoppingBook)(t)})),s("iNkvP"),s("kU5er");const D=document.querySelector(".js-nav-homelink"),P=document.querySelector(".js-mobile-nav-homelink");D.classList.toggle("selected"),P.classList.toggle("mobile-selected");
//# sourceMappingURL=index.775d3b53.js.map
