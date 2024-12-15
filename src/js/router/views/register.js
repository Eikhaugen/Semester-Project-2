// Import statements
import { isLoggedIn } from "../../utils/authGuard";
import { onRegister } from "../../ui/auth/register";

// DOM Elements
const form = document.getElementById("signup-form")

// Initialize features and guards
    updateLayout();

// Functions

/**
 * Updates the layout based on login status.
 */
function updateLayout() {
    const loggedIn = isLoggedIn();

    const registerBtn = document.getElementById("register-btn");
    const loginBtn = document.getElementById("login-btn");
    const navMenu = document.getElementById("nav-menu")

    if (loggedIn) {
        loginBtn.classList.add("hidden");
        registerBtn.classList.add("hidden");
        navMenu.classList.add("block")
        navMenu.classList.remove("hidden")
    } else {
        loginBtn.classList.remove("hidden");
        registerBtn.classList.remove("hidden");
    }
}

form.addEventListener("submit", onRegister);