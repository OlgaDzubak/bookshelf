!function(){function t(t,e,n,s){Object.defineProperty(t,e,{get:n,set:s,enumerable:!0,configurable:!0})}function e(t){return t&&t.__esModule?t.default:t}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s={},r={},l=n.parcelRequire3984;null==l&&((l=function(t){if(t in s)return s[t].exports;if(t in r){var e=r[t];delete r[t];var n={id:t,exports:{}};return s[t]=n,e.call(n.exports,n,n.exports),n.exports}var l=new Error("Cannot find module '"+t+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(t,e){r[t]=e},n.parcelRequire3984=l),l.register("iE7OH",(function(e,n){var s,r;t(e.exports,"register",(function(){return s}),(function(t){return s=t})),t(e.exports,"resolve",(function(){return r}),(function(t){return r=t}));var l={};s=function(t){for(var e=Object.keys(t),n=0;n<e.length;n++)l[e[n]]=t[e[n]]},r=function(t){var e=l[t];if(null==e)throw new Error("Could not resolve bundle with id "+t);return e}})),l.register("aNJCr",(function(e,n){var s;t(e.exports,"getBundleURL",(function(){return s}),(function(t){return s=t}));var r={};function l(t){return(""+t).replace(/^((?:https?|file|ftp|(chrome|moz)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}s=function(t){var e=r[t];return e||(e=function(){try{throw new Error}catch(e){var t=(""+e.stack).match(/(https?|file|ftp|(chrome|moz)-extension):\/\/[^)\n]+/g);if(t)return l(t[2])}return"/"}(),r[t]=e),e}})),l("iE7OH").register(JSON.parse('{"7HtH9":"shopping_list_page.1336940c.js","4HGdI":"trash-03.deb29b96.png","d1EaE":"stack_of_books_mobile@1x.76e2e048.png","536hg":"stack_of_books_mobile@2x.64a22462.png","12bmG":"stack_of_books_tablet@1x.76e2e048.png","93kMU":"stack_of_books_tablet@2x.64a22462.png","a5zSz":"stack_of_books_desktop@1x.76e2e048.png","fuZb4":"stack_of_books_desktop@2x.64a22462.png","hE6Rv":"index.649bc35f.js"}')),l("ILISp"),l("i8Q71");var o=l("8nrFW"),a=l("dNYR7");o=l("8nrFW");function c(t,n){if(t&&n>0){var s=t.querySelectorAll(".number-btn"),r=e(o)(s).filter((function(t){return!t.classList.contains("visually-hidden")})),l=r.length,i=t.querySelector(".left-double-arrow-btn"),a=t.querySelector(".left-arrow-btn"),c=t.querySelector(".right-double-arrow-btn"),d=t.querySelector(".right-arrow-btn"),u=t.querySelector(".left-three-dots-btn"),v=t.querySelector(".right-three-dots-btn"),b=!0,f=!1,g=void 0;try{for(var h,p=s[Symbol.iterator]();!(b=(h=p.next()).done);b=!0){var m=h.value;Number(m.textContent)===n?(m.classList.add("active"),m.classList.contains("visually-hidden")&&(m.textContent<=r[0].textContent?(r[l-1].setAttribute("disabled",""),r[l-1].classList.add("visually-hidden"),v.removeAttribute("disabled",""),v.classList.remove("visually-hidden")):(r[0].setAttribute("disabled",""),r[0].classList.add("visually-hidden"),u.removeAttribute("disabled",""),u.classList.remove("visually-hidden"),Number(m.textContent)===s.length&&(v.setAttribute("disabled",""),v.classList.add("visually-hidden"))),m.removeAttribute("disabled",""),m.classList.remove("visually-hidden"))):m.classList.remove("active")}}catch(t){f=!0,g=t}finally{try{b||null==p.return||p.return()}finally{if(f)throw g}}r=e(o)(s).filter((function(t){return!t.classList.contains("visually-hidden")})),1===n?a.setAttribute("disabled",""):a.removeAttribute("disabled",""),n===s.length?d.setAttribute("disabled",""):d.removeAttribute("disabled",""),Number(r[l-1].textContent)===s.length?(c.setAttribute("disabled",""),v.setAttribute("disabled",""),v.classList.add("visually-hidden")):(c.removeAttribute("disabled",""),v.removeAttribute("disabled",""),v.classList.remove("visually-hidden")),Number(r[l-1].textContent)-l<1?(i.setAttribute("disabled",""),u.setAttribute("disabled",""),u.classList.add("visually-hidden")):(i.removeAttribute("disabled",""),u.removeAttribute("disabled",""),u.classList.remove("visually-hidden"))}return n}function d(t,n){var s=t.querySelectorAll(".number-btn"),r=e(o)(s).filter((function(t){return!t.classList.contains("visually-hidden")})),l=Number(r[0].textContent),a=r.findIndex((function(t){return t.classList.contains("active")})),d=Number(r[a].textContent);if(n)if(l-n>=1){for(i=l-1;i>=l-n;i--)d=c(t,i);d=c(t,l-1)}else for(i=l-1;i>=1;i--)d=c(t,i);return d}function u(t,n){var s=t.querySelectorAll(".number-btn"),r=e(o)(s).filter((function(t){return!t.classList.contains("visually-hidden")})),l=r.findIndex((function(t){return t.classList.contains("active")})),a=Number(r[l].textContent),d=r.length,u=Number(r[d-1].textContent),v=Number(s[s.length-1].textContent),b=a;if(n)if(v-u>=n){for(i=u;i<=u+n;i++)b=c(t,i);b=c(t,u+1)}else for(i=u;i<=v;i++)b=c(t,i);return b}function v(t){var n=document.querySelectorAll(".number-btn"),s=e(o)(n).filter((function(t){return!t.classList.contains("visually-hidden")})),r=s.findIndex((function(t){return t.classList.contains("active")})),l=s.length,i=s[0].textContent-l>1?s[0].textContent-l:1,a=i+(l-1);return n.forEach((function(t){t.textContent>=i&&t.textContent<=a?t.classList.remove("visually-hidden"):(t.classList.add("visually-hidden"),t.classList.contains("active")&&t.classList.remove("active"))})),c(t,i+r)}function b(t){var n=document.querySelectorAll(".number-btn"),s=e(o)(n).filter((function(t){return!t.classList.contains("visually-hidden")})),r=s.findIndex((function(t){return t.classList.contains("active")})),l=s.length,i=Number(s[l-1].textContent)+l<n.length?Number(s[l-1].textContent)+1:n.length-(l-1),a=i+(l-1);return n.forEach((function(t){t.textContent>=i&&t.textContent<=a?t.classList.remove("visually-hidden"):(t.classList.add("visually-hidden"),t.classList.contains("active")&&t.classList.remove("active"))})),c(t,i+r)}function f(t){var n=t.querySelectorAll(".number-btn"),s=Number(t.querySelector(".number-btn.active").textContent),r=n.length,l=0;if(n){var i=n[r-1],a=Number(i.textContent);return i.classList.contains("visually-hidden")||(l=e(o)(n).findIndex((function(t){return!t.classList.contains("visually-hidden")}))),i.remove(),l>=1&&n[l-1].classList.remove("visually-hidden"),c(t,r>1&&s===a?Number(n[r-2].textContent):s)}return 0}var g;g=l("aNJCr").getBundleURL("7HtH9")+l("iE7OH").resolve("4HGdI");var h;h=l("aNJCr").getBundleURL("7HtH9")+l("iE7OH").resolve("d1EaE");var p;p=l("aNJCr").getBundleURL("7HtH9")+l("iE7OH").resolve("536hg");var m;m=l("aNJCr").getBundleURL("7HtH9")+l("iE7OH").resolve("12bmG");var x;x=l("aNJCr").getBundleURL("7HtH9")+l("iE7OH").resolve("93kMU");var w;w=l("aNJCr").getBundleURL("7HtH9")+l("iE7OH").resolve("a5zSz");var L;L=l("aNJCr").getBundleURL("7HtH9")+l("iE7OH").resolve("fuZb4");var y,k,_,H,C,E=l("fPiI6"),A=new(0,a.bookshelf_API),S=[{img:e(g)}],M=document.querySelector(".shopping-wrapper"),N=(0,E.createBooksBoxTitle)(M,"Shopping List"),O=[],R=1,B=document.documentElement.scrollWidth;B<768?H=2:B>=768&&(H=3);var T,q,Z,I,U,z,F=localStorage.getItem("bookshelf_orderedbooks");if(F){var J=JSON.parse(F);if(J.length>0){C&&(C.abort(),console.log("abort previous fetch"));try{var j=(0,E.createLoader)(N),G=[];J.map((function(t){C=new AbortController;var e=A.getBookById(t,C).data;e&&G.push(e),console.log(G)})),j.remove(),G.length&&((k=document.createElement("ul")).classList.add("list","shopping_booklist"),N.after(k),k.addEventListener("click",(function(t){var n=t.target;if(n.classList.contains("bucket-btn")){var s=document.querySelectorAll(".bucket-btn");s.forEach((function(t){return t.setAttribute("disabled","")}));var r=J.indexOf(n.dataset.id);J.splice(r,1),O=O.filter((function(t){return t._id!=n.dataset.id})),localStorage.removeItem(LOCALSTORAGE_KEY),localStorage.setItem(LOCALSTORAGE_KEY,JSON.stringify(J)),k.children[r].classList.add("shift-right");var l=r-3*Math.trunc(r/3),i=600;setTimeout((function(){if(r+1<k.children.length)for(var t=r+1,e=r+(2-l)>=k.children.length-1?k.children.length-1:r+(2-l),n=t;n<=e;n++){k.children[n].classList.add("shift-up")}}),i),setTimeout((function(){if(k.children[r].remove(),(0,E.displayOrdredAmountInShoppingBag)(J),s.forEach((function(t){return t.removeAttribute("disabled")})),0===k.children.length)W();else{e(o)(k.children).forEach((function(t){t.classList.remove("shift-right"),t.classList.remove("shift-up")}));var t=e(o)(k.children).findIndex((function(t,e){return e>r-1&&t.classList.contains("non-active")}));-1!=t&&k.children[t].classList.remove("non-active"),Math.ceil(O.length/3)<_&&(R=f(y),(_-=1)<2&&y.remove()),k.innerHTML=V(O,R,3)}}),2*i)}})),k.innerHTML=V(G,1,3),(_=Math.ceil(G.length/3))>1&&(T=G.length,q=3,Z=H,I="shopping_booklist_pagination",U=Math.ceil(T/q),(z=document.createElement("div")).classList.add(I),z.innerHTML=function(t,e){var n="";n='<button type="button" class="pgn-btn left-double-arrow-btn">\n                        <svg class="left-double-arrow-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 13 13">\n                            <path class="left-double-arrow-svg path" fill="var(--pgn-fill-color)" d="M9.71589,11.6509c-.08592-.0852-.15412-.1866-.20065-.2983s-.0705-.2316-.0705-.3526.02396-.2408.0705-.3525.11473-.2131.20065-.2983L13.9234,6.15086c.0859-.08522.1541-.1866.2006-.29831s.0705-.23152.0705-.35253-.0239-.24082-.0705-.35253-.1147-.21309-.2006-.2983c-.1718-.17073-.4041-.26656-.6463-.26656s-.4745.09583-.6462.26656L8.42339,9.05669C7.9084,9.57232,7.61914,10.2713,7.61914,11s.28926,1.4277.80425,1.9434l4.20751,4.2075c.1707.1693.4012.2648.6417.2658.1206.0007.2402-.0224.3519-.068s.2132-.1129.2989-.1978c.0859-.0852.1541-.1866.2006-.2983s.0705-.2315.0705-.3526-.0239-.2408-.0705-.3525-.1147-.2131-.2006-.2983L9.71589,11.6509Z" transform="translate(-7.40682-4.499673)"/>\n                            <path class="left-double-arrow-svg path" fill="var(--pgn-fill-color)" d="M9.71589,11.6509c-.08592-.0852-.15412-.1866-.20065-.2983s-.0705-.2316-.0705-.3526.02396-.2408.0705-.3525.11473-.2131.20065-.2983L13.9234,6.15086c.0859-.08522.1541-.1866.2006-.29831s.0705-.23152.0705-.35253-.0239-.24082-.0705-.35253-.1147-.21309-.2006-.2983c-.1718-.17073-.4041-.26656-.6463-.26656s-.4745.09583-.6462.26656L8.42339,9.05669C7.9084,9.57232,7.61914,10.2713,7.61914,11s.28926,1.4277.80425,1.9434l4.20751,4.2075c.1707.1693.4012.2648.6417.2658.1206.0007.2402-.0224.3519-.068s.2132-.1129.2989-.1978c.0859-.0852.1541-.1866.2006-.2983s.0705-.2315.0705-.3526-.0239-.2408-.0705-.3525-.1147-.2131-.2006-.2983L9.71589,11.6509Z" transform="translate(-1.40682-4.499673)"/>\n                        </svg>\n                    </button><button type="button" class="pgn-btn left-arrow-btn">\n                        <svg class="left-arrow-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 7.5 13">\n                            <path class="left-arrow-svg path" fill="var(--pgn-fill-color)"<path d="M9.71589,11.6509c-.08592-.0852-.15412-.1866-.20065-.2983s-.0705-.2316-.0705-.3526.02396-.2408.0705-.3525.11473-.2131.20065-.2983L13.9234,6.15086c.0859-.08522.1541-.1866.2006-.29831s.0705-.23152.0705-.35253-.0239-.24082-.0705-.35253-.1147-.21309-.2006-.2983c-.1718-.17073-.4041-.26656-.6463-.26656s-.4745.09583-.6462.26656L8.42339,9.05669C7.9084,9.57232,7.61914,10.2713,7.61914,11s.28926,1.4277.80425,1.9434l4.20751,4.2075c.1707.1693.4012.2648.6417.2658.1206.0007.2402-.0224.3519-.068s.2132-.1129.2989-.1978c.0859-.0852.1541-.1866.2006-.2983s.0705-.2315.0705-.3526-.0239-.2408-.0705-.3525-.1147-.2131-.2006-.2983L9.71589,11.6509Z" transform="translate(-7.40682-4.499673)""/>\n                        </svg>\n                    </button><button type="button" class="pgn-btn three-dots-btn left-three-dots-btn visually-hidden">\n                        <svg class="three-dots-svg left-three-dots-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22">\n                            <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(4 16.516716)"/>\n                            <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(18 16.516716)"/>\n                            <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(11 16.516716)"/>\n                        </svg>\n                    </button>';for(var s=1;s<=t;s++)n+=s<=e?'<button type="button" class="pgn-btn number-btn">'.concat(s,"</button>"):'<button type="button" class="pgn-btn number-btn visually-hidden">'.concat(s,"</button>");return(n+=t>e?'<button type="button" class="pgn-btn three-dots-btn right-three-dots-btn">\n                        <svg class="three-dots-svg right-three-dots-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22">\n                            <ellipse class="right-three-dots-svg ellipse" rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(4 16.516716)"/>\n                            <ellipse class="right-three-dots-svg ellipse" rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(18 16.516716)"/>\n                            <ellipse class="right-three-dots-svg ellipse" rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(11 16.516716)"/>\n                        </svg>\n                        </button>':'<button type="button" class="right-three-dots-btn visually-hidden">\n            <svg class="three-dots-svg right-three-dots-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22">\n                <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(4 16.516716)"/>\n                <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(18 16.516716)"/>\n                <ellipse rx="1.5" ry="1.5" fill="var(--pgn-fill-color)" transform="translate(11 16.516716)"/>\n            </svg>\n            </button>')+'<button type="button" class="pgn-btn right-arrow-btn">\n                        <svg class="right-arrow-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 7.5 13">\n                        <path class="right-arrow-svg path" fill="var(--pgn-fill-color)" d="M9.71589,11.6509c-.08592-.0852-.15412-.1866-.20065-.2983s-.0705-.2316-.0705-.3526.02396-.2408.0705-.3525.11473-.2131.20065-.2983L13.9234,6.15086c.0859-.08522.1541-.1866.2006-.29831s.0705-.23152.0705-.35253-.0239-.24082-.0705-.35253-.1147-.21309-.2006-.2983c-.1718-.17073-.4041-.26656-.6463-.26656s-.4745.09583-.6462.26656L8.42339,9.05669C7.9084,9.57232,7.61914,10.2713,7.61914,11s.28926,1.4277.80425,1.9434l4.20751,4.2075c.1707.1693.4012.2648.6417.2658.1206.0007.2402-.0224.3519-.068s.2132-.1129.2989-.1978c.0859-.0852.1541-.1866.2006-.2983s.0705-.2315.0705-.3526-.0239-.2408-.0705-.3525-.1147-.2131-.2006-.2983L9.71589,11.6509Z" transform="matrix(-1 0 0-1 15.40682 17.499673)"/>\n                        </svg>\n                    </button><button type="button" class="pgn-btn right-double-arrow-btn">\n                        <svg class="right-double-arrow-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 13 13">\n                        <path class="right-double-arrow-svg path" fill="var(--pgn-fill-color)" d="M9.71589,11.6509c-.08592-.0852-.15412-.1866-.20065-.2983s-.0705-.2316-.0705-.3526.02396-.2408.0705-.3525.11473-.2131.20065-.2983L13.9234,6.15086c.0859-.08522.1541-.1866.2006-.29831s.0705-.23152.0705-.35253-.0239-.24082-.0705-.35253-.1147-.21309-.2006-.2983c-.1718-.17073-.4041-.26656-.6463-.26656s-.4745.09583-.6462.26656L8.42339,9.05669C7.9084,9.57232,7.61914,10.2713,7.61914,11s.28926,1.4277.80425,1.9434l4.20751,4.2075c.1707.1693.4012.2648.6417.2658.1206.0007.2402-.0224.3519-.068s.2132-.1129.2989-.1978c.0859-.0852.1541-.1866.2006-.2983s.0705-.2315.0705-.3526-.0239-.2408-.0705-.3525-.1147-.2131-.2006-.2983L9.71589,11.6509Z" transform="matrix(-1 0 0-1 14.40682 17.499673)"/>\n                        <path class="right-double-arrow-svg path" fill="var(--pgn-fill-color)" d="M9.71589,11.6509c-.08592-.0852-.15412-.1866-.20065-.2983s-.0705-.2316-.0705-.3526.02396-.2408.0705-.3525.11473-.2131.20065-.2983L13.9234,6.15086c.0859-.08522.1541-.1866.2006-.29831s.0705-.23152.0705-.35253-.0239-.24082-.0705-.35253-.1147-.21309-.2006-.2983c-.1718-.17073-.4041-.26656-.6463-.26656s-.4745.09583-.6462.26656L8.42339,9.05669C7.9084,9.57232,7.61914,10.2713,7.61914,11s.28926,1.4277.80425,1.9434l4.20751,4.2075c.1707.1693.4012.2648.6417.2658.1206.0007.2402-.0224.3519-.068s.2132-.1129.2989-.1978c.0859-.0852.1541-.1866.2006-.2983s.0705-.2315.0705-.3526-.0239-.2408-.0705-.3525-.1147-.2131-.2006-.2983L9.71589,11.6509Z" transform="matrix(-1 0 0-1 20.40682 17.499673)"/>\n                        </svg>\n                    </button> '}(U,Z),y=z,M.append(y),R=c(y,1),y.addEventListener("click",(function(t){var e=t.target;!function(t,e){e.classList.contains("left-double-arrow-btn")||e.classList.contains("left-double-arrow-svg")?(R=v(t),k.innerHTML=V(O,R,3)):e.classList.contains("left-arrow-btn")||e.classList.contains("left-arrow-svg")?(R=c(t,R-1),k.innerHTML=V(O,R,3)):e.classList.contains("left-three-dots-btn")||e.classList.contains("left-three-dots-svg")?(R=d(t,2),k.innerHTML=V(O,R,3)):e.classList.contains("number-btn")&&!e.classList.contains("active")?(R=c(t,Number(e.textContent)),k.innerHTML=V(O,R,3)):e.classList.contains("right-three-dots-btn")||e.classList.contains("right-three-dots-svg")?(R=u(t,2),k.innerHTML=V(O,R,3)):e.classList.contains("right-arrow-btn")||e.classList.contains("right-arrow-svg")?(R=c(t,R+1),k.innerHTML=V(O,R,3)):(e.classList.contains("right-double-arrow-btn")||e.classList.contains("right-double-arrow-svg"))&&(R=b(t),k.innerHTML=V(O,R,3))}(y,e)})))),(0,E.scrollUp)()}catch(t){var P=document.createElement("div");M.append(P),P.classList.add("error-box"),P.innerHTML='<p class="error-box-text">Sorry, there was a server error, please reload the page!!!</p>'}}else W()}else;function V(t,e,n){var s=(e-1)*n,r=s+(n-1);return t.map((function(t,e){var n=t._id,l=t.book_image,i=t.list_name,o=t.author,a=t.title,c=t.description,d=t.buy_links;return' <li data-id="'.concat(n,'" class="book-card ').concat(e>=s&&e<=r?"":"non-active",'">\n\n                                        <div class="book-image-div">\n                                          <img class="book-image" src=\'').concat(l,"' alt='").concat(a,'\'>\n                                        </div>\n\n                                        <div class="book-card-content-div">\n\n                                          <div class="book_information">\n                                            <p class="book-title">').concat(a,'</p>\n                                            <p class="book-category">').concat(i,'</p>\n                                            <p class="book-description">').concat(c||"No description",'</p>\n                                            <p class="book-author">').concat(o,'</p>\n                                          </div>\n                                          \n                                          <button data-id="').concat(n,'" class="bucket-btn">\n                                            <img src="').concat(S[0].img,'" alt="amazon">\n                                          </button>\n                                        \n                                          <ul class="market_placers_list list">\n                                      \n                                            <li class="marketplacer_li_one">\n                                              <a href="').concat(d[0].url,'" class="marketplacer_li_link link">\n                                                <svg id="amazon-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 15">\n                                                  <path fill="var(--amazon-path1-color)" d="M38.42,21.708c-3.093,2.284-7.591,3.504-11.459,3.504-5.423,0-10.306-2.005-13.999-5.342-.29-.262-.03-.62.318-.416c3.986,2.32,8.915,3.715,14.005,3.715c3.434,0,7.211-.71,10.684-2.185.525-.223.963.343.45.724h.001Zm1.289-1.473c-.395-.507-2.613-.239-3.617-.121-.304.037-.35-.228-.077-.418c1.771-1.247,4.677-.887,5.017-.469s-.088,3.333-1.753,4.724c-.256.213-.499.1-.386-.183.373-.933,1.212-3.025.815-3.533h.001Z" transform="matrix(.9 0 0 0.9-4.692819-7.6908)"/>\n                                                  <path fill="var(--amazon-path2-color)" d="M36.166,10.894c0,.181.14.304.314.304h2.829l-3.257,4.671c-.197.3-.199.636-.199.834v1.228c0,.176.197.381.386.278c1.845-.98,4.062-.884,5.732-.009.205.107.4-.1.4-.276v-1.293c-.021-.174-.075-.351-.288-.471-.947-.534-2.049-.69-3.094-.664L41.8,11.482c.259-.36.406-.588.409-.762v-1.037c0-.181-.14-.307-.314-.307h-5.425c-.003,0-.006,0-.009,0-.165,0-.299.134-.299.299c0,.003,0,.006,0,.008v1.212l.004-.001ZM16.361,18.451c.176,0,.318-.137.318-.307v-4.491c0-.98-.046-2.336,1.14-2.336c1.173,0,1.017,1.391,1.017,2.336l.002,4.491c0,.163.13.295.297.307h1.653c.176,0,.318-.137.318-.307v-4.491c0-.481-.017-1.195.153-1.623s.587-.694.987-.694c.478,0,.848.161.971.729.078.339.046,1.23.046,1.588v4.496c0,.163.137.295.297.307h1.653c.176,0,.318-.137.318-.307l.004-5.347c0-.908.107-1.943-.416-2.656-.462-.641-1.219-.926-1.91-.926-.973,0-1.88.499-2.28,1.57-.465-1.07-1.11-1.57-2.143-1.57-1.017,0-1.771.499-2.173,1.57h-.03v-1.107c-.012-.153-.14-.276-.3-.283h-1.539c-.176,0-.318.134-.318.304v8.471c.012.151.137.269.295.281h1.65l-.01-.005ZM46.878,9.227c2.449,0,3.775,2.103,3.775,4.778c0,2.584-1.465,4.634-3.775,4.634-2.4,0-3.715-2.103-3.715-4.724c0-2.637,1.326-4.693,3.715-4.693v.005Zm.014,1.723c-1.216,0-1.293,1.658-1.293,2.691s-.016,3.245,1.279,3.245c1.279,0,1.34-1.783,1.34-2.869c0-.715-.03-1.57-.245-2.247-.186-.59-.555-.82-1.079-.82h-.002Zm6.931,7.507c.177,0,.321-.137.323-.307v-4.562c0-.571.03-1.087.262-1.604.189-.408.558-.677.96-.677c1.14,0,1.033,1.356,1.033,2.283v4.601c.016.144.141.255.292.267h1.652c.162,0,.299-.117.318-.267v-5.333c0-.82,0-1.96-.427-2.637-.465-.732-1.18-.998-1.927-.998-1.14,0-1.788.553-2.25,1.711h-.03v-1.296c-.033-.132-.151-.23-.295-.237h-1.531c-.167,0-.304.121-.318.276l.002,8.474c0,.163.137.295.297.307h1.644l-.005-.001ZM31.835,14.403v-.357c-1.195,0-2.456.255-2.456,1.662c0,.713.372,1.196,1.005,1.196.462,0,.88-.286,1.142-.75.325-.577.309-1.107.309-1.75v-.001Zm1.664,4.024c-.109.098-.267.105-.389.039-.548-.455-.647-.667-.947-1.1-.906.924-1.548,1.2-2.721,1.2-1.39,0-2.47-.857-2.47-2.572c0-1.34.724-2.252,1.76-2.698.896-.395,2.147-.464,3.104-.573v-.213c0-.393.03-.857-.203-1.196-.199-.304-.585-.429-.926-.429-.629,0-1.189.323-1.326.992-.028.149-.137.295-.288.302l-1.6-.172c-.134-.03-.285-.139-.245-.347.367-1.941,2.123-2.526,3.691-2.526.803,0,1.853.213,2.486.821.803.75.726,1.75.726,2.839v2.572c0,.773.32,1.112.622,1.531.105.149.128.327-.007.439l-1.262,1.101-.002-.005-.003-.005ZM10.196,14.409v-.357c-1.193,0-2.453.255-2.453,1.662c0,.713.369,1.196,1.003,1.196.465,0,.88-.286,1.142-.75.325-.577.309-1.107.309-1.75l-.001-.001Zm1.664,4.023c-.109.098-.267.105-.389.039-.548-.455-.64-.667-.947-1.1-.906.924-1.547,1.2-2.721,1.2-1.388.001-2.469-.856-2.469-2.571c0-1.34.726-2.252,1.76-2.698.896-.395,2.147-.464,3.104-.573v-.213c0-.393.03-.857-.199-1.196-.203-.304-.587-.429-.926-.429-.629,0-1.191.323-1.333.992-.028.149-.137.295-.285.302l-1.602-.172c-.134-.03-.283-.139-.245-.347C5.977,9.725,7.731,9.14,9.299,9.14c.803,0,1.853.213,2.486.821.803.75.726,1.75.726,2.839v2.572c0,.773.32,1.112.622,1.531.107.149.13.327-.005.439l-1.259,1.094-.005-.005-.004.001Z" transform="matrix(.9 0 0 0.9-4.8006-8.2206)"/>\n                                                </svg>  \n                                              </a>\n                                            </li>\n                                      \n                                            <li class="marketplacer_li_two">\n                                              <a href="').concat(d[1].url,'" class="marketplacer_li_link link">\n                                                <svg id="apple-ibooks" xmlns="http://www.w3.org/2000/svg" x="0" y="0" version="1.1" viewBox="0 0 100 100" xml:space="preserve">\n                                                      <g>\n                                                        <linearGradient id="gradient-background').concat(e,'" x1="-303.017" x2="-303.017" y1="748.267" y2="746.767" gradientTransform="matrix(60 0 0 -60 18231 44901)" gradientUnits="userSpaceOnUse">\n                                                          <stop offset="0" stop-color="#aaaaaa"></stop>\n                                                          <stop offset="1" stop-color="#909090"></stop>\n                                                        </linearGradient>\n\n                                                        <path fill="url(#gradient-background').concat(e,')" d="M63.6 5c9 0 13.6 0 18.4 1.5 5.3 1.9 9.5 6.1 11.4 11.4C95 22.8 95 27.3 95 36.4v27.2c0 9 0 13.6-1.5 18.4-1.9 5.3-6.1 9.5-11.4 11.4C77.2 95 72.7 95 63.6 95H36.4c-9 0-13.6 0-18.4-1.5-5.3-2-9.5-6.2-11.5-11.5C5 77.2 5 72.7 5 63.6V36.4c0-9 0-13.6 1.5-18.4 2-5.3 6.2-9.5 11.5-11.5C22.8 5 27.3 5 36.4 5h27.2z"></path>\n                                                        <path fill="#fff" d="M20 32.8s2.9-7.5 14.6-7.5c11.6 0 14.7 9.8 14.7 9.8v42s-3.7-11.2-14.6-11.2c-7.9 0-13.5 5.1-13.5 5.1-.6.5-1.2.2-1.2-.6V32.8zm60 0v37.5c0 .8-.5 1.1-1.2.6 0 0-5.6-5.1-13.5-5.1C54.5 65.8 50.8 77 50.8 77V35s3-9.8 14.7-9.8c11.6 0 14.5 7.6 14.5 7.6z"></path>\n                                                      </g>\n                                                  </svg>\n                                              </a>\n                                            </li>\n                                      \n                                          </ul>\n\n                                        </div>\n                                      </li>')})).join("\n")}function W(){var t=document.createElement("div");t.classList.add("empty-shopping_booklist"),t.innerHTML='<p class="empty-shopping-box-text">This page is empty, add some books and proceed to order.</p>\n                                <div class="empty-shopping-box-picturebox">\n                                  <picture>\n                                    <source\n                                      srcset="'.concat(e(h)," 1x, ").concat(e(p),' 2x"\n                                      media="(max-width: 767.9px)"\n                                    >\n                                    <source\n                                    srcset="').concat(e(m)," 1x, ").concat(e(x),' 2x"\n                                      media="(min-width: 768px) and (max-width: 1439.8px)"\n                                    >\n                                    <source\n                                    srcset="').concat(e(w)," 1x, ").concat(e(L),' 2x"\n                                      media="(min-width: 1440px)"\n                                    >\n                                    <img \n                                      src=').concat(e(w),'\n                                      alt="stack of books" \n                                    >\n                                  </picture>\n                                </div>'),M.append(t)}l("aEag2"),l("9haEe"),l("d474f"),l("cIzEt");var Y=document.querySelector(".js-nav-shoppinglistlink"),D=document.querySelector(".js-mobile-nav-shoppinglistlink"),K=document.querySelector(".js-mobile-shopping-bag-icon");Y.classList.toggle("selected"),D.classList.toggle("mobile-selected"),K.classList.toggle("mobile-selected")}();
//# sourceMappingURL=shopping_list_page.1336940c.js.map
