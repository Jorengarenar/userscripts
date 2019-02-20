// ==UserScript==
// @name           MAL - Japanese Titles
// @version        1.5.2
// @description    Displays Japanese titles for anime/manga lists on MyAnimeList
// @include        /^https?://myanimelist.net/(anime|manga)list/\w+/
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// ==/UserScript==

function insertJapanese(japanese, title) {
    if (typeof japanese == 'undefined' || japanese == '')
        return;
    // Comment line below and uncomment next if you want to keep romanji titles
    title.innerHTML = '<div class="japanese_title">' + japanese + '</div>';
    // title.innerHTML = '<div class="japanese_title">' + japanese + '</div><div class="romanji_title"><i>' + title.innerHTML + '</i></div>';
}

function findJapanese(element) {
    var spaceit_pad = element.getElementsByClassName("spaceit_pad");
    for (var i = 0; i < spaceit_pad.length; i++)
        if (spaceit_pad[i].innerText.includes("Japanese:"))
            return spaceit_pad[i].innerText.replace("Japanese:", "").trim();
    return "";
}

function changeTitles(url, title) {
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(response) {
            if (response.status == 200) {
                var div = document.createElement('div');
                div.innerHTML = response.responseText;
                insertJapanese(findJapanese(div), title);
            }
        }
    });
}

var titles = document.getElementsByClassName("link sort");

for (var i = 0; i < titles.length; i++) {
    var inquiry = "http://myanimelist.net/" + titles[i].getAttribute("href");
    changeTitles(inquiry, titles[i]);
}

GM_addStyle(`
    .japanese_title {
        display: inline-block;
        float: left;
        font-size: 1.2em;
        padding-right: 10px;
    }

    .romanji_title {
        clear: left;
        display: inline-block;
        float: left;
        opacity: 0.5;
    }
`)
