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

const giftForm = document.getElementById("popup-prize");
const btnGiftOpen = document.querySelector('#btn-gift');
const btnGiftClose = document.querySelector('#popup-btn');
const nameInputGift = document.querySelector("#popup-prize input[name='name']").parentNode;
const emailInputGift = document.querySelector("#popup-prize input[name='email']").parentNode;
const selectInputGigt = document.querySelector('#selectPrize').parentNode;
const nameInputFeedback = document.querySelector('#nameFeedback').parentNode;
const sitInputFeedback = document.querySelector('#sit').parentNode;
const btnFeedback = document.querySelector('#btnFeedback');
const feedbackForm = document.getElementById('reviewForm')
const INPUT_ERROR_CLASS = 'formlabel-error';
const INPUT_FOCUS_CLASS = 'formlabel-focused';

function popupToggle () {
    giftForm.classList.toggle('hidden')
};
btnGiftOpen.onclick = function() {
    popupToggle();
    nameField.focus();
};
btnGiftClose.onclick = function(){
    popupToggle();
    nameField.clearImput();
    emailField.clearImput();
    selectField.clearValue();
};


function initializeField(field) {
    const input = field.getElementsByTagName('input')[0];
    const errorText = field.querySelector('.formlabel__error-msg');
    errorText.innerText = "";
    clearErrorField();
    input.value = "";
    function clearErrorField(){
        const errorText = field.querySelector('.formlabel__error-msg');
        field.classList.remove(INPUT_ERROR_CLASS);
        errorText.innerText = "";
    };
    field.classList.remove(INPUT_FOCUS_CLASS);
    input.addEventListener('focus', function(){
        field.classList.add(INPUT_FOCUS_CLASS)
    });
    input.addEventListener('input', clearErrorField);
    input.addEventListener('blur', function(){
        if (!input.value) {
            field.classList.remove(INPUT_FOCUS_CLASS)
        }
    });
    return {
        focus(){
            input.focus()
        },
        getValue(){
            return input.value
        },
        setError(errorMsg){
            errorText.innerText = errorMsg;
            field.classList.add(INPUT_ERROR_CLASS);
        },
        clearImput(){
            input.value = "";
            field.classList.remove(INPUT_FOCUS_CLASS)
        }
    }
};

function initializeSelect(select){
    const inpSelect = select.getElementsByTagName('select')[0];
    const errorText = select.querySelector('.formlabel__error-msg');
    errorText.innerText = "";
    clearErrorField();
    inpSelect.selectedIndex = 0;
    function clearErrorField(){
        const errorText = select.querySelector('.formlabel__error-msg');
        select.classList.remove(INPUT_ERROR_CLASS);
        errorText.innerText = "";
    };
    select.classList.remove(INPUT_FOCUS_CLASS);
    inpSelect.addEventListener('change', function(){
        select.classList.add(INPUT_FOCUS_CLASS);
        clearErrorField();
    });
    inpSelect.addEventListener('blur', function(){
        if (!inpSelect.value) {
            select.classList.remove(INPUT_FOCUS_CLASS)
        }
    });
    return {
        focus(){
            select.classList.add(INPUT_FOCUS_CLASS);
        },
        getValue(){
            return inpSelect.value
        },
        setError(errorMsg){
            errorText.innerText = errorMsg;
            select.classList.add(INPUT_ERROR_CLASS);
        },
        clearValue(){
            inpSelect.selectedIndex = 0;
            select.classList.remove(INPUT_FOCUS_CLASS)
        }
    }
};

const nameField = initializeField(nameInputGift);
const emailField = initializeField(emailInputGift);
const selectField = initializeSelect(selectInputGigt);
const nameFieldForm = initializeField(nameInputFeedback);
const sitFieldForm = initializeSelect(sitInputFeedback);

giftForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const nameValue = nameField.getValue();
    const emailValue = emailField.getValue();
    const selectValue = selectField.getValue();
    if (!nameValue) {
        nameField.setError('Обязательно для заполнения');
        nameField.focus();
        return
    };
    if (!emailValue) {
        emailField.setError('Обязательно для заполнения');
        emailField.focus();
        return
    };
    if (!/^[\w]{3,16}@[a-z]{3,8}\.[a-z]{2,3}$/.test(emailField)) {
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
    nameField.clearImput();
    emailField.clearImput();
    selectField.clearValue();
});

feedbackForm.addEventListener('submit', function (event){
    event.preventDefault();
    const nameValue = nameFieldForm.getValue();
    const selectValue = sitFieldForm.getValue();
    if (!nameValue) {
        nameFieldForm.setError('Обязательно для заполнения');
        nameFieldForm.focus();
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
    nameFieldForm.clearImput();
    sitFieldForm.clearValue();
})