// Import statements
import { authGuard, isLoggedIn } from "../../utils/authGuard";
import { logout } from '../../ui/auth/logout';
import { renderSingleListing } from "../../ui/listing/renderSingleListing";
import { fetchSingleListing } from "../../api/listing/read";
import { setupSearch } from "../../ui/listing/searchListing";
import { getListingIDFromURL } from '../../utils/getListingIDfromURL'
import { onPlaceBid } from "../../ui/listing/bidOnListing";

// DOM Elements
const logOutBTN = document.getElementById("logout-btn");
const listingContainer = document.getElementById("listing-container");
const bidsContainer = document.getElementById("listing-bids-container");
const bidOnListingForm = document.getElementById("bid-on-listing-form");

// Initialize features and guards
    authGuard
    updateLayout();
    initializeListings();
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
