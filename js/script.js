$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop: true,
        responsiveClass: true,
        responsive:{
            0:{
                items: 1,
                center: true,
                stagePadding: 138,
                margin: 60,
                nav: true,
            },
            551:{
                items: 3,
                margin:100,
                nav: true,
            }
        }
    });
  });