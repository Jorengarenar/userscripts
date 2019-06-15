// ==UserScript==
// @name         Pocket - Open original URLs
// @description  Opens original links instead of article view
// @author       Jorengarenar
// @version      0.1
// @include      http*://app.getpocket.com*
// @include      http*://getpocket.com/*
// @run-at       document-end
// ==/UserScript==

window.setTimeout(function() {
    let articles = document.querySelectorAll('article');
    for (let link of articles) {
        let originalURL = link.querySelector('.css-1fzr42x > a');
        if (originalURL) {
            let articleURL = link.querySelector('.css-7zhfhb > a');
            let originalCopy = originalURL.cloneNode(1);
            originalCopy.innerHTML = articleURL.innerHTML;
            link.querySelector('.css-7zhfhb').replaceChild(originalCopy, articleURL);
        }
    }
}, 1000);
