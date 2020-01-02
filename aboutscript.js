$( window ).ready(function() {
  
    var wHeight = $(window).height();

    $('.slide')
      .height(wHeight)
      .scrollie({
        scrollOffset : -50,
        scrollingInView : function(elem) {
                   
          var bgColor = elem.data('background');
          console.log(bgColor)
          $('body').css('background-color', bgColor);
          
        }
      });

  });