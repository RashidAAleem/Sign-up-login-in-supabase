import { init } from "./responsive.js";
import { initializeFormSwitch } from "./toggleSignUplogIn.js";
import { auth } from "./auth.js";

// Initialize functionalities
init();
initializeFormSwitch();
auth();

// =================== USER DATA HANDLING ===================
const userContent = document.getElementById("content");
const user = document.getElementById("userName");
let userData = JSON.parse(localStorage.getItem("userDetails")) || {};

// Display user greeting if data exists
if (userData.firstName && userData.lastName) {
    user.innerHTML = `<h3> Hi! ${userData.firstName} ${userData.lastName}</h3>`;
}

// =================== PROFILE DROPDOWN FUNCTIONALITY ===================
const dropDown = document.getElementById("profileToggle");
const listProfile = document.getElementById("profileDropdown");
const caretIcon = dropDown.querySelector(".fa-caret-down");

dropDown.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevents event bubbling

    // Toggle dropdown visibility and caret icon
    const isDropdownVisible = listProfile.style.display === "block";
    listProfile.style.display = isDropdownVisible ? "none" : "block";
    caretIcon.classList.toggle("fa-caret-up", !isDropdownVisible);
    caretIcon.classList.toggle("fa-caret-down", isDropdownVisible);
});

// Hide dropdown when clicking outside
document.addEventListener("click", (event) => {
    if (!dropDown.contains(event.target) && !listProfile.contains(event.target)) {
        listProfile.style.display = "none";
        caretIcon.classList.remove("fa-caret-up");
        caretIcon.classList.add("fa-caret-down");
    }
});

// =================== PROFILE MODAL FUNCTIONALITY ===================
const profileModal = document.getElementById("profileModal");
const closeProfileModal = document.querySelector("#profileModal .close");
const profileForm = document.getElementById("profileForm");
const editButton = document.getElementById("editProfile");
const saveButton = document.getElementById("saveProfile");

const firstNameField = document.getElementById("firstName");
const lastNameField = document.getElementById("lastName");
const phoneField = document.getElementById("phone");

// =================== PROFILE IMAGE UPLOAD FUNCTIONALITY ===================
const profileImage = document.getElementById("profileImage");
const uploadInput = document.getElementById("uploadProfileImage");
const changeImageButton = document.getElementById("changeImage");

// Load stored profile image
const storedImage = localStorage.getItem("profileImage");
if (storedImage) {
    profileImage.src = storedImage;
}

// Show Profile Modal on Click
document.getElementById("navBar-updProfile").addEventListener("click", () => {
    firstNameField.value = userData.firstName || "";
    lastNameField.value = userData.lastName || "";
    phoneField.value = userData.phoneNo || ""; // Handle missing phone number

    profileModal.style.display = "flex";
});

// Close Modal
closeProfileModal.addEventListener("click", () => {
    profileModal.style.display = "none";
});

// Enable Editing
editButton.addEventListener("click", () => toggleEditMode(true));

// Save Profile
profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveProfileData();
});

// Handle Profile Image Change
changeImageButton.addEventListener("click", () => uploadInput.click());

uploadInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImage.src = e.target.result;
            localStorage.setItem("profileImage", e.target.result); // Save image in localStorage
        };
        reader.readAsDataURL(file);
    }
});

// =================== HELPER FUNCTIONS ===================
function toggleEditMode(enable) {
    firstNameField.toggleAttribute("disabled", !enable);
    lastNameField.toggleAttribute("disabled", !enable);
    phoneField.toggleAttribute("disabled", !enable);

    editButton.style.display = enable ? "none" : "inline-block";
    saveButton.style.display = enable ? "inline-block" : "none";
}

function saveProfileData() {
    userData = {
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        phoneNo: phoneField.value,
    };

    localStorage.setItem("userDetails", JSON.stringify(userData));

    toggleEditMode(false);
    alert("Profile updated successfully!");
}
