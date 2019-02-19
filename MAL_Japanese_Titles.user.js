// ==UserScript==
// @name           MAL - Japanese Titles
// @version        1.5.1
// @description    Displays Japanese titles for anime/manga lists on MyAnimeList
// @match          https://myanimelist.net/animelist/*
// @match          https://myanimelist.net/mangalist/*
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// ==/UserScript==

GM_addStyle(`
    .japanese_title {
        display: inline-block;
        float: left;
        font-size: 1.3em;
        padding-right: 10px;
    }

    .romanji_title {
        clear: left;
        display: inline-block;
        float: left;
        opacity: 0.5;
    }
`)

var keepRomanji = 0;

function insertJapanese(japanese, title) {
    if (typeof japanese == 'undefined' || japanese == '')
        return;
    if (keepRomanji)
        title.innerHTML = '<div class="japanese_title">' + japanese + '</div><div class="romanji_title"><i>' + title.innerHTML + '</i></div>';
    else
        title.innerHTML = '<div class="japanese_title">' + japanese + '</div>';
}

function findJapanese(element) {
    var spaceit_pad = element.getElementsByClassName("spaceit_pad");
    for (var i = 0; i < spaceit_pad.length; i++) {
        var dark_text = spaceit_pad[i].getElementsByClassName("dark_text");
        if (dark_text[0].innerText == "Japanese:") {
            return spaceit_pad[i].innerText.replace("Japanese:","").trim();
        }
    }
    return "";
}

function sendRequest(url, title) {
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function (response) {
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
    sendRequest(inquiry, titles[i]);
}
