// ==UserScript==
// @name         Search "All Github" by default
// @description  When you are on repository/user page selects "All GitHub" by default instead of "In this repository/user"
// @author       Jorengarenar
// @namespace    https://joren.ga
// @version      0.2
// @run-at       document-end
// @include      /https?:\/\/github\.com\/.+/
// ==/UserScript==

const config = {
  childList: true,
  subtree: true
};

const observer = new MutationObserver( () => {
  let inThisSearch = document.getElementById("jump-to-suggestion-search-scoped");
  inThisSearch.setAttribute("aria-selected", "false");
  inThisSearch.classList.remove("navigation-focus");

  let globalSearch = document.getElementById("jump-to-suggestion-search-global");
  globalSearch.setAttribute("aria-selected", "true");
  globalSearch.classList.add("navigation-focus");
});

observer.observe(document.querySelector(".header-search"), config);
