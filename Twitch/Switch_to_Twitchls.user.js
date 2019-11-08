// ==UserScript==
// @name         Twitch - Switch to Twitchls
// @description  Change from twitch.tv to twitchls.com
// @author       Jorengarenar
// @homepageURL  https://joren.ga
// @version      0.1
// @run-at       document-end
// @include      /https?:\/\/www\.twitch\.tv\/?.*/
// ==/UserScript==

window.location = window.location.href.replace("www.twitch.tv", "twitchls.com");
