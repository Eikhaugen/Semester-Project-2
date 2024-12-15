// Import statements
import { isLoggedIn } from "../../utils/authGuard";
import { logout } from '../../ui/auth/logout';
import { renderListings } from "../../ui/listing/renderListings";
import { fetchListings } from "../../api/listing/read";
import { setupSearch } from "../../ui/listing/searchListing";
import { initListingControls } from "../../ui/listing/listingControls";
import { initToggleMenu } from "../../utils/toggleMenu";

// DOM Elements
const logOutBtn = document.getElementById("logout-btn");
const listingsContainer = document.getElementById("listings-container");
const promoContainer = document.getElementById("promo");

// Initialize features and guards
updateLayout();
initializeListings();
setupSearch();
initListingControls(listingsContainer);
initToggleMenu();

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
    const main = document.querySelector("main")

    if (loggedIn) {
        loginBtn.classList.add("hidden");
        registerBtn.classList.add("hidden");
        logOutBtn.classList.remove("hidden");
        promoContainer.classList.add("hidden");
        promoContainer.classList.remove("flex");
        navMenu.classList.add("block");
        navMenu.classList.remove("hidden");
        main.classList.add("ml-8", "md:ml-40", "md:p-4", "md:pl-6")

    } else {
        loginBtn.classList.remove("hidden");
        registerBtn.classList.remove("hidden");
        logOutBtn.classList.add("hidden");
        promoContainer.classList.add("flex");
        promoContainer.classList.remove("hidden");
        main.classList.remove("ml-8", "md:ml-40", "md:p-4", "md:pl-6")
        main.classList.add("md:p-4")
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
