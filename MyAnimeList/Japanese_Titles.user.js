// ==UserScript==
// @name         MAL - Japanese Titles
// @description  Titles in Japanese on MyAnimeList | I've blocked title change, if there is more than 100 of them on one page
// @author       Jorengarenar
// @namespace    https://joren.ga
// @version      0.8.5
// @include      /^https?:\/\/myanimelist.net\/(anime|manga)list\/\w+/
// @include      /^https?:\/\/myanimelist.net\/(anime|manga)\/\d+.*/
// @include      /^https?:\/\/myanimelist.net\/(anime|manga)\.php\?q=.*/
// @include      /^https?:\/\/myanimelist.net\/profile\/\w+/
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var pattern = /<span class=\"dark_text\">Japanese:<\/span> (.*?)(?:<\/div>|\n)/;

// Lists, profile and search page
var titles = document.querySelectorAll("td.title > a, .statistics-updates > .data > a, a.fw-b.fl-l");
console.log(titles);

if (titles.length <= 100) {
  for (let title of titles) {
    GM_xmlhttpRequest({
      method: "GET",
      url: title.getAttribute("href"),
      onload: (response) => { title.innerHTML = pattern.exec(response.responseText)[1]; }
    });
  }
}

// Anime/manga pages
let title = pattern.exec(document.getElementById("content").innerHTML)[1];
let romanji = document.getElementsByClassName("h1")[0];
document.getElementsByTagName("title")[0].innerHTML = title + " | " + romanji.innerText;
romanji.innerHTML = title;
