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
const brgBtn = document.getElementById('brgBtn');
const mobMenu = document.getElementById('mobilemenu');
function menuToggle(){
    brgBtn.classList.toggle('burgermenu__btn-open')
    mobMenu.classList.toggle('mobilemenu-open')
}
brgBtn.onclick = menuToggle;

const btnGift = document.getElementById("popup_prize");
const btnGiftOpen = document.querySelector('#btn-gift');
const btnGiftClose = document.querySelector('#popup-btn');
function popupToggle () {
    btnGift.classList.toggle('hidden')
};
btnGiftOpen.onclick = popupToggle;
btnGiftClose.onclick = popupToggle;