!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},n=t.parcelRequire3984;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in o){var t=o[e];delete o[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){o[e]=t},t.parcelRequire3984=n),n("iE7OH").register(JSON.parse('{"EVgbq":"index.2f888cc5.js","jOOjU":"empty-img-mobile@1x.8fbd5955.jpg","el80q":"empty-img-mobile@2x.2ea00d8f.jpg","4OiJh":"empty-img-mobile@3x.424036b7.jpg","u4nho":"empty-img-tablet@1x.90771ee2.jpg","1LSgB":"empty-img-tablet@2x.5b6d4ccf.jpg","8BF0x":"empty-img-tablet@3x.9e70b472.jpg","bBc9N":"empty-img-desktop@1x.799f71fc.jpg","9Ru3k":"empty-img-desktop@2x.2ff1170a.jpg","gKD3b":"empty-img-desktop@3x.5d43da0f.jpg","hE6Rv":"index.98b43a65.js"}')),n("i8Q71"),n("ILISp"),n("aEag2");var a=n("bpxeT"),s=n("2TvXO"),c=n("dNYR7"),l=n("fPiI6");n("aNJCr").getBundleURL("EVgbq"),n("iE7OH").resolve("jOOjU");n("aNJCr").getBundleURL("EVgbq"),n("iE7OH").resolve("el80q");n("aNJCr").getBundleURL("EVgbq"),n("iE7OH").resolve("4OiJh");n("aNJCr").getBundleURL("EVgbq"),n("iE7OH").resolve("u4nho");n("aNJCr").getBundleURL("EVgbq"),n("iE7OH").resolve("1LSgB");n("aNJCr").getBundleURL("EVgbq"),n("iE7OH").resolve("8BF0x");n("aNJCr").getBundleURL("EVgbq"),n("iE7OH").resolve("bBc9N");n("aNJCr").getBundleURL("EVgbq"),n("iE7OH").resolve("9Ru3k");n("aNJCr").getBundleURL("EVgbq"),n("iE7OH").resolve("gKD3b");var i=new(0,c.bookshelf_API),d=document.querySelector(".category-list-box");d.addEventListener("click",L);var u,p,m,b,h=document.querySelector(".books-box"),g=document.querySelector(".btn-up-scroll"),f=document.querySelector(".container"),v=!0,k=document.documentElement.scrollWidth;b=k<768?1:k<1440&&k>=768?3:5,g.addEventListener("click",(function(){(0,l.scrollUp)(),g.classList.add("is-hidden-btn")})),window.addEventListener("scroll",(function(){(0,l.scrollTracker)(g)}));var y=(0,l.createLoader)(f,"into");function x(){return(x=e(a)(e(s).mark((function t(){var r;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(0,l.scrollUp)(),(p=document.createElement("h3")).textContent="All categories",p.classList.add("category-list-item","active"),p.setAttribute("id","all-categories-item"),d.prepend(p),p.click(),e.next=9,_();case 9:(r=e.sent).length&&(u=document.createElement("ul"),p.after(u),u.classList.add("category-list"),u.innerHTML=B(r),d.classList.add("category-list-box-not-empty"));case 11:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function L(e){return E.apply(this,arguments)}function E(){return(E=e(a)(e(s).mark((function t(r){var o,n,a,c,i,d,g,f,k,y;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=r.target,m&&(m.abort(),console.log("abort previous books fetch")),o.classList.contains("category-list-item")||o.classList.contains("js-btn-more")){e.next=4;break}return e.abrupt("return");case 4:if((0,l.changeActiveItem)(p,u,o),"all-categories-item"!==(n=o.id.split(" ").join("%20"))){e.next=17;break}return h.innerHTML="",a=(0,l.createBooksBoxTitle)(h,"Best Sellers Books"),v||(0,l.scrollToBoxTop)(h),m=new AbortController,e.next=13,T(m);case 13:(c=e.sent).length&&((i=document.createElement("ul")).classList.add("list","best-books-list"),a.after(i),i.addEventListener("click",w),i.innerHTML=A(c,b),v?v=!1:(0,l.scrollToBoxTop)(h)),e.next=27;break;case 17:return h.innerHTML="",d=(0,l.createBooksBoxTitle)(h,o.id),(0,l.scrollToBoxTop)(h),g=(0,l.createLoader)(d,"after"),m=new AbortController,e.next=24,C(n,m);case 24:f=e.sent,g.remove(),f.length&&(k=document.createElement("ul"),d.after(k),k.classList.add("list","category-books-list"),y=document.documentElement.scrollWidth,k.innerHTML=O(f,y<768?1:y<1440&&y>=768?3:5),(0,l.scrollToBoxTop)(h));case 27:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function w(e){return S.apply(this,arguments)}function S(){return(S=e(a)(e(s).mark((function t(r){return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),r.target.classList.contains("js-btn-more")){e.next=4;break}return e.abrupt("return");case 4:L(r);case 5:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function _(){return H.apply(this,arguments)}function H(){return(H=e(a)(e(s).mark((function t(){var r,o;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.getBookCategories();case 3:if((r=e.sent.data).length){e.next=6;break}return e.abrupt("return",Notify.failure("Can't find list of categories on the server. Please reload the page!"));case 6:return e.abrupt("return",r);case 9:return e.prev=9,e.t0=e.catch(0),"ERR_CANCELED"!==e.t0.code&&(console.error(e.t0),o=document.createElement("div"),p.after(o),o.classList.add("error-box"),o.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'),e.abrupt("return",[]);case 13:case"end":return e.stop()}}),t,null,[[0,9]])})))).apply(this,arguments)}function T(e){return q.apply(this,arguments)}function q(){return(q=e(a)(e(s).mark((function t(r){var o,n;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.getTopBooks(b,r);case 3:if((o=e.sent.data).length){e.next=6;break}return e.abrupt("return",Notify.failure("Can't find best sellers books on the server. Please reload the page!"));case 6:return e.abrupt("return",o);case 9:return e.prev=9,e.t0=e.catch(0),"ERR_CANCELED"!==e.t0.code&&(console.error(e.t0),n=document.createElement("div"),h.append(n),n.classList.add("error-box"),n.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'),e.abrupt("return",[]);case 13:case"end":return e.stop()}}),t,null,[[0,9]])})))).apply(this,arguments)}function C(e,t){return R.apply(this,arguments)}function R(){return(R=e(a)(e(s).mark((function t(r,o){var n,a;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.getBooksOfCategory(b,r,o);case 3:if((n=e.sent.data).length){e.next=6;break}return e.abrupt("return",Notify.failure("Can't find books of category <"+r+"> on the server. Please reload the page!"));case 6:return e.abrupt("return",n);case 9:return e.prev=9,e.t0=e.catch(0),"ERR_CANCELED"!==e.t0.code&&(console.error(e.t0),a=document.createElement("div"),h.append(a),a.classList.add("error-box"),a.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'),e.abrupt("return",[]);case 13:case"end":return e.stop()}}),t,null,[[0,9]])})))).apply(this,arguments)}function B(e){var t="";return e.forEach((function(e){var r='  <li id="'.concat(e,'" class="category-list-item"> \n                                       ').concat(e,"\n                                    </li> ");t+=r})),t}function A(e,t){return e.map((function(e){var r=e.category,o=e.books,n='<p class="theme-book">'.concat(r,"</p>");if(o.length){var a=o.splice(0,t).map((function(e){var t=e._id,r=e.book_image,o=e.title,n=e.author;return'<li class="item-book" data-id="'.concat(t,'">\n                    <div class="img-owerlay">\n                        <img src="').concat(r,'" alt="').concat(o,'" class="img-book" loading="auto">\n                        <div class="owerlay">\n                            <p class="owerlay-content">quick view</p>\n                        </div>\n                    </div>\n                    <p class="title-book">').concat((0,l.shortTitle)(o,17),'</p>\n                    <p class="title-author">').concat((0,l.shortTitle)(n,34),"</p>\n                </li>")})).join("");return'<li class="best-book-container">'.concat(n,'\n                            <ul class="list-books">').concat(a,'</ul>\n                            <button type="button" class="button-more js-btn-more" id="').concat(r,'">See more</button>\n                        </li>')}return'<li class="off-books best-book-container">'.concat(r,'\n                            <p class="off-books-text">Sorry, there are no books in this category, please choose another category</p>\n                        </li>')})).join("")}function O(e,t){return e.length?e.map((function(e){var t=e._id,r=e.book_image,o=e.author,n=e.title;return'<li class="item-book" data-id="'.concat(t,'">  \n                <div class="img-owerlay">\n                \n                    <img src="').concat(r,'" alt="').concat(n,'" class="img-book loading="auto"">\n                    <div class="owerlay">\n                        <p class="owerlay-content">quick view</p>\n                    </div>\n                </div>\n                <p class="title-book">').concat((0,l.shortTitle)(n,17),'</p>\n                <p class="title-author">').concat((0,l.shortTitle)(o,34),"</p>\n            </li>")})).join(""):'<liv class="off-books">\n                            <p class="off-books-text">Sorry, there are no books in this category, please choose another category</p>\n                        </li>'}!function(){x.apply(this,arguments)}(),y.remove(),n("cIzEt");var N=document.querySelector(".user-profile-closeBtn"),j=document.querySelector(".user-profile-modal");N.addEventListener("click",(function(){j.classList.add("is-hidden")}));a=n("bpxeT"),s=n("2TvXO"),c=n("dNYR7"),l=n("fPiI6");var M,U,F,J=new(0,c.bookshelf_API),I=document.querySelector(".books-box"),V=document.querySelector(".book-modal-backdrop"),P=document.querySelector(".btn-modal-close"),Z=document.querySelector(".add"),D=document.querySelector(".remove"),z=document.querySelector(".modal-message"),Y={scrollPosition:0,disabledScroll:function(){Y.scrollPosition=window.scrollY,document.body.classList.add("block-scroll"),document.body.style.cssText="top: -".concat(Y.scrollPosition,"px;")},enabledScroll:function(){document.body.classList.remove("block-scroll"),document.body.style.cssText="top: 0",window.scroll({top:Y.scrollPosition})}};function G(e){return K.apply(this,arguments)}function K(){return(K=e(a)(e(s).mark((function t(r){var o,n,a,c,l,i,d,u,p,m,b,h,g,f;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return U&&(U.abort(),console.log("abort previous book fetch")),Y.disabledScroll(),document.addEventListener("keydown",(function(e){"Escape"===e.key&&W()}),{once:!0}),e.prev=3,U=new AbortController,e.next=7,J.getBookById(r,U);case 7:o=e.sent,n=o.data,a=n.author,c=n.book_image,l=n.description,i=n.title,d=n.buy_links,u=document.querySelector(".book-img-div"),p=document.querySelector("#name-book"),m=document.querySelector("#author"),b=document.querySelector("#description"),h=document.querySelector(".market_placers_list"),p.textContent=i,m.textContent=a,b.textContent=""===l?"No description":l,u.innerHTML='<img src="'.concat(c,'" alt="').concat(c,'" class="book-img-modal" loading="auto">'),h.innerHTML='<li class="marketplacer_li marketplacer_li_one">\n                                    <a href="'.concat(d[0].url,'" class="marketplacer_li_link link">\n                                        <svg id="amazon-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 15">\n                                            <path fill="var(--amazon-path1-color)" d="M38.42,21.708c-3.093,2.284-7.591,3.504-11.459,3.504-5.423,0-10.306-2.005-13.999-5.342-.29-.262-.03-.62.318-.416c3.986,2.32,8.915,3.715,14.005,3.715c3.434,0,7.211-.71,10.684-2.185.525-.223.963.343.45.724h.001Zm1.289-1.473c-.395-.507-2.613-.239-3.617-.121-.304.037-.35-.228-.077-.418c1.771-1.247,4.677-.887,5.017-.469s-.088,3.333-1.753,4.724c-.256.213-.499.1-.386-.183.373-.933,1.212-3.025.815-3.533h.001Z" transform="matrix(.9 0 0 0.9-4.692819-7.6908)"/>\n                                            <path fill="var(--amazon-path2-color)" d="M36.166,10.894c0,.181.14.304.314.304h2.829l-3.257,4.671c-.197.3-.199.636-.199.834v1.228c0,.176.197.381.386.278c1.845-.98,4.062-.884,5.732-.009.205.107.4-.1.4-.276v-1.293c-.021-.174-.075-.351-.288-.471-.947-.534-2.049-.69-3.094-.664L41.8,11.482c.259-.36.406-.588.409-.762v-1.037c0-.181-.14-.307-.314-.307h-5.425c-.003,0-.006,0-.009,0-.165,0-.299.134-.299.299c0,.003,0,.006,0,.008v1.212l.004-.001ZM16.361,18.451c.176,0,.318-.137.318-.307v-4.491c0-.98-.046-2.336,1.14-2.336c1.173,0,1.017,1.391,1.017,2.336l.002,4.491c0,.163.13.295.297.307h1.653c.176,0,.318-.137.318-.307v-4.491c0-.481-.017-1.195.153-1.623s.587-.694.987-.694c.478,0,.848.161.971.729.078.339.046,1.23.046,1.588v4.496c0,.163.137.295.297.307h1.653c.176,0,.318-.137.318-.307l.004-5.347c0-.908.107-1.943-.416-2.656-.462-.641-1.219-.926-1.91-.926-.973,0-1.88.499-2.28,1.57-.465-1.07-1.11-1.57-2.143-1.57-1.017,0-1.771.499-2.173,1.57h-.03v-1.107c-.012-.153-.14-.276-.3-.283h-1.539c-.176,0-.318.134-.318.304v8.471c.012.151.137.269.295.281h1.65l-.01-.005ZM46.878,9.227c2.449,0,3.775,2.103,3.775,4.778c0,2.584-1.465,4.634-3.775,4.634-2.4,0-3.715-2.103-3.715-4.724c0-2.637,1.326-4.693,3.715-4.693v.005Zm.014,1.723c-1.216,0-1.293,1.658-1.293,2.691s-.016,3.245,1.279,3.245c1.279,0,1.34-1.783,1.34-2.869c0-.715-.03-1.57-.245-2.247-.186-.59-.555-.82-1.079-.82h-.002Zm6.931,7.507c.177,0,.321-.137.323-.307v-4.562c0-.571.03-1.087.262-1.604.189-.408.558-.677.96-.677c1.14,0,1.033,1.356,1.033,2.283v4.601c.016.144.141.255.292.267h1.652c.162,0,.299-.117.318-.267v-5.333c0-.82,0-1.96-.427-2.637-.465-.732-1.18-.998-1.927-.998-1.14,0-1.788.553-2.25,1.711h-.03v-1.296c-.033-.132-.151-.23-.295-.237h-1.531c-.167,0-.304.121-.318.276l.002,8.474c0,.163.137.295.297.307h1.644l-.005-.001ZM31.835,14.403v-.357c-1.195,0-2.456.255-2.456,1.662c0,.713.372,1.196,1.005,1.196.462,0,.88-.286,1.142-.75.325-.577.309-1.107.309-1.75v-.001Zm1.664,4.024c-.109.098-.267.105-.389.039-.548-.455-.647-.667-.947-1.1-.906.924-1.548,1.2-2.721,1.2-1.39,0-2.47-.857-2.47-2.572c0-1.34.724-2.252,1.76-2.698.896-.395,2.147-.464,3.104-.573v-.213c0-.393.03-.857-.203-1.196-.199-.304-.585-.429-.926-.429-.629,0-1.189.323-1.326.992-.028.149-.137.295-.288.302l-1.6-.172c-.134-.03-.285-.139-.245-.347.367-1.941,2.123-2.526,3.691-2.526.803,0,1.853.213,2.486.821.803.75.726,1.75.726,2.839v2.572c0,.773.32,1.112.622,1.531.105.149.128.327-.007.439l-1.262,1.101-.002-.005-.003-.005ZM10.196,14.409v-.357c-1.193,0-2.453.255-2.453,1.662c0,.713.369,1.196,1.003,1.196.465,0,.88-.286,1.142-.75.325-.577.309-1.107.309-1.75l-.001-.001Zm1.664,4.023c-.109.098-.267.105-.389.039-.548-.455-.64-.667-.947-1.1-.906.924-1.547,1.2-2.721,1.2-1.388.001-2.469-.856-2.469-2.571c0-1.34.726-2.252,1.76-2.698.896-.395,2.147-.464,3.104-.573v-.213c0-.393.03-.857-.199-1.196-.203-.304-.587-.429-.926-.429-.629,0-1.191.323-1.333.992-.028.149-.137.295-.285.302l-1.602-.172c-.134-.03-.283-.139-.245-.347C5.977,9.725,7.731,9.14,9.299,9.14c.803,0,1.853.213,2.486.821.803.75.726,1.75.726,2.839v2.572c0,.773.32,1.112.622,1.531.107.149.13.327-.005.439l-1.259,1.094-.005-.005-.004.001Z" transform="matrix(.9 0 0 0.9-4.8006-8.2206)"/>\n                                        </svg>  \n                                    </a>\n                                </li>\n\n                                <li class="marketplacer_li marketplacer_li_two">\n                                    <a href="').concat(d[1].url,'" class="marketplacer_li_link link">\n                                        <svg id="apple-ibooks" xmlns="http://www.w3.org/2000/svg" x="0" y="0" version="1.1" viewBox="0 0 100 100" xml:space="preserve">\n                                            <g>\n                                                <linearGradient id="gradient-background" x1="-303.017" x2="-303.017" y1="748.267" y2="746.767" gradientTransform="matrix(60 0 0 -60 18231 44901)" gradientUnits="userSpaceOnUse">\n                                                    <stop offset="0" stop-color="#aaaaaa"></stop>\n                                                    <stop offset="1" stop-color="#909090"></stop>\n                                                </linearGradient>\n\n                                                <path fill="url(#gradient-background)" d="M63.6 5c9 0 13.6 0 18.4 1.5 5.3 1.9 9.5 6.1 11.4 11.4C95 22.8 95 27.3 95 36.4v27.2c0 9 0 13.6-1.5 18.4-1.9 5.3-6.1 9.5-11.4 11.4C77.2 95 72.7 95 63.6 95H36.4c-9 0-13.6 0-18.4-1.5-5.3-2-9.5-6.2-11.5-11.5C5 77.2 5 72.7 5 63.6V36.4c0-9 0-13.6 1.5-18.4 2-5.3 6.2-9.5 11.5-11.5C22.8 5 27.3 5 36.4 5h27.2z"></path>\n                                                <path fill="#fff" d="M20 32.8s2.9-7.5 14.6-7.5c11.6 0 14.7 9.8 14.7 9.8v42s-3.7-11.2-14.6-11.2c-7.9 0-13.5 5.1-13.5 5.1-.6.5-1.2.2-1.2-.6V32.8zm60 0v37.5c0 .8-.5 1.1-1.2.6 0 0-5.6-5.1-13.5-5.1C54.5 65.8 50.8 77 50.8 77V35s3-9.8 14.7-9.8c11.6 0 14.5 7.6 14.5 7.6z"></path>\n                                            </g>\n                                            </svg>\n                                    </a>\n                                </li>'),V.classList.toggle("is-hidden"),null!==(g=JSON.parse(localStorage.getItem("bookshelf_orderedbooks")))&&g.includes(r)?(D.classList.remove("is-hidden"),z.classList.remove("is-hidden")):Z.classList.remove("is-hidden"),e.next=27;break;case 24:e.prev=24,e.t0=e.catch(3),"ERR_CANCELED"!==e.t0.code&&(console.error(e.t0),f=document.querySelector(".book-modal-container").createElement("div"),P.after(f),f.classList.add("error-box"),f.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>');case 27:case"end":return e.stop()}}),t,null,[[3,24]])})))).apply(this,arguments)}function W(){Y.enabledScroll(),V.classList.add("is-hidden"),D.classList.add("is-hidden"),Z.classList.add("is-hidden"),z.classList.add("is-hidden")}function X(){return(X=e(a)(e(s).mark((function t(){var r,o,n,a,c,i;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(F&&(F.abort(),console.log("abort previous fetch")),e.prev=1,r=(0,l.getCookie)("accessToken")){e.next=5;break}throw new Error("Request failed with status code 401");case 5:return o=(0,l.createLoader)(V,"after"),F=new AbortController,e.next=9,J.addToShoppingList(r,M,F);case 9:n=e.sent.data,o.remove(),n&&(a=n.accessToken,c=n.shopping_list,(0,l.rewriteAccessToken)(a),Z.classList.add("is-hidden"),D.classList.remove("is-hidden"),z.classList.remove("is-hidden"),localStorage.setItem("bookshelf_orderedbooks",JSON.stringify(c)),(0,l.displayOrdredAmountInShoppingBag)(c)),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),"Request failed with status code 401"===e.t0.message?document.querySelector(".logo-link").click():(i=document.createElement("div"),V.append(i),i.classList.add("error-box"),i.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>');case 17:case"end":return e.stop()}}),t,null,[[1,14]])})))).apply(this,arguments)}function Q(){return(Q=e(a)(e(s).mark((function t(){var r,o,n,a,c,i;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(F&&(F.abort(),console.log("abort previous fetch")),e.prev=1,r=(0,l.getCookie)("accessToken")){e.next=5;break}throw new Error("Request failed with status code 401");case 5:return o=(0,l.createLoader)(V,"after"),F=new AbortController,e.next=9,J.removeFromShoppingList(r,M,F);case 9:n=e.sent.data,o.remove(),n&&(a=n.accessToken,c=n.shopping_list,console.log("shoppingList=",c),(0,l.rewriteAccessToken)(a),Z.classList.remove("is-hidden"),D.classList.add("is-hidden"),z.classList.add("is-hidden"),localStorage.setItem("bookshelf_orderedbooks",JSON.stringify(c)),(0,l.displayOrdredAmountInShoppingBag)(c)),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),"Request failed with status code 401"===e.t0.message?document.querySelector(".logo-link").click():(i=document.createElement("div"),V.append(i),i.classList.add("error-box"),i.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>');case 17:case"end":return e.stop()}}),t,null,[[1,14]])})))).apply(this,arguments)}I.addEventListener("click",(function(e){var t=e.target;t.classList.contains("img-book")||t.classList.contains("owerlay")?G(M=t.parentElement.parentElement.dataset.id):t.classList.contains("owerlay-content")?G(M=t.parentElement.parentElement.parentElement.dataset.id):(t.classList.contains("title-book")||t.classList.contains("author"))&&G(M=t.parentElement.dataset.id)})),P.addEventListener("click",W),Z.addEventListener("click",(function(){return X.apply(this,arguments)})),D.addEventListener("click",(function(){return Q.apply(this,arguments)})),n("9haEe"),n("d474f");var $=document.querySelector(".js-nav-homelink"),ee=document.querySelector(".js-mobile-nav-homelink");$.classList.toggle("selected"),ee.classList.toggle("mobile-selected")}();
//# sourceMappingURL=index.2f888cc5.js.map
