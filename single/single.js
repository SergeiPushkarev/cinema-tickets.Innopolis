$(document).ready(function(){
    $(".slide01").owlCarousel({
        loop: true,
        items: 6,
        nav: true,
        dots: false,
    });
});
$(document).ready(function(){
$(".slide02").owlCarousel({
    loop: true,
    items: 6,
    nav: true,
    dots: false,
    });
});

const filmId = new URLSearchParams(location.search);
