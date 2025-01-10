// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const toggleBtn = document.querySelectorAll('.toggle-btn')
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active'); // Toggle the X animation

});

//   // Toggle between login and signup forms
//   function toggleForms() {
//   }
toggleBtn.forEach(button => {
    button.addEventListener('click', () => {
        const loginForm = document.getElementById('loginForm');
        const signUpForm = document.getElementById('signUpForm');
        loginForm.classList.toggle('hidden');
        signUpForm.classList.toggle('hidden');

    })
})


const firstName = document.getElementById('signUpFName')
const lastName = document.getElementById('signUpLName')
const phoneNo = document.getElementById('signUpPhone')
const email = document.getElementById('email')
const signUp = document.getElementById('signUp')

const data = function(){
    return{
        email: email.value,
        phoneNo: phoneNo.value,
        lastName: lastName.value,
        firstName: firstName.value,

    }
    
}
signUp.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log(data());
    
})
