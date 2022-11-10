"use strict";

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 3,
        stagePadding: 0,
        margin: 25,
        nav: true
      },
      552: {
        items: 3,
        stagePadding: 0,
        margin: 40,
        nav: true
      },
      768: {
        items: 3,
        margin: 70,
        nav: true
      }
    }
  });
});
var brgBtn = document.getElementById('brgBtn');
var mobMenu = document.getElementById('mobilemenu');
var giftForm = document.getElementById("popup-prize");
var btnGiftOpen = document.querySelector('#btn-gift');
var btnGiftClose = document.querySelector('#popup-btn');
var nameInputGift = document.querySelector("#popup-prize input[name='name']").parentNode;
var emailInputGift = document.querySelector("#popup-prize input[name='email']").parentNode;
var selectInputGigt = document.querySelector('#selectPrize');
var INPUT_ERORR_CLASS = 'formlabel-error';
var INPUT_FOCUS_CLASS = 'formlabel-focused';
//burger button toggle
function menuToggle() {
  brgBtn.classList.toggle('burgermenu__btn-open');
  mobMenu.classList.toggle('mobilemenu-open');
}
brgBtn.onclick = menuToggle;
//giftbutton toggle
function popupToggle() {
  giftForm.classList.toggle('hidden');
}
;
btnGiftOpen.onclick = function () {
  popupToggle();
  nameField.focus();
};
btnGiftClose.onclick = popupToggle;
function initializeField(field) {
  var input = field.getElementsByTagName('input')[0];
  var errorText = field.querySelector('.formlabel__error-msg');
  clearForm();
  input.value = "";
  field.classList.remove(INPUT_FOCUS_CLASS);
  function clearForm() {
    field.classList.remove(INPUT_ERORR_CLASS);
    errorText.innerText = "";
  }
  ;
  input.addEventListener('focus', function () {
    field.classList.add(INPUT_FOCUS_CLASS);
  });
  input.addEventListener('input', clearForm);
  input.addEventListener('blur', function () {
    if (!input.value) {
      field.classList.remove(INPUT_FOCUS_CLASS);
    }
  });
  return {
    focus: function focus() {
      input.focus();
    },
    getValue: function getValue() {
      return input.value;
    },
    setError: function setError(errorMsg) {
      errorText.innerText = errorMsg;
      field.classList.add(INPUT_ERORR_CLASS);
    }
  };
}
;
var nameField = initializeField(nameInputGift);
var emailField = initializeField(emailInputGift);
giftForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var nameValue = nameField.getValue();
  var emailValue = emailField.getValue();
  if (!nameValue) {
    nameField.setError('Обязательно для заполнения');
    nameField.focus();
    return;
  }
  ;
  if (selectInputGift.value === "none") {
    selectInputGift.classList.add(INPUT_ERORR_CLASS);
    return;
  }
  ;
  var data = {
    name: nameValue,
    email: emailValue,
    id: selectInputGift.value
  };
  var url = new URL('https://jsonplaceholder.typicode.com/users');
  url.search = new URLSearchParams(data).toString();
  fetch(url.toString());
});