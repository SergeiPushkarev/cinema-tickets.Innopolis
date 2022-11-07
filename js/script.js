$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop: true,
        responsiveClass: true,
        responsive:{
            0:{
                items: 3,
                stagePadding: 0,
                margin: 25,
                nav: true,
            },
            552:{
                items: 3,
                stagePadding: 0,
                margin: 40,
                nav: true,
            },
            768:{
                items: 3,
                margin: 70,
                nav: true,
            }
        }
    });
  });

//burger button toggle
const brgBtn = document.getElementById("brgBtn")
brgBtn.onclick = function () {
    document.getElementsById('mobilemenu').classList.add('mobilemenu-open');
    
}