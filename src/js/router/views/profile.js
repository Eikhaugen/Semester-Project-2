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
import { onUpdateProfile } from "../../ui/profile/updateProfile";

// DOM Elements
const navbarToggle = document.getElementById("navbar-toggle");
const navMenu = document.getElementById("nav-menu");
const logOutBTN = document.getElementById("logout-btn");
const container = document.getElementById("listings-container");
const profileSection = document.getElementById("profile-container");
const profileUpdateForm = document.getElementById("update-profile-form")
const editProfileBtn = document.getElementById("edit-profile-btn")

// Initialize features and guards
    initializeProfile();
    initializeMenu();
    updateLayout();
    initializeListings();
    setupSearch();
    initializeProfileUpdateToggle();


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
 * Initializes the toggle edit profile menu functionality.
 */
function initializeProfileUpdateToggle() {
    if (editProfileBtn && profileUpdateForm) {
        toggleMenu(editProfileBtn, profileUpdateForm);
    } else {
        console.error("Edit Profile toggle or form not found in the DOM.");
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
 * Fetches and renders the profile and populates the edit profile form.
 */
async function initializeProfile() {
    try {
        const userID = await getLoggedInUserID();
        const profileData = await readProfile(userID);

        renderProfile(profileData, profileSection);
        populateEditProfileForm(profileData);
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
}

/**
 * Populates the edit profile form with existing profile data.
 * 
 * @param {Object} profileData - The profile data to populate the form.
 */
function populateEditProfileForm(profileData) {
    const avatarInput = document.getElementById("avatar-url");
    const bannerInput = document.getElementById("banner-url");
    if (avatarInput) {
        avatarInput.value = profileData.avatar?.url || '';
    }
    if (bannerInput) {
        bannerInput.value = profileData.banner?.url || '';
    }
}

logOutBTN.addEventListener("click", logout);
profileUpdateForm.addEventListener("submit", onUpdateProfile);
