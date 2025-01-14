// Function to toggle hamburger menu
function toggleHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active'); // Toggle the X animation
    });
}

// Function to toggle between login and signup forms
function toggleForms() {
    const toggleBtn = document.querySelectorAll('.toggle-link');

    toggleBtn.forEach(button => {
        button.addEventListener('click', () => {
            const loginForm = document.getElementById('loginForm');
            const signUpForm = document.getElementById('signUpForm');
            const forgetForm = document.getElementById('forgetForm');
            // Toggle 'hidden' class to show/hide forms
             // Check which button is clicked and toggle visibility accordingly
             if (button.classList.contains('signUp-link')) {
                // Show Sign Up form and hide others
                loginForm.classList.add('hidden');
                signUpForm.classList.remove('hidden');
                forgetForm.classList.add('hidden');
            }

            if (button.classList.contains('forgot-password-link')) {
                // Show Forgot Password form and hide others
                loginForm.classList.add('hidden');
                signUpForm.classList.add('hidden');
                forgetForm.classList.remove('hidden');
            }

            if (button.classList.contains('login-link')) {
                // Show Login form and hide others
                loginForm.classList.remove('hidden');
                signUpForm.classList.add('hidden');
                forgetForm.classList.add('hidden');
            }
        });
    });
}





// Exporting all functions in a single object
export default {
    toggleHamburgerMenu,
    toggleForms,
       
};
