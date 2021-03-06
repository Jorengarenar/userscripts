// ==UserScript==
// @name         Pocket - Open original URLs
// @description  Opens original links instead of article view
// @author       Jorengarenar
// @namespace    https://joren.ga
// @version      0.5.1
// @match        https://getpocket.com/*
// @run-at       document-end
// ==/UserScript==


const config = {
  childList: true,
  subtree: true
};

function change(queue, observer) {
  window.setTimeout(function() {
    let articlesList = document.querySelectorAll("article");
    for (let article of articlesList) {
      let originalURL = article.querySelector("a.publisher");
      let link = article.querySelector(".content > h2.title");
      if (originalURL && link.querySelector("a[tabindex=\"0\"]")) {
        let newURL = document.createElement("a");
        newURL.innerText = link.querySelector("a").innerText;
        newURL.href = originalURL.href;
        link.replaceChild(newURL, link.childNodes[0]);
      }
    }
  }, 1000);
}

const observer = new MutationObserver(change);
change(document.body, config);
observer.observe(document.body, config);
