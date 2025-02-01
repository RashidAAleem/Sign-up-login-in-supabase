const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const changePasswordForm = document.getElementById("changePassword-form");
const toSignup = document.getElementById("to-signup");
const toChangePassword = document.getElementById("to-changePassword");

// Collect multiple "to-login" elements into an array
const toLogin = [
    document.getElementById("to-login"),
    document.getElementById("signUp-to-login")
].filter(el => el !== null); // Remove null values to prevent errors

export function switchToChangePassword() {
    changePasswordForm.classList.add("active");
    loginForm.classList.remove("active");
    signupForm.classList.remove("active");
}

export function switchToLogin() {
    changePasswordForm.classList.remove("active");
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
}

export function switchToSignUp() {
    changePasswordForm.classList.remove("active");
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
}

export function initializeFormSwitch() {
    if (toSignup && toLogin.length > 0 && toChangePassword) {
        toChangePassword.addEventListener("click", switchToChangePassword);
        toSignup.addEventListener("click", switchToSignUp);
        
        // Loop through toLogin array and add event listeners
        toLogin.forEach(btn => {
            btn.addEventListener("click", switchToLogin);
        });
    }
}

// Ensure elements exist before initializing form switch
if (loginForm || signupForm || changePasswordForm) {
    document.addEventListener("DOMContentLoaded", initializeFormSwitch);
}
