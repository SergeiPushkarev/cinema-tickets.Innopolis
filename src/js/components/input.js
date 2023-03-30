export function initializeField(field) {
    const INPUT_ERROR_CLASS = 'formlabel-error';
    const INPUT_FOCUS_CLASS = 'formlabel-focused';
    function getInputType (inpt) {
        let type
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
            clearErrorField()
        if (!input.value) {
            field.classList.remove(INPUT_FOCUS_CLASS)
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