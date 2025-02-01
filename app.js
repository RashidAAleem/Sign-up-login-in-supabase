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
