// Exportable function to handle sidebar open/close actions
export function handleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const menuButton = document.querySelector(".menu-button");
    const closeButton = document.querySelector(".close-button");

    // Sidebar open/close functions
    menuButton.addEventListener("click", function () {
        sidebar.classList.add("active");
    });

    closeButton.addEventListener("click", function () {
        sidebar.classList.remove("active");
    });
}

// Exportable function to handle theme toggle actions
export function handleThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");

    // Theme Toggle Function
    function toggleTheme() {
        document.body.classList.toggle("dark-theme");

        // Store the theme in local storage
        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙 Dark Mode";
        }
    }

    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
        themeToggle.textContent = "☀️ Light Mode";
    }

    themeToggle.addEventListener("click", toggleTheme);
}

// Function to initialize all actions after DOM is fully loaded
export function init() {
    handleSidebar();
    handleThemeToggle();
}

