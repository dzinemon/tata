$(function () {
  //			Rocket Show on/off
  $(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 700) {
      $('.rocket').fadeIn();

    } else {
      $('.rocket').fadeOut();
    }
  });


  $('.rocket').on('click', function () {
    $(this).removeClass('start').delay(800).addClass('motion')
    setTimeout(function () {
      $('.rocket').removeClass('motion')
    }, 1500)
  });

  //			Toggle-Menu
  $('.toggle-menu').on('click', function () {
    $('nav').toggleClass('visible');
    $('.toggle-menu').toggleClass('active');
  });
  //		Call fancyBox	
  $(".fancybox").fancybox();
  //		Call carousel
  $('.jcarousel').jcarousel({
    // Configuration goes here
    wrap: 'both'
  });
  $('.jcarousel-pagination').jcarouselPagination({
    item: function (page) {
      return '<a href="#' + page + '">' + page + '</a>';
    }
  });
  //			adding active class
  $('.jcarousel-pagination')
    .on('jcarouselpagination:active', 'a', function () {
      $(this).addClass('active');
    })
    .on('jcarouselpagination:inactive', 'a', function () {
      $(this).removeClass('active');
    });

  $('.jcarousel-prev').jcarouselControl({
    target: '-=1'
  });

  $('.jcarousel-next').jcarouselControl({
    target: '+=1'
  });
  //		Open and close FAQ	

  $('.faq-close').on('click', function () {
    $('.faq').css('display', 'none').fadeOut();
  });


  $('.faq-open').click(function (event) {
    event.preventDefault();
    $('.faq').css('display', 'block');
  });


  $(window).on('click', function () {
    if ($(event.target).is('.faq')) {
      $('.faq').css('display', 'none').fadeOut();
    }
  });

  //		Open and close FORM	
  $('.form-close').on('click', function () {
    $('.form').css('display', 'none').fadeOut();
  });


  $('.form-open').click(function (event) {
    event.preventDefault();
    $('.form').css('display', 'block');
  });

  //		smoothScroll Function Call
  smoothScroll(800);
  
  //		smoothScroll Function
function smoothScroll(duration) {
  $('a[href^="#"]').on('click', function (event) {

    var target = $($(this).attr('href'));

    if (target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, duration);
    }
  });
}
});


