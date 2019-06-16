// ==UserScript==
// @name         Pixiv - RSS Buttons
// @description  RSS using RSSHub.app
// @author       Jorengarenar
// @version      0.2
// @run-at       document-end
// @include      https://www.pixiv.net
// @include      *pixiv.net*
// @namespace https://greasyfork.org/users/309959
// ==/UserScript==

let rssButton = document.createElement('a');
rssButton.target = "_blank";
rssButton.innerHTML = "<b>RSS</b>";
rssButton.setAttribute('class', "_2Of8xxg");
rssButton.style = "margin-right: 10px";
rssButton.href = "https://rsshub.app/pixiv/user/" + window.location.href.match(/id=(\d+)/)[1];
window.onload = function() {
    let bar = document.querySelector('._310Z6Ex');
    bar.insertBefore(rssButton, bar.childNodes[0]);
};
