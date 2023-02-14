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

function initializeField(field) {
    function getInputType (inpt) {
        if (inpt.getElementsByTagName('select').length === 1) {
           return type = 'select'
        } else if (inpt.getElementsByTagName('input').length === 1) {
            return type = 'input'
        }
    }
    function clearErrorField(){
        if (errorText) {
            field.classList.remove(INPUT_ERROR_CLASS);
            errorText.innerText = "";
        }
    };
    function clearValue(){
        if (getInputType(field) === 'input'){
        input.value = "";
        field.classList.remove(INPUT_FOCUS_CLASS)
        } else if(getInputType(field) === 'select') {
            input.selectedIndex = 0;
            field.classList.remove(INPUT_FOCUS_CLASS)
            clearErrorField();
        }
    }
    const input = field.getElementsByTagName(getInputType(field))[0];
    const errorText = field.querySelector('.formlabel__error-msg');
    clearValue();
    clearErrorField();
    field.classList.remove(INPUT_FOCUS_CLASS);
    if (getInputType(field) === 'input') {
            input.addEventListener('focus', function(){
            field.classList.add(INPUT_FOCUS_CLASS)
        });
        input.addEventListener('input', clearErrorField);
        input.addEventListener('blur', function(){
        if (!input.value) {
            field.classList.remove(INPUT_FOCUS_CLASS)
            clearErrorField()
        }
    });
    } else if (getInputType(field) === 'select') {
        input.addEventListener('change', function(){
            field.classList.add(INPUT_FOCUS_CLASS);
            clearErrorField();
        });
        input.addEventListener('blur', function(){
            if (!input.value || input.value == 0) {
                field.classList.remove(INPUT_FOCUS_CLASS)
            }
        });
    }
    return {
        focus(){
            if (getInputType(field) === 'input') {
            input.focus()
            } else if (getInputType(field) === 'select') {
                input.classList.add(INPUT_FOCUS_CLASS);
            }
        },
        getValue(){
            return input.value
        },
        setError(errorMsg){
            errorText.innerText = errorMsg;
            field.classList.add(INPUT_ERROR_CLASS);
        },
        clearValue(){
            clearValue()
        }
    }
};
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
        nameField.focus();
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
    nameFieldForm.clearValue();
    sitFieldForm.clearValue();
})
// innologo.href = "http://university.innopolis.ru"