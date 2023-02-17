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
var giftForm = document.getElementById("popup-prize");
var btnGiftOpen = document.querySelector('#btn-gift');
var btnGiftClose = document.querySelector('#popup-btn');
var nameInputGift = document.querySelector('#namePrize').parentNode;
var emailInputGift = document.querySelector('#emailPrize').parentNode;
var selectInputGigt = document.querySelector('#selectPrize').parentNode;
var nameInputFeedback = document.querySelector('#nameFeedback').parentNode;
var sitInputFeedback = document.querySelector('#sit').parentNode;
var btnFeedback = document.querySelector('#btnFeedback');
var feedbackForm = document.getElementById('reviewForm');
var INPUT_ERROR_CLASS = 'formlabel-error';
var INPUT_FOCUS_CLASS = 'formlabel-focused';
function popupToggle(popup) {
  popup.classList.toggle('hidden');
}
;
function giftClose() {
  popupToggle(giftForm);
  nameField.clearValue();
  emailField.clearValue();
  selectField.clearValue();
}
btnGiftOpen.onclick = function () {
  popupToggle(giftForm);
  nameField.focus();
};
btnGiftClose.onclick = function () {
  giftClose();
};
giftForm.addEventListener('click', function (e) {
  if (e.target.classList == 'popup') {
    giftClose();
  }
});
function initializeField(field) {
  function getInputType(inpt) {
    var type;
    if (inpt.getElementsByTagName('select').length === 1) {
      return type = 'select';
    } else if (inpt.getElementsByTagName('input').length === 1) {
      return type = 'input';
    }
  }
  function clearErrorField() {
    if (errorText) {
      field.classList.remove(INPUT_ERROR_CLASS);
      errorText.innerText = "";
    }
  }
  ;
  function _clearValue() {
    if (getInputType(field) === 'input') {
      input.value = "";
      field.classList.remove(INPUT_FOCUS_CLASS);
    } else if (getInputType(field) === 'select') {
      input.selectedIndex = 0;
      field.classList.remove(INPUT_FOCUS_CLASS);
      clearErrorField();
    }
  }
  var input = field.getElementsByTagName(getInputType(field))[0];
  var errorText = field.querySelector('.formlabel__error-msg');
  _clearValue();
  clearErrorField();
  field.classList.remove(INPUT_FOCUS_CLASS);
  if (getInputType(field) === 'input') {
    input.addEventListener('focus', function () {
      field.classList.add(INPUT_FOCUS_CLASS);
    });
    input.addEventListener('input', clearErrorField);
    input.addEventListener('blur', function () {
      if (!input.value) {
        field.classList.remove(INPUT_FOCUS_CLASS);
        clearErrorField();
      }
    });
  } else if (getInputType(field) === 'select') {
    input.addEventListener('change', function () {
      field.classList.add(INPUT_FOCUS_CLASS);
      clearErrorField();
    });
    input.addEventListener('blur', function () {
      if (!input.value || input.value == 0) {
        field.classList.remove(INPUT_FOCUS_CLASS);
      }
    });
  }
  return {
    focus: function focus() {
      if (getInputType(field) === 'input') {
        input.focus();
      } else if (getInputType(field) === 'select') {
        input.classList.add(INPUT_FOCUS_CLASS);
      }
    },
    getValue: function getValue() {
      return input.value;
    },
    setError: function setError(errorMsg) {
      errorText.innerText = errorMsg;
      field.classList.add(INPUT_ERROR_CLASS);
    },
    clearValue: function clearValue() {
      _clearValue();
    }
  };
}
;
var nameField = initializeField(nameInputGift);
var emailField = initializeField(emailInputGift);
var selectField = initializeField(selectInputGigt);
var nameFieldForm = initializeField(nameInputFeedback);
var sitFieldForm = initializeField(sitInputFeedback);
giftForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var nameValue = nameField.getValue();
  var emailValue = emailField.getValue();
  var selectValue = selectField.getValue();
  if (!nameValue) {
    nameField.setError('Обязательно для заполнения');
    nameField.focus();
    return;
  }
  ;
  if (!emailValue) {
    emailField.setError('Обязательно для заполнения');
    emailField.focus();
    return;
  }
  ;
  if (!/^[\w.]{1,16}@[\w]{1,12}\.[\w]{1,4}$/.test(emailValue)) {
    emailField.setError('Это неправильный e-mail');
    emailField.focus();
    return;
  }
  ;
  if (selectValue === "none") {
    selectField.setError('Обязательно выберите подарок!');
    selectField.focus();
    return;
  }
  ;
  var data = {
    name: nameValue,
    email: emailValue,
    id: selectValue
  };
  var url = new URL('https://jsonplaceholder.typicode.com/users');
  url.search = new URLSearchParams(data).toString();
  fetch(url.toString());
  popupToggle();
  nameField.clearValue();
  emailField.clearValue();
  selectField.clearValue();
});
feedbackForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var nameValue = nameFieldForm.getValue();
  var selectValue = sitFieldForm.getValue();
  if (!nameValue) {
    nameFieldForm.setError('Обязательно для заполнения');
    nameFieldForm.focus();
    return;
  }
  ;
  if (selectValue === "none") {
    sitFieldForm.setError('Обязательно выберите место!');
    return;
  }
  ;
  var data = {
    name: nameValue,
    id: selectValue
  };
  var url = new URL('https://jsonplaceholder.typicode.com/users');
  url.search = new URLSearchParams(data).toString();
  fetch(url.toString());
  nameFieldForm.clearValue();
  sitFieldForm.clearValue();
});
// innologo.href = "http://university.innopolis.ru"