// ==UserScript==
// @name         Pixiv - RSS Button
// @description  RSS using RSSHub.app
// @author       Jorengarenar
// @homepageURL  https://joren.ga
// @version      1.0.0
// @run-at       document-end
// @include      /https?:\/\/www\.pixiv\.net\/.*users\/\d+/
// @namespace https://joren.ga
// ==/UserScript==

let rssButton = document.createElement("a");
rssButton.target = "_blank";
rssButton.innerHTML = "<b>RSS</b>";
rssButton.setAttribute("class", "_2Of8xxg");
let id = window.location.href.match(/users\/(\d+)/)[1];
rssButton.href = "https://rsshub.app/pixiv/user/" + id;

window.setTimeout(function() {
  Array.from(document.getElementsByTagName("button"))
    .find((el) => el.textContent.match(/Follow(ing)?/))
    .parentNode.prepend(rssButton);
}, 100);
