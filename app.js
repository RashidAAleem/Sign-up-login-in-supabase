import formFunctions from './toggle.js';
<<<<<<< HEAD
import {auth} from './auth.js'
// import { supabase } from "./supabase.js";
=======

// to check

//signout
try {
const signOut = document.getElementById('signOut')
signOut.addEventListener('click', async(e)=>{
    e.preventDefault();
    console.log("clicked");
    
    const { error } = await supabase.auth.signOut()
    
    if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Sign Out Failed',
                text: error.message,
                showClass: {
                    popup: 'animate__animated animate__fadeInUp animate__faster'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutDown animate__faster'
                }
            });        
        } else {
            // If sign-out is successful, show success alert
            Swal.fire({
                icon: 'success',
                title: 'You have been signed out!',
                text: 'You are now logged out.',
                confirmButtonText: 'Go to Home',
                showClass: {
                    popup: 'animate__animated animate__fadeInUp animate__faster'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutDown animate__faster'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirect to index.html after confirming the alert
                    window.location.href = 'index.html';
                }
            });
        }
    });


    
} catch (error) {
    console.error("Sign out error: ", error.message);
}

// Initialize functions
>>>>>>> eb645237449901b7c735b8b051ee89ebf0564bf6
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