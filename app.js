import { init } from "./responsive.js";
import { initializeFormSwitch } from "./toggleSignUplogIn.js";
import { auth } from "./auth.js";
// import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';
init();

// toggle between signup and login form
initializeFormSwitch();

// login signup
auth();


// handleupdPassword();
let userContent = document.getElementById('content');

let userData = JSON.parse(localStorage.getItem("user"));
console.log(userData);

if (userData) {

    userContent.innerHTML = `<h2> Welcome, ${userData.email}</h2>
    <p>User Id: ${userData.id}</p>`
    
} else {
    userContent.innerHTML = `<p>No user Data found. please login</p>`
}

