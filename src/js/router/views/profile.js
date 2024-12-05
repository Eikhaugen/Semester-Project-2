// Import statements
import { isLoggedIn } from "../../utils/authGuard";
import { toggleMenu } from '../../ui/toggleMenu';
import { logout } from '../../ui/auth/logout';
import { renderListings } from "../../ui/listing/renderListings";
import { fetchListingsByID } from "../../api/listing/read";
import { getLoggedInUserID } from "../../utils/loggedInUserID";
import { setupSearch } from "../../ui/listing/searchListing";
import { readProfile } from "../../api/profile/read";
import { renderProfile } from "../../ui/profile/renderProfile";

// DOM Elements
const navbarToggle = document.getElementById("navbar-toggle");
const navMenu = document.getElementById("nav-menu");
const logOutBTN = document.getElementById("logout-btn");
const container = document.getElementById("listings-container");
const profileSection = document.getElementById("profile-section");

// Initialize features and guards
    initializeMenu();
    updateLayout();
    initializeListings();
    setupSearch();
    initializeProfile();


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

/**
 * Fetches and renders the listings.
 */
async function initializeListings() {
    try {
        const userID = await getLoggedInUserID();
        const listings = await fetchListingsByID(userID);
        renderListings(listings, container);
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}

/**
 * Fetches and renders the profile.
 */
async function initializeProfile() {
    try {
        const userID = await getLoggedInUserID();
        const profileData = await readProfile(userID);
        renderProfile(profileData, profileSection);
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
}

logOutBTN.addEventListener("click", logout);
