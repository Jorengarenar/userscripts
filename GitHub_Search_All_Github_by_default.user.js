// ==UserScript==
// @name         Search "All Github" by default
// @description  When you are on repository page select "All GitHub" by default instead of "In this repository"
// @author       Jorengarenar
// @homepageURL  https://joren.ga
// @version      0.1
// @run-at       document-end
// @include      https://github.com*
// ==/UserScript==

const config = {
    childList: true,
    subtree: true
};

function swapDiv(event,elem){
    elem.parentNode.insertBefore(elem,elem.parentNode.firstChild);
}

function change(queue, observer) {
        let repoSearch =  document.querySelector('#jump-to-suggestion-search-scoped');
        repoSearch.setAttribute("aria-selected", "false");
        repoSearch.classList.remove("navigation-focus");
        let globalSearch =  document.querySelector('#jump-to-suggestion-search-global')
        globalSearch.setAttribute("aria-selected", "true")
        globalSearch.classList.add("navigation-focus");
}

const observer = new MutationObserver(change);

observer.observe(document.querySelector('.header-search'), config);
