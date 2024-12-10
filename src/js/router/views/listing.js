// Import statements
import { isLoggedIn } from "../../utils/authGuard";
import { toggleMenu } from '../../ui/toggleMenu';
import { logout } from '../../ui/auth/logout';
import { renderSingleListing } from "../../ui/listing/renderSingleListing";
import { fetchSingleListing } from "../../api/listing/read";
import { setupSearch } from "../../ui/listing/searchListing";
import { getListingIDFromURL } from '../../utils/getListingIDfromURL'
import { onPlaceBid } from "../../ui/listing/bidOnListing";

// DOM Elements
const navbarToggle = document.getElementById("navbar-toggle");
const navMenu = document.getElementById("nav-menu");
const logOutBTN = document.getElementById("logout-btn");
const listingContainer = document.getElementById("listing-container");
const bidsContainer = document.getElementById("listing-bids-container");
const bidOnListingForm = document.getElementById("bid-on-listing-form");

// Initialize features and guards
    initializeMenu();
    updateLayout();
    initializeListings();
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

/**
 * Fetches and renders the listings.
 */
async function initializeListings() {
    try {
        const listingID = await getListingIDFromURL();
        const listing = await fetchSingleListing(listingID);
        renderSingleListing(listing, listingContainer, bidsContainer);
    } catch (error) {
        console.error('Error fetching listing:', error);
    }
}

bidOnListingForm.addEventListener("submit", onPlaceBid);

logOutBTN.addEventListener("click", logout);
