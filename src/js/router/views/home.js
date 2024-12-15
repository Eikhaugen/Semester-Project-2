// Import statements
import { isLoggedIn } from "../../utils/authGuard";
import { logout } from '../../ui/auth/logout';
import { renderListings } from "../../ui/listing/renderListings";
import { fetchListings } from "../../api/listing/read";
import { setupSearch } from "../../ui/listing/searchListing";
import { initListingControls } from "../../ui/listing/listingControls";

// DOM Elements
const logOutBtn = document.getElementById("logout-btn");
const listingsContainer = document.getElementById("listings-container");
const promoContainer = document.getElementById("promo");

// Initialize features and guards
updateLayout();
initializeListings();
setupSearch();
initListingControls(listingsContainer);

// Functions

/**
 * Updates the layout based on login status.
 */
function updateLayout() {
    const loggedIn = isLoggedIn();

    const registerBtn = document.getElementById("register-btn");
    const loginBtn = document.getElementById("login-btn");
    const logOutBtn = document.getElementById("logout-btn");
    const navMenu = document.getElementById("nav-menu");

    if (loggedIn) {
        loginBtn.classList.add("hidden");
        registerBtn.classList.add("hidden");
        logOutBtn.classList.remove("hidden");
        promoContainer.classList.add("hidden");
        promoContainer.classList.remove("flex");
        navMenu.classList.add("block");
        navMenu.classList.remove("hidden");
    } else {
        loginBtn.classList.remove("hidden");
        registerBtn.classList.remove("hidden");
        logOutBtn.classList.add("hidden");
        promoContainer.classList.add("flex");
        promoContainer.classList.remove("hidden");
    }
}

/**
 * Fetches and renders the listings on initial load.
 */
async function initializeListings() {
    try {
        const page = 1;
        const sortBy = "created";
        const sortOrder = "desc";
        const listings = await fetchListings(page, sortBy, sortOrder);
        renderListings(listings, listingsContainer);
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}

// Event listener for logout button
logOutBtn.addEventListener("click", logout);
