// Import statements
import { setupSearch } from "../../ui/listing/searchListing";
import { isLoggedIn } from "../../utils/authGuard";
import { onRegister } from "../../ui/auth/register";

// DOM Elements
const form = document.getElementById("signup-form")

// Initialize features and guards
    updateLayout();
    setupSearch();

// Functions

/**
 * Updates the layout based on login status.
 */
function updateLayout() {
    const loggedIn = isLoggedIn();

    const registerBtn = document.getElementById("register-btn");
    const loginBtn = document.getElementById("login-btn");
    const logOutBtn = document.getElementById("logout-btn");
    const navMenu = document.getElementById("nav-menu")

    if (loggedIn) {
        loginBtn.classList.add("hidden");
        registerBtn.classList.add("hidden");
        logOutBtn.classList.remove("hidden");
        navMenu.classList.add("block")
        navMenu.classList.remove("hidden")
    } else {
        loginBtn.classList.remove("hidden");
        registerBtn.classList.remove("hidden");
        logOutBtn.classList.add("hidden");
    }
}

form.addEventListener("submit", onRegister);