// Import statements
import { authGuard, isLoggedIn } from "../../utils/authGuard";
import { logout } from '../../ui/auth/logout';
import { setupSearch } from "../../ui/listing/searchListing";
import { onCreateListing } from "../../ui/listing/createListing"

// DOM Elements
const logOutBTN = document.getElementById("logout-btn");
const createListingForm = document.getElementById("create-listing-form")

// Initialize features and guards
    authGuard
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

createListingForm.addEventListener("submit", onCreateListing);

logOutBTN.addEventListener("click", logout);
