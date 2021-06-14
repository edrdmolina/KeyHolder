let passwordValue;
let confirmPasswordValue;
const submitBtn = document.querySelector('#submitBtn');
const password = document.querySelector('#newPassword');
const confirmPassword = document.querySelector('#passwordConfirmation');
const validationMessage = document.querySelector('#validationMessage');

const validatePassword = (message, add, remove) => {
    validationMessage.textContent = message;
    validationMessage.classList.add(add);
    validationMessage.classList.remove(remove);
}

confirmPassword.addEventListener('input', e => {
    e.preventDefault();
    passwordValue = password.value;
    confirmPasswordValue = confirmPassword.value;
    if (confirmPasswordValue !== passwordValue) {
        validatePassword('Passwords must match!', 'color-red', 'color-green')
        submitBtn.setAttribute('disabled', true);
    } else {
        validatePassword('Passwords match!', 'color-green', 'color-red')
        submitBtn.removeAttribute('disabled');
    }
})