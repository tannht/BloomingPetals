function Validator(options) {
    var selectorRules = {};
    //set rule
    function validate(inputElement, rule) {
        var errorMessage;
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        //get rules array of selector
        var rules = selectorRules[rule.selector]
        //loop and check
        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
        return !errorMessage;
    }
    //get form element
    var formElement = document.querySelector(options.form);
    if (formElement) {
        //when submit form
        formElement.onsubmit = (e) => {
            e.preventDefault();
            var isFormValid = true;
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });          
                        
            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        values[input.name] = input.value;
                        return values;
                    }, {});
                    options.onSubmit(formValues);
                    
                }
            }
            
        }
        //loop validate
        options.rules.forEach(function (rule) {
            // save rules
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {

                // On Blur
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                // On input
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });

    }

}

Validator.isRequired = function (selector, errorMgs) {
    return {
        selector: selector,
        test: (value) => {

            return value.trim() ? undefined : errorMgs || `Error!`;
        }

    };
}
Validator.isEmail = function (selector, errorMgs) {
    return {
        selector: selector,
        test: (value) => {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : errorMgs || `Error!`;
        }

    };
}
Validator.minLength = function (selector, min, errorMgs) {
    return {
        selector: selector,
        test: (value) => {
            return value.length >= min ? undefined : errorMgs || `Error!`;
        }

    };
}
Validator.isConfirmed = function (selector, getConfirmValue, errorMgs) {
    return {
        selector: selector,
        test: (value) => {
            return value === getConfirmValue() ? undefined : errorMgs || `Error!`;
        }
    }
}


function isSubscribe(selector, msg) {
    var formElement = document.querySelector(selector);
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var email = $('input[type="email"]').val();
        
    if (!regex.test(email)) {
      formElement.onsubmit = (e) => {
        e.preventDefault();
      }
      alert('Please enter correct email!')
    } else {
      alert(email + '!' + ' ' + msg)
      formElement.reset();
    }
  }