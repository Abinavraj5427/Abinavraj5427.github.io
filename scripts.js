$(function() {
    var $window = $(window);
    $(window).scroll(function () {
       if ($(this).scrollTop() > 50) {
          $("body").addClass("changeColor")
          $(".card").addClass("changeShadow");
       }
       if ($(this).scrollTop() < 50) {
          $("body").removeClass("changeColor")
          $(".card").removeClass("changeShadow");
       }
    });
 });