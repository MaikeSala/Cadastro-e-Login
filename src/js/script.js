let Validator = {
    handleSubnimt: (event) => {
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');
        
        Validator.clearErrors();

        for(let i = 0; i<inputs.length; i++){
            let input = inputs[i];
            let check = Validator.checkInput(input);
            if(check !== true) {
                send = false;
                Validator.showError(input, check);
            }
        }

        if(send) {
            form.submit();
        }
    },

    checkInput(input) {
        let rules = input.getAttribute('rules');

        if(rules !== null) {
            rules = rules.split('|');
            for(let i in rules) {
                let rDetails = rules[i].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo vazio.'
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return 'Campo tem que ter '+rDetails[1]+' caracteres'
                        }
                    break;
                    case 'email':
                        if(input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é válido!';
                            }
                        }
                    break;
                }
            }
        }
        return true;
    },
    showError: (input, error) => {
        input.style.borderColor ='#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement,input.ElementSibling);
    },
    clearErrors: () => {
        let input = form.querySelectorAll('input');

        for(let j = 0; j < input.length; j++){
            input[j].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
}

const form = document.querySelector(".validator");
form.addEventListener('submit',Validator.handleSubnimt);