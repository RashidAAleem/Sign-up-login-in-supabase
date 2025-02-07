import { supabaseConf } from "./supabase.js";
import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm";

// Handle sign-up functionality
export function handleSignUp() {
  const fullName = document.getElementById("signup-name");
  const SignUpEmail = document.getElementById("signup-email");
  const SignUpPassword = document.getElementById("signup-password");
  const signUpBtn = document.getElementById("signUp-btn");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  // const toLogin = document.getElementById('to-login');  // Link to switch to login form

  if (signUpBtn) {
    signUpBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      signUpBtn.disabled = true;
      // Validate input fields
      if (!fullName.value || !SignUpEmail.value || !SignUpPassword.value) {
        Swal.fire({
          title: "Error",
          text: "All fields are required.",
          icon: "error",
        });
        signUpBtn.disabled = false;
        return;
      }

      try {
        const { data, error } = await supabaseConf.auth.signUp({
          email: SignUpEmail.value,
          password: SignUpPassword.value,
        });

        if (error) {
          Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Success",
            text: "Your account has been created. Click below to login",
            icon: "success",
          }).then(() => {
            signupForm.classList.remove("active");
            loginForm.classList.add("active");
          });
        }
      } catch (err) {
        console.error("Error->", err);
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred. Please try again.",
          icon: "error",
        });
      } finally {
        // Clear the input fields after submission
        fullName.value = "";
        SignUpEmail.value = "";
        SignUpPassword.value = "";
      }
    });
  } else {
    // console.error("Sign-up button not found!");
  }
}
export function handleLogin() {
  // const fullName = document.getElementById('signup-name');
  const loginEmail = document.getElementById("login-email");
  const loginPassword = document.getElementById("login-password");
  const loginBtn = document.getElementById("login-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      loginBtn.disabled = true;
      // Validate input fields
      if (!loginEmail.value || !loginPassword.value) {
        Swal.fire({
          title: "Error",
          text: "All fields are required.",
          icon: "error",
        });
        loginBtn.disabled = false;
        return;
      }

      try {
        const { data, error } = await supabaseConf.auth.signInWithPassword({
          email: loginEmail.value,
          password: loginPassword.value,
        });

        if (error) {
          Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
          });
        } else {
          localStorage.setItem("user", JSON.stringify(data.user))
          Swal.fire({
            title: "Success",
            text: "Login Successful. ",
            icon: "success",
          }).then(() => {
            location.href = "admin.html";
          });
        }
      } catch (err) {
        console.error("Error->", err);
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred. Please try again.",
          icon: "error",
        });
      } finally {
        // Clear the input fields after submission
        // fullName.value = "";
        loginEmail.value = "";
        loginPassword.value = "";
      }
    });
  } else {
    // console.error("Sign-up button not found!");
  }
}
export function handleSignOut() {
  const signOutBtns = [
    document.getElementById("navBar-signOut"),
    document.getElementById("sideBar-signOut"),
  ];

  // Function to handle sign-out
  const signOutHandler = async () => {
    try {
      const { error } = await supabaseConf.auth.signOut();
      if (error) {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Success",
          text: "Logout Successful.",
          icon: "success",
        }).then(() => {
          location.href = "index.html";
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred during logout.",
        icon: "error",
      });
    }
  };

  // Attach event listeners to both buttons if they exist
  signOutBtns.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", signOutHandler);
    }
  });
}

export function handleupdPassword() {
  const openModalBtns = [
    document.getElementById("navBar-updPassword"),
    document.getElementById("sideBar-updPassword"),
  ];

  const modal = document.getElementById("passwordModal");
  const closeBtn = document.querySelector(".close");
  if (!modal || !closeBtn) {
    // console.error("Modal or close button not found!");
    return;
  }
  const updPasswordBtn = document.getElementById("updPassword");
  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  if (!updPasswordBtn) {
    console.error("Update button not found!");
    return;
  }
  // Function to handle sign-out
  const updPasswordHandler = () => {
    modal.style.display = "flex";
  };

  // Attach event listeners to both buttons if they exist
  openModalBtns.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", updPasswordHandler);
    }
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  updPasswordBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      if (newPassword.value === confirmPassword.value) {
        const { data, error } = await supabaseConf.auth.updateUser({
          password: newPassword.value,
        });
        if (error) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
              });
        } else {
          console.log("Password Changed Successfully", data);
          Swal.fire({
            title: "Success",
            text: "Password Update Successful.",
            icon: "success",
          });
        }
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred. Please try again.",
        icon: "error",
      });
    } finally {
      // Clear the input fields after submission
      newPassword.value = "";
      confirmPassword.value = "";
      
    }
  });
}

export function changePassword(){
    const confirmEmail = document.getElementById('confirm-email')
    const newChangePassword = document.getElementById('new-password')
    const confirmChangePassword = document.getElementById('confirm-password')
const changePasswordBtn = document.getElementById('changePassword-btn')
if (changePasswordBtn) {
  
  changePasswordBtn.addEventListener('click',()=>{
    try {
      if (newChangePassword === confirmChangePassword) {
        
      } else {
        console.log("Password Does not match");
        
      }
    } catch (err) {
      console.error(err);
      
    }
  })
}
}
// Initialize the sign-up process when the DOM is ready
// Initialize the sign-up process when the DOM is ready
export function auth() {
  document.addEventListener("DOMContentLoaded", () => {
    handleSignUp();
    handleLogin();
    handleSignOut(); // No need for the check here, as handleSignOut already checks for element existence
    handleupdPassword();
    changePassword();
  });
}
