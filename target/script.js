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
var selectInputGigt = document.querySelector('#selectPrize').parentNode;
var nameInputFeedback = document.querySelector('#nameFeedback').parentNode;
var sitInputFeedback = document.querySelector('#sit').parentNode;
var btnFeedback = document.querySelector('#btnFeedback');
var feedbackForm = document.getElementById('reviewForm');
var INPUT_ERROR_CLASS = 'formlabel-error';
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
  errorText.innerText = "";
  clearErrorField();
  input.value = "";
  function clearErrorField() {
    var errorText = field.querySelector('.formlabel__error-msg');
    field.classList.remove(INPUT_ERROR_CLASS);
    errorText.innerText = "";
  }
  ;
  field.classList.remove(INPUT_FOCUS_CLASS);
  input.addEventListener('focus', function () {
    field.classList.add(INPUT_FOCUS_CLASS);
  });
  input.addEventListener('input', clearErrorField);
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
      field.classList.add(INPUT_ERROR_CLASS);
    },
    clearImput: function clearImput() {
      input.value = "";
      field.classList.remove(INPUT_FOCUS_CLASS);
    }
  };
}
;
function initializeSelect(select) {
  var inpSelect = select.getElementsByTagName('select')[0];
  var errorText = select.querySelector('.formlabel__error-msg');
  errorText.innerText = "";
  clearErrorField();
  inpSelect.selectedIndex = 0;
  function clearErrorField() {
    var errorText = select.querySelector('.formlabel__error-msg');
    select.classList.remove(INPUT_ERROR_CLASS);
    errorText.innerText = "";
  }
  ;
  select.classList.remove(INPUT_FOCUS_CLASS);
  inpSelect.addEventListener('change', function () {
    select.classList.add(INPUT_FOCUS_CLASS);
    clearErrorField();
  });
  inpSelect.addEventListener('blur', function () {
    if (!inpSelect.value) {
      select.classList.remove(INPUT_FOCUS_CLASS);
    }
  });
  return {
    getValue: function getValue() {
      return inpSelect.value;
    },
    setError: function setError(errorMsg) {
      errorText.innerText = errorMsg;
      select.classList.add(INPUT_ERROR_CLASS);
    },
    clearValue: function clearValue() {
      inpSelect.selectedIndex = 0;
      select.classList.remove(INPUT_FOCUS_CLASS);
    }
  };
}
;
var nameField = initializeField(nameInputGift);
var emailField = initializeField(emailInputGift);
var selectField = initializeSelect(selectInputGigt);
var nameFieldForm = initializeField(nameInputFeedback);
var sitFieldForm = initializeSelect(sitInputFeedback);
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
  if (selectValue === "none") {
    selectField.setError('Обязательно выберите подарок!');
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
  nameField.clearImput();
  emailField.clearImput();
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
  nameFieldForm.clearImput();
  sitFieldForm.clearValue();
});