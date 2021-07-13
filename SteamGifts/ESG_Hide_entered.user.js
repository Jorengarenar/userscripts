// ==UserScript==
// @name         ESG - Hide entered
// @description  Adds checkbox on the main page to hide/unhide entered giveaways while using Extended Steamgifts. Do not use with default ESG "Hide entered giveaways" option
// @author       Jorengarenar
// @namespace    https://joren.ga
// @version      1.3.9
// @include      /https?:\/\/www\.steamgifts\.com.*/
// @include      steamgifts.com
// ==/UserScript==

let checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.id = "hide-entered";
checkbox.style = "width: initial";
checkbox.onclick = function() {
  if (this.checked) {
    $(".sidebar__entry-insert.is-hidden").siblings(".sidebar__error.is-hidden").closest(".giveaway__row-outer-wrap").hide();
    $(document).on("scroll", function() {
      $(".sidebar__entry-insert.is-hidden").siblings(".sidebar__error.is-hidden").closest(".giveaway__row-outer-wrap").hide();
    });
  } else {
    $(".sidebar__entry-insert.is-hidden").closest(".giveaway__row-outer-wrap").show();
    $(document).on("scroll", function() {
      $(".sidebar__entry-insert.is-hidden").closest(".giveaway__row-outer-wrap").show();
    });
  }
};

let buttonDiv = document.createElement("div");
buttonDiv.style = "display: inline-flex; position: sticky; top:15px";
buttonDiv.appendChild(checkbox);
$(buttonDiv).append('<label for="hide-entered" class="sidebar__navigation__item__name" style="padding-left: 5px">Hide entered</label>');

$(".sidebar__navigation:last").after(buttonDiv);

$(function() {
  checkbox.click();

  window.setTimeout(function() {
    if (checkbox.checked) {
      $(".sidebar__entry-insert").click(function() {
        $(this).closest(".giveaway__row-outer-wrap").fadeOut(300);
      });
      $(document).on("scroll", function() {
        $(".sidebar__entry-insert").click(function() {
          $(this).closest(".giveaway__row-outer-wrap").fadeOut(300);
        });
      });
    }
  }, 100);
});
