import formFunctions from './toggle.js';
import {auth} from './auth.js'
// import { supabase } from "./supabase.js";
formFunctions.toggleHamburgerMenu();
formFunctions.toggleForms();

auth();

// const loginEmail = document.getElementById("loginEmail");
//   const loginPassword = document.getElementById("loginPassword");
// const loginBtn = document.getElementById("login");

// loginBtn.addEventListener('click', async(e)=>{
//     e.preventDefault();
// try {
//     const { data, error } = await supabase.auth.signInWithPassword({
//         email: loginEmail.value,
//         password: loginPassword.value,
//       })
//           if (error) {
//         console.log("Error", error);
//       } else {
//         console.log("Success", data);
//       }

// } catch (err) {
//     console.log(err);
    
// }

// })