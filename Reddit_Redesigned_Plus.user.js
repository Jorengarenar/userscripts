// ==UserScript==
// @name         Reddit Redesigned+
// @version      0.1
// @description  Works with old Reddit
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @include      *reddit.com/*
// @exclude      *reddit.com/prefs*
// ==/UserScript==

if ( document.URL.indexOf("/comments/") >= 0 ) {
    let title = "<p style='color:#444; font-size:12px'>" + document.querySelector('a.title').innerHTML + "</p>";
    $(title).insertAfter('span.domain');
}

let post = document.getElementsByClassName("link");
post.style = "overflow:hidden"
for(let i = 0; i < post.length; i++) {
    let space = document.createElement('div');
    space.style = "flex: 1";
    space.class = "emptySpace";
    space.onclick = function() {
        space.parentNode.querySelector('.expando-button').click();
    }
    post[i].appendChild(space);
}

let navButtons = document.querySelector('.nav-buttons');
navButtons.style = "margin-top:20px; margin-bottom:20px; margin-left: 20px; margin-right: 20px";

try {
    let prevButton = document.querySelector('.prev-button');
    prevButton.firstChild.style = "padding: 10px 100px 10px 100px; margin-right:10px";
    $(prevButton).addClass("nextprev");
    navButtons.appendChild(prevButton);
} finally {
    let nextButton = document.querySelector('.next-button');
    nextButton.firstChild.style = "padding: 10px 100px 10px 100px;margin-left: 10px";
    $(nextButton).addClass("nextprev");
    navButtons.appendChild(nextButton);

    document.querySelector('.nextprev').remove();
};
