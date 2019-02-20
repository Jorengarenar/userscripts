// ==UserScript==
// @name           MAL - Japanese Titles
// @version        0.7.1
// @description    Titles in Japanese on MyAnimeList
// @include        /^https?://myanimelist.net/(anime|manga)list/\w+/
// @include        /^https?://myanimelist.net/(anime|manga)/\d+.*
// @include        /^https?://myanimelist.net/profile/\w+/
// @grant          GM_xmlhttpRequest
// ==/UserScript==

var pattern = /<span class=\"dark_text\">Japanese:<\/span> (.*?)(?:<\/div>|\n)/

// Lists and profile page
var titles = document.querySelectorAll("td.title > a, .statistics-updates > .data > a");

for (let title of titles) {
    GM_xmlhttpRequest({
        method: "GET",
        url: title.getAttribute("href"),
        onload: function(response) {
            var japanese = pattern.exec(response.responseText)[1];
            if (typeof japanese != 'undefined' && japanese != '')
                title.innerText = japanese;
        }
    });
}

// Anime/manga pages
document.getElementsByClassName("h1")[0].innerText = pattern.exec(document.getElementById("content").innerHTML)[1];
