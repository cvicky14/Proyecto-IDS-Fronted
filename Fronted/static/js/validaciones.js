document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.querySelector('.register-form'); 

    registerForm.addEventListener('submit', function(e) {
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const passwordError = document.getElementById('password-error');

        if (newPassword !== confirmPassword) {
            e.preventDefault();  // Previene que el formulario se envíe
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';  // Oculta el mensaje de error si las contraseñas coinciden
        }
    });
});

const togglePassword = document.querySelectorAll('.toggle-password');
const passwordFields = document.querySelectorAll('.password-container input[type="password"]');
const registerForm = document.querySelector('.register-form');
const loginForm = document.querySelector('form:not(.register-form)');
const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');
const formTitle = document.getElementById('form-title');

togglePassword.forEach(toggle => {
    toggle.addEventListener('click', function () {
        const type = this.previousElementSibling.getAttribute('type') === 'password' ? 'text' : 'password';
        this.previousElementSibling.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
});

registerLink.addEventListener('click', function (e) {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    formTitle.textContent = "Create Account";
});

loginLink.addEventListener('click', function (e) {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    formTitle.textContent = "LOG IN";
});

function toggleHelpCenterFields() {
    const userType = document.getElementById('user-type').value;
    const fields = document.querySelectorAll('.help-center-fields');
    if (userType === 'association') {
        fields.forEach(field => field.style.display = 'block');
    } else {
        fields.forEach(field => field.style.display = 'none');
    }
}

function goBackToLogin() {
    const registerForm = document.querySelector('.register-form');
    const loginForm = document.querySelector('form:not(.register-form)');
    
    registerForm.style.display = 'none';
    
    loginForm.style.display = 'block';
    
    document.getElementById('form-title').textContent = "LOG IN";
}
