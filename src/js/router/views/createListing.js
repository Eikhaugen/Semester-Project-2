// Import statements
import { isLoggedIn } from "../../utils/authGuard";
import { toggleMenu } from '../../ui/toggleMenu';
import { logout } from '../../ui/auth/logout';
import { setupSearch } from "../../ui/listing/searchListing";
import { onCreateListing } from "../../ui/listing/createListing";

// DOM Elements
const navbarToggle = document.getElementById("navbar-toggle");
const navMenu = document.getElementById("nav-menu");
const logOutBTN = document.getElementById("logout-btn");
const createListingForm = document.getElementById("create-listing-form")

// Initialize features and guards
    initializeMenu();
    updateLayout();
    setupSearch();


// Functions

/**
 * Initializes the toggle menu functionality.
 */
function initializeMenu() {
    if (navbarToggle && navMenu) {
        toggleMenu(navbarToggle, navMenu);
    } else {
        console.error("Navbar toggle or menu not found in the DOM.");
    }
}

/**
 * Updates the layout based on login status.
 */
function updateLayout() {
    const loggedIn = isLoggedIn();

    const loginBtn = document.getElementById("login-btn");
    const navMenuBtn = document.getElementById("navbar-toggle");

    if (loggedIn) {
        loginBtn.classList.add("hidden");
        loginBtn.classList.remove("block");

        navMenuBtn.classList.add("block");
        navMenuBtn.classList.remove("hidden");
    } else {
        loginBtn.classList.add("block");
        loginBtn.classList.remove("hidden");

        navMenuBtn.classList.add("hidden");
        navMenuBtn.classList.remove("block");
    }
}

createListingForm.addEventListener("submit", onCreateListing);

logOutBTN.addEventListener("click", logout);
