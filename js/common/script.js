$(function(){var o;$(document).scroll(function(){$(this).scrollTop()>700?$(".rocket").fadeIn():$(".rocket").fadeOut()}),$(".rocket").on("click",function(){$(this).removeClass("start").delay(800).addClass("motion"),setTimeout(function(){$(".rocket").removeClass("motion")},1500)}),$(".toggle-menu").on("click",function(){$("nav").toggleClass("visible"),$(".toggle-menu").toggleClass("active")}),$(".fancybox").fancybox(),$(".jcarousel").jcarousel({wrap:"both"}),$(".jcarousel-pagination").jcarouselPagination({item:function(o){return'<a href="#'+o+'">'+o+"</a>"}}),$(".jcarousel-pagination").on("jcarouselpagination:active","a",function(){$(this).addClass("active")}).on("jcarouselpagination:inactive","a",function(){$(this).removeClass("active")}),$(".jcarousel-prev").jcarouselControl({target:"-=1"}),$(".jcarousel-next").jcarouselControl({target:"+=1"}),$(".faq-close").on("click",function(){$(".faq").css("display","none").fadeOut()}),$(".faq-open").click(function(o){o.preventDefault(),$(".faq").css("display","block")}),$(window).on("click",function(){$(event.target).is(".faq")&&$(".faq").css("display","none").fadeOut()}),$(".form-close").on("click",function(){$(".form").css("display","none").fadeOut()}),$(".form-open").click(function(o){o.preventDefault(),$(".form").css("display","block")}),o=800,$('a[href^="#"]').on("click",function(n){var t=$($(this).attr("href"));t.length&&(n.preventDefault(),$("html, body").animate({scrollTop:t.offset().top},o))})});
