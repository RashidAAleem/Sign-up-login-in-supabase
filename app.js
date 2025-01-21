// app.js
import { supabase } from "./supabase.js";
import formFunctions from './toggle.js';

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
formFunctions.toggleHamburgerMenu();
formFunctions.toggleForms();

//reset password

// const changePassword = document.getElementById('changePassword');
// changePassword.addEventListener('click', async (e) => {
//     e.preventDefault();
    
//     const phoneNo = document.getElementById('confirmPhone').value; // .value is needed to get input field value
//     const email = document.getElementById('confirmEmail').value;   // Same as above
//     const newPassword = document.getElementById('newPassword').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;

//     // Check if new password and confirm password match
//     if (newPassword !== confirmPassword) {
//         alert("New Password and Confirm Password do not match.");
//         return;
//     }

//     try {
//         // Query user based on email and phone number
//         const { data: user, error: userError } = await supabase
//             .from('Users')
//             .select('*')
//             .eq('email', email)
//             .eq('phone', phoneNo)
//             .single(); // Make sure only one user is returned

//         if (userError) {
//             alert('User not found or error in validation');
//             return;
//         }

//         // Update password using Supabase auth
//         const { error: passwordUpdateError } = await supabase.auth.updateUser({
//             password: newPassword,
//         });

//         if (passwordUpdateError) {
//             alert('Error updating password');
//             return;
//         }

//         alert('Password successfully updated');
//     } catch (error) {
//         console.error(error.message);
//         alert('An error occurred. Please try again.');
//     }
// });


//signup

try { 
    const signUpBtn = document.getElementById('signUp');
    signUpBtn.addEventListener('click', async(e) => {
        e.preventDefault();  // Prevent page reload
        const firstName = document.getElementById('signUpFName').value;
        const lastName = document.getElementById('signUpLName').value;
        const phoneNo = document.getElementById('signUpPhone').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('signUpPassword').value;
        
        // Sign up the user using Supabase auth
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (signUpError) {
            // Display error alert
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: signUpError.message,
                showClass: { popup: 'animate__animated animate__fadeInUp animate__faster' },
                hideClass: { popup: 'animate__animated animate__fadeOutDown animate__faster' }
            });
        } else {
            // Add the user data to the authUser table
            const { error: dbError } = await supabase
                .from('authUser')
                .insert({
                    user_id: signUpData.user.id,  // Associate the user's ID
                    firstName: firstName,
                    lastName: lastName,
                    phoneNo: phoneNo,
                    email: email
                });

            if (dbError) {
                // Display error if data insertion fails
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error saving user data: ' + dbError.message,
                });
            } else {
                // Display success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Sign-up Successful!',
                    text: 'Your account has been created successfully.',
                    confirmButtonText: 'Go to Login',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Toggle to login form
                        const loginForm = document.getElementById('loginForm');
                        const signUpForm = document.getElementById('signUpForm');
                        loginForm.classList.remove('hidden');
                        signUpForm.classList.add('hidden');
                    }
                });
            }
        }
    });
} catch (error) {
    console.error('Unexpected error:', error.message);
}




//login

try {
    const loginBtn = document.getElementById('login')
    loginBtn.addEventListener('click', async(e)=>{
        e.preventDefault();
        const email = document.getElementById('loginEmail')
        const password = document.getElementById('loginPassword')

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
          })
          if (error) {
            // Display an error alert if sign-up fails
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message,
              showClass: {
                  popup: 'animate__animated animate__fadeInUp animate__faster'
              },
              hideClass: {
                  popup: 'animate__animated animate__fadeOutDown animate__faster'
              }
          });
          } else {
          // Display success alert if sign-up is successful
          Swal.fire({
              icon: 'success',
              title: 'Log-In Successful!',
              text: 'Your have been logged in successfully.',
              confirmButtonText: 'Continue to Admin',
              showClass: {
                  popup: 'animate__animated animate__fadeInUp animate__faster'
              },
              hideClass: {
                  popup: 'animate__animated animate__fadeOutDown animate__faster'
              }
          }).then((result) => {
              if (result.isConfirmed) {
                  // Redirect to admin.html

                  window.location.href = 'admin.html'
                
              }
          });
          }
          });
} catch (error) {
    console.error(error.message)
}

// const displayData = document.getElementById('data')

const displayData = document.getElementById('data');

(async () => {
    try {
        const { data, error } = await supabase
            .from('authUser') // Correct query
            .select('*'); // Fetch all columns

        if (error) {
            console.error("Error fetching data from authUser table:", error);
            return;
        }

        if (data.length > 0) {
            // Generate rows dynamically
            const rows = data.map(user => `
                <tr>
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.phoneNo}</td>
        <td>${user.email}</td>
        <td>
            <div class="custom-dropdown">
                <button class="dropdown-btn">Select</button>
                <div class="dropdown-content">
                    <a href="#" onclick="editUser(${user.id})">Edit</a>
                    <a href="#" onclick="deleteUser(${user.id})">Delete</a>
                </div>
            </div>
        </td>
    </tr>
            `).join(''); // Combine rows into a single string

            // Insert rows into the table
            displayData.innerHTML = rows;
        } else {
            displayData.innerHTML = '<tr><td colspan="5">No users found</td></tr>';
        }
    } catch (error) {
        console.error("Unexpected error:", error);
    }
})();

