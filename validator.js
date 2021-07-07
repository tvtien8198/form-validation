const Validator = (options) => {
    const SelectorRules = {}

    const formElement = document.querySelector(options.form)

    const getParent = (element, selector) => {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    const validate = (inputElement, rule) => {

        let errorMessage
        const errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
        const rules = SelectorRules[rule.selector]
        for (let i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    )
                    break;
                default:
                    errorMessage = rules[i](inputElement.value)
            }
            if (errorMessage) break
        }
        if (errorMessage) {
            errorElement.innerText = errorMessage
            getParent(inputElement, options.formGroupSelector).classList.add("invalid")
        } else {
            errorElement.innerText = ""
            getParent(inputElement, options.formGroupSelector).classList.remove("invalid")
        }
        return !errorMessage
    }
    if (formElement) {
        formElement.onsubmit = (e) => {
            e.preventDefault()
            let isFormValid = true
            options.rules.forEach(rule => {
                const inputElement = formElement.querySelector(rule.selector)
                let isValid = validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false
                }
            })

            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    const enableInput = formElement.querySelectorAll('[name]')
                    const formValues = Array.from(enableInput).reduce((values, input) => {
                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value
                                break
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files
                                break
                            default:
                                values[input.name] = input.value
                        }
                        return values
                    }, {})

                    options.onSubmit(formValues)
                }
            } else {
                console.log("co loi")
            }
        }
        options.rules.forEach(rule => {
            if (Array.isArray(SelectorRules[rule.selector])) {
                SelectorRules[rule.selector].push(rule.test)
            } else {
                SelectorRules[rule.selector] = [rule.test]
            }
            const inputElements = formElement.querySelectorAll(rule.selector)

            Array.from(inputElements).forEach(inputElement => {

                const parentInputElement = inputElement.parentElement

                const errorIcon = parentInputElement.querySelector(".fa-exclamation-circle")

                inputElement.onblur = () => {
                    validate(inputElement, rule)
                    if (inputElement.value != "") {
                        inputElement.classList.add("has-text")
                    } else {
                        inputElement.classList.remove("has-text")
                        if (errorIcon) {
                            errorIcon.classList.add("invalid")
                        }
                    }
                }
                inputElement.oninput = () => {
                    const errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
                    errorElement.innerText = ""
                    getParent(inputElement, options.formGroupSelector).classList.remove("invalid")
                    if (errorIcon) {
                        errorIcon.classList.remove("invalid")
                    }
                }

            })

        })
    }
}

Validator.isRequired = (selector, message) => {
    return {
        selector: selector,
        test(value) {
            return value ? undefined : message || "Vui Long nhap truong nay!"
        }
    }
}

Validator.isEmail = (selector, message) => {
    return {
        selector: selector,
        test(value) {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return regex.test(value) ? undefined : message || "Trường này phải là Email! "
        }
    }
}

Validator.isPhone = (selector, message) => {
    return {
        selector: selector,
        test(value) {
            const regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
            return regex.test(value) ? undefined : message || "Trường này phải là Số Điện thoại! "
        }
    }
}

Validator.minLength = (selector, min, message) => {
    return {
        selector: selector,
        test(value) {
            return value.length >= min ? undefined : message || `Vui Lòng nhập tối thiểu ${min} Ký tự`
        }
    }
}

Validator.isConfirmation = (selector, getConfirmValue, message) => {
    return {
        selector: selector,
        test(value) {
            return value === getConfirmValue() ? undefined : message || " Gia tri nhap khong chinh xac"
        }
    }
}

Validator.isEmailAndPhone = (selector, message) => {
    return {
        selector: selector,
        test(value) {
            const rePhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
            const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return rePhone.test(value) || reEmail.test(value) ? undefined : message || "Trường này phải là Email hoặc Số điện thoại! "
        }
    }
}
