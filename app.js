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


document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById('postTitle');
    const post = document.getElementById('postContent');
    const postSubmitBtn = document.getElementById('submitPost');
    const showPost = document.getElementById('showPost');

    postSubmitBtn.addEventListener('click', () => {
        if (title.value.trim() === "" || post.value.trim() === "") {
            alert("Title and Post content cannot be empty!");
            return;
        }

        const postId = Date.now();

        // Create post card
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");
        postCard.dataset.id = postId;
        postCard.innerHTML = `
            <h2 class="post-title">${title.value}</h2>
            <p class="post-content">${post.value}</p>
            <div class="post-actions">
                <button class="edit-btn">Edit</button>
                <button class="save-btn" style="display:none;">Save</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Append post card
        showPost.appendChild(postCard);

        // Attach event listeners dynamically
        postCard.querySelector('.edit-btn').addEventListener('click', () => editPost(postCard));
        postCard.querySelector('.save-btn').addEventListener('click', () => savePost(postCard));
        postCard.querySelector('.delete-btn').addEventListener('click', () => deletePost(postCard));

        // Clear input fields
        title.value = "";
        post.value = "";
    });

    function editPost(postCard) {
        const postTitle = postCard.querySelector('.post-title');
        const postContent = postCard.querySelector('.post-content');
        const editBtn = postCard.querySelector('.edit-btn');
        const saveBtn = postCard.querySelector('.save-btn');
        const deleteBtn = postCard.querySelector('.delete-btn');

        // Replace text with input fields for editing
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.value = postTitle.innerText;
        titleInput.classList.add("edit-title");

        const contentInput = document.createElement("textarea");
        contentInput.value = postContent.innerText;
        contentInput.classList.add("edit-content");

        // Replace existing elements with input fields
        postCard.replaceChild(titleInput, postTitle);
        postCard.replaceChild(contentInput, postContent);

        // Toggle button visibility
        editBtn.style.display = "none";
        saveBtn.style.display = "inline-block";
        deleteBtn.style.display = "none"; // Hide delete button while editing
    }

    function savePost(postCard) {
        const titleInput = postCard.querySelector('.edit-title');
        const contentInput = postCard.querySelector('.edit-content');
        const editBtn = postCard.querySelector('.edit-btn');
        const saveBtn = postCard.querySelector('.save-btn');
        const deleteBtn = postCard.querySelector('.delete-btn');

        if (titleInput.value.trim() === "" || contentInput.value.trim() === "") {
            alert("Title and content cannot be empty!");
            return;
        }

        // Restore updated text elements
        const updatedTitle = document.createElement("h2");
        updatedTitle.classList.add("post-title");
        updatedTitle.innerText = titleInput.value;

        const updatedContent = document.createElement("p");
        updatedContent.classList.add("post-content");
        updatedContent.innerText = contentInput.value;

        postCard.replaceChild(updatedTitle, titleInput);
        postCard.replaceChild(updatedContent, contentInput);

        // Toggle button visibility
        editBtn.style.display = "inline-block";
        saveBtn.style.display = "none";
        deleteBtn.style.display = "inline-block"; // Show delete button back
    }

    function deletePost(postCard) {
        if (confirm("Are you sure you want to delete this post?")) {
            postCard.remove();
        }
    }
});
