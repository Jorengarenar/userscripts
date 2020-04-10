// ==UserScript==
// @name         Pixiv - RSS Button
// @description  RSS using RSSHub.app
// @author       Jorengarenar
// @homepageURL  https://joren.ga
// @version      0.3.3
// @run-at       document-end
// @include      /https?:\/\/www\.pixiv\.net\/.*users\/\d+/
// ==/UserScript==

let rssButton = document.createElement('a');
rssButton.target = "_blank";
rssButton.innerHTML = "<b>RSS</b>";
rssButton.setAttribute('class', "_2Of8xxg");
let id = window.location.href.match(/users\/(\d+)/)[1];
rssButton.href = "https://rsshub.app/pixiv/user/" + id;
window.setTimeout(function() {
  let bar = document.querySelector('._310Z6Ex');
  if (bar) { bar.insertBefore(rssButton, bar.childNodes[1]); }
}, 1000);
