!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},o=t.parcelRequire3984;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},t.parcelRequire3984=o),o("iE7OH").register(JSON.parse('{"EVgbq":"index.460678c6.js","jOOjU":"empty-img-mobile@1x.8fbd5955.jpg","el80q":"empty-img-mobile@2x.2ea00d8f.jpg","4OiJh":"empty-img-mobile@3x.424036b7.jpg","u4nho":"empty-img-tablet@1x.90771ee2.jpg","1LSgB":"empty-img-tablet@2x.5b6d4ccf.jpg","8BF0x":"empty-img-tablet@3x.9e70b472.jpg","bBc9N":"empty-img-desktop@1x.799f71fc.jpg","9Ru3k":"empty-img-desktop@2x.2ff1170a.jpg","gKD3b":"empty-img-desktop@3x.5d43da0f.jpg","hE6Rv":"index.7d672799.js"}')),o("i8Q71"),o("ILISp"),o("aEag2");var a,c=o("bpxeT"),s=o("2TvXO"),i=o("dNYR7"),l=o("fPiI6");a=o("aNJCr").getBundleURL("EVgbq")+o("iE7OH").resolve("jOOjU");var d;d=o("aNJCr").getBundleURL("EVgbq")+o("iE7OH").resolve("el80q");var u;u=o("aNJCr").getBundleURL("EVgbq")+o("iE7OH").resolve("4OiJh");var p;p=o("aNJCr").getBundleURL("EVgbq")+o("iE7OH").resolve("u4nho");var m;m=o("aNJCr").getBundleURL("EVgbq")+o("iE7OH").resolve("1LSgB");var b;b=o("aNJCr").getBundleURL("EVgbq")+o("iE7OH").resolve("8BF0x");var h;h=o("aNJCr").getBundleURL("EVgbq")+o("iE7OH").resolve("bBc9N");var g;g=o("aNJCr").getBundleURL("EVgbq")+o("iE7OH").resolve("9Ru3k");var v;v=o("aNJCr").getBundleURL("EVgbq")+o("iE7OH").resolve("gKD3b");var f=new(0,i.bookshelf_API),k=document.querySelector(".category-list-box");k.addEventListener("click",O);var x,y,L,E,w,S=document.querySelector(".books-box"),_=document.querySelector(".btn-up-scroll"),H=document.querySelector("body"),q=!1,C=!1,R=!0,T=document.documentElement.scrollWidth;function B(){return(B=e(c)(e(s).mark((function t(){var r;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(0,l.scrollUp)(),(y=document.createElement("h3")).textContent="All categories",y.classList.add("category-list-item","active"),y.setAttribute("id","all-categories-item"),k.prepend(y),y.click(),e.next=9,M();case 9:r=e.sent,q=!0,C&&q&&w.remove(),r.length&&(x=document.createElement("ul"),y.after(x),x.classList.add("category-list"),x.innerHTML=Z(r),k.classList.add("category-list-box-not-empty"));case 13:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function O(e){return A.apply(this,arguments)}function A(){return(A=e(c)(e(s).mark((function t(r){var n,o,a,c,i,d,u,p;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.target,L&&(L.abort(),console.log("abort previous books fetch")),n.classList.contains("category-list-item")||n.classList.contains("js-btn-more")){e.next=4;break}return e.abrupt("return");case 4:if((0,l.changeActiveItem)(y,x,n),o=n.id.split(" ").join("%20"),S.innerHTML="",a=(0,l.createBooksBoxTitle)(S,""),R||((0,l.scrollToBoxTop)(S),w=(0,l.createLoader)(a,"after",["loader-box-trans"])),"all-categories-item"!==o){e.next=19;break}return a.innerText="Best Sellers Books",L=new AbortController,e.next=14,F(L);case 14:c=e.sent,C=!0,c.length&&((i=document.createElement("ul")).classList.add("list","best-books-list"),a.after(i),i.addEventListener("click",N),i.innerHTML=D(c,E),R?R=!1:(0,l.scrollToBoxTop)(S)),e.next=25;break;case 19:return a.innerText=n.id,L=new AbortController,e.next=23,I(o,L);case 23:(d=e.sent).length&&(u=document.createElement("ul"),a.after(u),u.classList.add("list","category-books-list"),p=document.documentElement.scrollWidth,u.innerHTML=z(d,p<768?1:p<1440&&p>=768?3:5),(0,l.scrollToBoxTop)(S));case 25:C&&q&&w.remove();case 26:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function N(e){return j.apply(this,arguments)}function j(){return(j=e(c)(e(s).mark((function t(r){return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),r.target.classList.contains("js-btn-more")){e.next=4;break}return e.abrupt("return");case 4:O(r);case 5:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function M(){return U.apply(this,arguments)}function U(){return(U=e(c)(e(s).mark((function t(){var r,n;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.getBookCategories();case 3:if((r=e.sent.data).length){e.next=6;break}return e.abrupt("return",Notify.failure("Can't find list of categories on the server. Please reload the page!"));case 6:return e.abrupt("return",r);case 9:return e.prev=9,e.t0=e.catch(0),"ERR_CANCELED"!==e.t0.code&&(console.error(e.t0),n=document.createElement("div"),y.after(n),n.classList.add("error-box"),n.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'),e.abrupt("return",[]);case 13:case"end":return e.stop()}}),t,null,[[0,9]])})))).apply(this,arguments)}function F(e){return J.apply(this,arguments)}function J(){return(J=e(c)(e(s).mark((function t(r){var n,o;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.getTopBooks(E,r);case 3:if((n=e.sent.data).length){e.next=6;break}return e.abrupt("return",Notify.failure("Can't find best sellers books on the server. Please reload the page!"));case 6:return e.abrupt("return",n);case 9:return e.prev=9,e.t0=e.catch(0),"ERR_CANCELED"!==e.t0.code&&(console.error(e.t0),o=document.createElement("div"),S.append(o),o.classList.add("error-box"),o.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'),e.abrupt("return",[]);case 13:case"end":return e.stop()}}),t,null,[[0,9]])})))).apply(this,arguments)}function I(e,t){return V.apply(this,arguments)}function V(){return(V=e(c)(e(s).mark((function t(r,n){var o,a;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.getBooksOfCategory(E,r,n);case 3:if((o=e.sent.data).length){e.next=6;break}return e.abrupt("return",Notify.failure("Can't find books of category <"+r+"> on the server. Please reload the page!"));case 6:return e.abrupt("return",o);case 9:return e.prev=9,e.t0=e.catch(0),"ERR_CANCELED"!==e.t0.code&&(console.error(e.t0),a=document.createElement("div"),S.append(a),a.classList.add("error-box"),a.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'),e.abrupt("return",[]);case 13:case"end":return e.stop()}}),t,null,[[0,9]])})))).apply(this,arguments)}function Z(e){var t="";return e.forEach((function(e){var r='  <li id="'.concat(e,'" class="category-list-item"> \n                                       ').concat(e,"\n                                    </li> ");t+=r})),t}function D(t,r){return t.map((function(t){var n=t.category,o=t.books,c='<p class="theme-book">'.concat(n,"</p>");if(o.length){var s=o.splice(0,r).map((function(t){var r=t._id,n=t.book_image,o=t.title,c=t.author;return'<li class="item-book" data-id="'.concat(r,'">\n                    <div class="img-owerlay">\n\n                        ').concat(n?'<img src="'.concat(n,'" alt="').concat(o,'" class="img-book" loading="auto">'):'<picture>\n                                            <source\n                                                srcset="'.concat(e(a)," 1x, ").concat(e(d)," 2x, ").concat(e(u),' 3x "\n                                                media="(max-width: 767.9px)"\n                                                >\n                                            <source\n                                                srcset="').concat(e(p)," 1x, ").concat(e(m)," 2x, ").concat(e(b),' 3x "\n                                                media="(min-width: 768px) and (max-width: 1439.8px)"\n                                                >\n                                            <source\n                                                srcset="').concat(e(h)," 1x, ").concat(e(g)," 2x, ").concat(e(v),' 3x "\n                                                media="(min-width: 1440px)"\n                                                >\n                                            <img \n                                                src=').concat(e(v),"\n                                                alt= ").concat(o,'\n                                                class="img-book \n                                                loading="auto"\n                                                >\n                                        </picture>'),'\n                        \n                        <div class="owerlay">\n                            <p class="owerlay-content">quick view</p>\n                        </div>\n\n                    </div>\n                    <p class="title-book">').concat((0,l.shortTitle)(o,17),'</p>\n                    <p class="title-author">').concat((0,l.shortTitle)(c,34),"</p>\n                </li>")})).join("");return'<li class="best-book-container">'.concat(c,'\n                            <ul class="list-books">').concat(s,'</ul>\n                            <button type="button" class="button-more js-btn-more" id="').concat(n,'">See more</button>\n                        </li>')}return'<li class="off-books best-book-container">'.concat(n,'\n                            <p class="off-books-text">Sorry, there are no books in this category, please choose another category</p>\n                        </li>')})).join("")}function z(e,t){return e.length?e.map((function(e){var t=e._id,r=e.book_image,n=e.author,o=e.title;return'<li class="item-book" data-id="'.concat(t,'">  \n                <div class="img-owerlay">\n                \n                    <img src="').concat(r,'" alt="').concat(o,'" class="img-book loading="auto"">\n                    <div class="owerlay">\n                        <p class="owerlay-content">quick view</p>\n                    </div>\n                </div>\n                <p class="title-book">').concat((0,l.shortTitle)(o,17),'</p>\n                <p class="title-author">').concat((0,l.shortTitle)(n,34),"</p>\n            </li>")})).join(""):'<liv class="off-books">\n                            <p class="off-books-text">Sorry, there are no books in this category, please choose another category</p>\n                        </li>'}E=T<768?1:T<1440&&T>=768?3:5,_.addEventListener("click",(function(){(0,l.scrollUp)(),_.classList.add("is-hidden-btn")})),window.addEventListener("scroll",(function(){(0,l.scrollTracker)(_)})),C||q||(w=(0,l.createLoader)(H,"into",[])),function(){B.apply(this,arguments)}(),o("cIzEt"),o("4up2U"),o("9MDAN");c=o("bpxeT"),s=o("2TvXO"),i=o("dNYR7"),l=o("fPiI6");var P,G,K,W=new(0,i.bookshelf_API),X=document.querySelector(".books-box"),Y=document.querySelector(".book-modal-backdrop"),Q=document.querySelector(".book-modal-container"),$=document.querySelector(".btn-modal-close"),ee=document.querySelector(".add"),te=document.querySelector(".remove"),re=document.querySelector(".modal-message");function ne(e){return oe.apply(this,arguments)}function oe(){return(oe=e(c)(e(s).mark((function t(r){var n,o,a,c,i,d,u,p,m,b,h,g,v,f;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return G&&(G.abort(),console.log("abort previous book fetch")),l.objScroll.disabledScroll(),document.addEventListener("keydown",(function(e){"Escape"===e.key&&ae()}),{once:!0}),e.prev=3,G=new AbortController,e.next=7,W.getBookById(r,G);case 7:n=e.sent,o=n.data,a=o.author,c=o.book_image,i=o.description,d=o.title,u=o.buy_links,p=document.querySelector(".book-img-div"),m=document.querySelector("#name-book"),b=document.querySelector("#author"),h=document.querySelector("#description"),g=document.querySelector(".market_placers_list"),m.textContent=d,b.textContent=a,h.textContent=""===i?"No description":i,p.innerHTML='<img src="'.concat(c,'" alt="').concat(c,'" class="book-img-modal" loading="auto">'),g.innerHTML='<li class="marketplacer_li marketplacer_li_one">\n                                    <a href="'.concat(u[0].url,'" class="marketplacer_li_link link" target="_blank">\n                                        <svg id="amazon-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 15">\n                                            <path fill="var(--amazon-path1-color)" d="M38.42,21.708c-3.093,2.284-7.591,3.504-11.459,3.504-5.423,0-10.306-2.005-13.999-5.342-.29-.262-.03-.62.318-.416c3.986,2.32,8.915,3.715,14.005,3.715c3.434,0,7.211-.71,10.684-2.185.525-.223.963.343.45.724h.001Zm1.289-1.473c-.395-.507-2.613-.239-3.617-.121-.304.037-.35-.228-.077-.418c1.771-1.247,4.677-.887,5.017-.469s-.088,3.333-1.753,4.724c-.256.213-.499.1-.386-.183.373-.933,1.212-3.025.815-3.533h.001Z" transform="matrix(.9 0 0 0.9-4.692819-7.6908)"/>\n                                            <path fill="var(--amazon-path2-color)" d="M36.166,10.894c0,.181.14.304.314.304h2.829l-3.257,4.671c-.197.3-.199.636-.199.834v1.228c0,.176.197.381.386.278c1.845-.98,4.062-.884,5.732-.009.205.107.4-.1.4-.276v-1.293c-.021-.174-.075-.351-.288-.471-.947-.534-2.049-.69-3.094-.664L41.8,11.482c.259-.36.406-.588.409-.762v-1.037c0-.181-.14-.307-.314-.307h-5.425c-.003,0-.006,0-.009,0-.165,0-.299.134-.299.299c0,.003,0,.006,0,.008v1.212l.004-.001ZM16.361,18.451c.176,0,.318-.137.318-.307v-4.491c0-.98-.046-2.336,1.14-2.336c1.173,0,1.017,1.391,1.017,2.336l.002,4.491c0,.163.13.295.297.307h1.653c.176,0,.318-.137.318-.307v-4.491c0-.481-.017-1.195.153-1.623s.587-.694.987-.694c.478,0,.848.161.971.729.078.339.046,1.23.046,1.588v4.496c0,.163.137.295.297.307h1.653c.176,0,.318-.137.318-.307l.004-5.347c0-.908.107-1.943-.416-2.656-.462-.641-1.219-.926-1.91-.926-.973,0-1.88.499-2.28,1.57-.465-1.07-1.11-1.57-2.143-1.57-1.017,0-1.771.499-2.173,1.57h-.03v-1.107c-.012-.153-.14-.276-.3-.283h-1.539c-.176,0-.318.134-.318.304v8.471c.012.151.137.269.295.281h1.65l-.01-.005ZM46.878,9.227c2.449,0,3.775,2.103,3.775,4.778c0,2.584-1.465,4.634-3.775,4.634-2.4,0-3.715-2.103-3.715-4.724c0-2.637,1.326-4.693,3.715-4.693v.005Zm.014,1.723c-1.216,0-1.293,1.658-1.293,2.691s-.016,3.245,1.279,3.245c1.279,0,1.34-1.783,1.34-2.869c0-.715-.03-1.57-.245-2.247-.186-.59-.555-.82-1.079-.82h-.002Zm6.931,7.507c.177,0,.321-.137.323-.307v-4.562c0-.571.03-1.087.262-1.604.189-.408.558-.677.96-.677c1.14,0,1.033,1.356,1.033,2.283v4.601c.016.144.141.255.292.267h1.652c.162,0,.299-.117.318-.267v-5.333c0-.82,0-1.96-.427-2.637-.465-.732-1.18-.998-1.927-.998-1.14,0-1.788.553-2.25,1.711h-.03v-1.296c-.033-.132-.151-.23-.295-.237h-1.531c-.167,0-.304.121-.318.276l.002,8.474c0,.163.137.295.297.307h1.644l-.005-.001ZM31.835,14.403v-.357c-1.195,0-2.456.255-2.456,1.662c0,.713.372,1.196,1.005,1.196.462,0,.88-.286,1.142-.75.325-.577.309-1.107.309-1.75v-.001Zm1.664,4.024c-.109.098-.267.105-.389.039-.548-.455-.647-.667-.947-1.1-.906.924-1.548,1.2-2.721,1.2-1.39,0-2.47-.857-2.47-2.572c0-1.34.724-2.252,1.76-2.698.896-.395,2.147-.464,3.104-.573v-.213c0-.393.03-.857-.203-1.196-.199-.304-.585-.429-.926-.429-.629,0-1.189.323-1.326.992-.028.149-.137.295-.288.302l-1.6-.172c-.134-.03-.285-.139-.245-.347.367-1.941,2.123-2.526,3.691-2.526.803,0,1.853.213,2.486.821.803.75.726,1.75.726,2.839v2.572c0,.773.32,1.112.622,1.531.105.149.128.327-.007.439l-1.262,1.101-.002-.005-.003-.005ZM10.196,14.409v-.357c-1.193,0-2.453.255-2.453,1.662c0,.713.369,1.196,1.003,1.196.465,0,.88-.286,1.142-.75.325-.577.309-1.107.309-1.75l-.001-.001Zm1.664,4.023c-.109.098-.267.105-.389.039-.548-.455-.64-.667-.947-1.1-.906.924-1.547,1.2-2.721,1.2-1.388.001-2.469-.856-2.469-2.571c0-1.34.726-2.252,1.76-2.698.896-.395,2.147-.464,3.104-.573v-.213c0-.393.03-.857-.199-1.196-.203-.304-.587-.429-.926-.429-.629,0-1.191.323-1.333.992-.028.149-.137.295-.285.302l-1.602-.172c-.134-.03-.283-.139-.245-.347C5.977,9.725,7.731,9.14,9.299,9.14c.803,0,1.853.213,2.486.821.803.75.726,1.75.726,2.839v2.572c0,.773.32,1.112.622,1.531.107.149.13.327-.005.439l-1.259,1.094-.005-.005-.004.001Z" transform="matrix(.9 0 0 0.9-4.8006-8.2206)"/>\n                                        </svg>  \n                                    </a>\n                                </li>\n\n                                <li class="marketplacer_li marketplacer_li_two">\n                                    <a href="').concat(u[1].url,'" class="marketplacer_li_link link">\n                                        <svg id="apple-ibooks" xmlns="http://www.w3.org/2000/svg" x="0" y="0" version="1.1" viewBox="0 0 100 100" xml:space="preserve">\n                                            <g>\n                                                <linearGradient id="gradient-background" x1="-303.017" x2="-303.017" y1="748.267" y2="746.767" gradientTransform="matrix(60 0 0 -60 18231 44901)" gradientUnits="userSpaceOnUse">\n                                                    <stop offset="0" stop-color="#aaaaaa"></stop>\n                                                    <stop offset="1" stop-color="#909090"></stop>\n                                                </linearGradient>\n\n                                                <path fill="url(#gradient-background)" d="M63.6 5c9 0 13.6 0 18.4 1.5 5.3 1.9 9.5 6.1 11.4 11.4C95 22.8 95 27.3 95 36.4v27.2c0 9 0 13.6-1.5 18.4-1.9 5.3-6.1 9.5-11.4 11.4C77.2 95 72.7 95 63.6 95H36.4c-9 0-13.6 0-18.4-1.5-5.3-2-9.5-6.2-11.5-11.5C5 77.2 5 72.7 5 63.6V36.4c0-9 0-13.6 1.5-18.4 2-5.3 6.2-9.5 11.5-11.5C22.8 5 27.3 5 36.4 5h27.2z"></path>\n                                                <path fill="#fff" d="M20 32.8s2.9-7.5 14.6-7.5c11.6 0 14.7 9.8 14.7 9.8v42s-3.7-11.2-14.6-11.2c-7.9 0-13.5 5.1-13.5 5.1-.6.5-1.2.2-1.2-.6V32.8zm60 0v37.5c0 .8-.5 1.1-1.2.6 0 0-5.6-5.1-13.5-5.1C54.5 65.8 50.8 77 50.8 77V35s3-9.8 14.7-9.8c11.6 0 14.5 7.6 14.5 7.6z"></path>\n                                            </g>\n                                            </svg>\n                                    </a>\n                                </li>'),Y.classList.toggle("is-hidden"),null!==(v=JSON.parse(localStorage.getItem("bookshelf_orderedbooks")))&&v.includes(r)?(te.classList.remove("is-hidden"),re.classList.remove("is-hidden")):ee.classList.remove("is-hidden"),e.next=27;break;case 24:e.prev=24,e.t0=e.catch(3),"ERR_CANCELED"!==e.t0.code&&(console.error(e.t0),f=document.querySelector(".book-modal-container").createElement("div"),$.after(f),f.classList.add("error-box"),f.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>');case 27:case"end":return e.stop()}}),t,null,[[3,24]])})))).apply(this,arguments)}function ae(){l.objScroll.enabledScroll(),Y.classList.add("is-hidden"),te.classList.add("is-hidden"),ee.classList.add("is-hidden"),re.classList.add("is-hidden")}function ce(){return(ce=e(c)(e(s).mark((function t(){var r,n,o,a;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return K&&(K.abort(),console.log("abort previous fetch")),e.prev=1,r=(0,l.createLoader)(Q,"into",["loader-modal"]),K=new AbortController,e.next=6,W.addToShoppingList(P,K);case 6:n=e.sent,r.remove(),n&&(o=n.shopping_list,ee.classList.add("is-hidden"),te.classList.remove("is-hidden"),re.classList.remove("is-hidden"),localStorage.setItem("bookshelf_orderedbooks",JSON.stringify(o)),(0,l.displayOrdredAmountInShoppingBag)(o)),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),"Request failed with status code 401"===e.t0.message?document.querySelector(".logo-link").click():(a=document.createElement("div"),Y.append(a),a.classList.add("error-box"),a.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>');case 14:case"end":return e.stop()}}),t,null,[[1,11]])})))).apply(this,arguments)}function se(){return(se=e(c)(e(s).mark((function t(){var r,n,o,a,c;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(K&&(K.abort(),console.log("abort previous fetch")),e.prev=1,r=(0,l.getCookie)("accessToken")){e.next=5;break}throw new Error("Request failed with status code 401");case 5:return n=(0,l.createLoader)(Q,"into"),K=new AbortController,e.next=9,W.removeFromShoppingList(r,P,K);case 9:o=e.sent.data,n.remove(),o&&(a=o.shopping_list,ee.classList.remove("is-hidden"),te.classList.add("is-hidden"),re.classList.add("is-hidden"),localStorage.setItem("bookshelf_orderedbooks",JSON.stringify(a)),(0,l.displayOrdredAmountInShoppingBag)(a)),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),"Request failed with status code 401"===e.t0.message?document.querySelector(".logo-link").click():(c=document.createElement("div"),Y.append(c),c.classList.add("error-box"),c.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>');case 17:case"end":return e.stop()}}),t,null,[[1,14]])})))).apply(this,arguments)}$.addEventListener("click",ae),ee.addEventListener("click",(function(){return ce.apply(this,arguments)})),X.addEventListener("click",(function(e){var t=e.target;t.classList.contains("owerlay")?ne(P=t.parentElement.parentElement.dataset.id):t.classList.contains("owerlay-content")?ne(P=t.parentElement.parentElement.parentElement.dataset.id):(t.classList.contains("title-book")||t.classList.contains("author"))&&ne(P=t.parentElement.dataset.id)})),te.addEventListener("click",(function(){return se.apply(this,arguments)})),o("9haEe"),o("d474f");var ie=document.querySelector(".js-nav-homelink"),le=document.querySelector(".js-mobile-nav-homelink");ie.classList.toggle("selected"),le.classList.toggle("mobile-selected")}();
//# sourceMappingURL=index.460678c6.js.map
