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
import { authGuard } from "../../utils/authGuard";
import { initToggleMenu } from "../../utils/toggleMenu";

// DOM Elements
const logOutBTN = document.getElementById("logout-btn");
const container = document.getElementById("listings-container");
const profileSection = document.getElementById("profile-container");
const profileUpdateForm = document.getElementById("update-profile-form")

// Initialize features and guards
    authGuard();
    initializeProfile();
    updateLayout();
    initializeListings();
    setupSearch();
    initializeProfileUpdateToggle();
    initToggleMenu();


// Functions

/**
 * Initializes the toggle edit profile menu functionality.
 */
function initializeProfileUpdateToggle() {
    const editProfileBtn = document.getElementById("edit-profile-btn");
    const profileUpdateForm = document.getElementById("update-profile-form");

    toggleMenu(editProfileBtn, profileUpdateForm);
}

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
        initializeProfileUpdateToggle();
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
