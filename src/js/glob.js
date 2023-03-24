import "../libs/owl.carousel.min.js"
import {initializeField} from "./components/input/input.js"
import "./components/burger.js"
import {renderTimelist} from "./components/film-table.js"
import {getBlockFilmsData} from "./components/film-block.js"
import "./components/city.js"

import "../css/reset.css"
import "../css/fonts.css"
import "../css/layouts.scss"
import "../css/components.scss"
import "../css/prisepopup.css"
// import "../css/media.css"
import "../css/owl.carousel.min.css"
import "../css/owl.theme.default.min.css"

//tablelist
renderTimelist("timelistBody")
//giftform
const giftForm = document.getElementById("popup-prize");
const btnGiftOpen = document.querySelector('#btn-gift');
const btnGiftClose = document.querySelector('#popup-btn');
const nameInputGift = document.querySelector('#namePrize').parentNode;
const emailInputGift = document.querySelector('#emailPrize').parentNode;
const selectInputGigt = document.querySelector('#selectPrize').parentNode;
const nameInputFeedback = document.querySelector('#nameFeedback').parentNode;
const sitInputFeedback = document.querySelector('#sit').parentNode;
const btnFeedback = document.querySelector('#btnFeedback');
const feedbackForm = document.getElementById('reviewForm')
function popupToggle (popup) {
    popup.classList.toggle('hidden')
};
function giftClose () {
    popupToggle(giftForm);
    nameField.clearValue();
    emailField.clearValue();
    selectField.clearValue();
}
btnGiftOpen.onclick = function() {
    popupToggle(giftForm);
    nameField.focus();
};
btnGiftClose.onclick = function(){
    giftClose()
};
giftForm.addEventListener('click', e=>{
    if (e.target.classList == 'popup') {
        giftClose()
    }
})
const nameField = initializeField(nameInputGift);
const emailField = initializeField(emailInputGift);
const selectField = initializeField(selectInputGigt);
const nameFieldForm = initializeField(nameInputFeedback);
const sitFieldForm = initializeField(sitInputFeedback);

giftForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const nameValue = nameField.getValue();
    const emailValue = emailField.getValue();
    const selectValue = selectField.getValue();
    if (!nameValue) {
        nameField.setError('Обязательно для заполнения');
        // nameField.focus();
        return
    };
    if (!emailValue) {
        emailField.setError('Обязательно для заполнения');
        emailField.focus();
        return
    };
    if (!/^[\w.]{1,16}@[\w]{1,12}\.[\w]{1,4}$/.test(emailValue)) {
        emailField.setError('Это неправильный e-mail');
        emailField.focus();
        return
    };
    if (selectValue === "none"){
        selectField.setError('Обязательно выберите подарок!');
        selectField.focus();
        return
    };
    const data = {
        name: nameValue,
        email: emailValue,
        id: selectValue,
    };
    const url = new URL('https://jsonplaceholder.typicode.com/users');
    url.search = new URLSearchParams(data).toString();
    fetch(url.toString());
    popupToggle();
    nameField.clearValue();
    emailField.clearValue();
    selectField.clearValue();
});
//movieContainer
const movieConteiner = document.getElementById('movie__container');
// getBlockFilmsData(movieConteiner);

// feedbackform
feedbackForm.addEventListener('submit', function (event){
    event.preventDefault();
    const nameValue = nameFieldForm.getValue();
    const selectValue = sitFieldForm.getValue();
    if (!nameValue) {
        nameFieldForm.setError('Обязательно для заполнения');
        return
    };
    if (selectValue === "none"){
        sitFieldForm.setError('Обязательно выберите место!');
        return
    };
    const data = {
        name: nameValue,
        id: selectValue,
    };
    const url = new URL('https://jsonplaceholder.typicode.com/users');
    url.search = new URLSearchParams(data).toString();
    fetch(url.toString());
    nameFieldForm.clearValue();
    sitFieldForm.clearValue();
})

//carousel
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
                stagePadding: 0,
                margin: 70,
                nav: true,
            }
        }
    });
});