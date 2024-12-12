import { searchListings } from "../../api/listing/read.js";
import { isLoggedIn } from "../../utils/authGuard.js";

/**
 * Sets up the search functionality for the listings search form.
 * It binds a `submit` event listener to the search form and dynamically renders the results.
 * Hides the search results container when the user clicks outside of it.
 */
export function setupSearch() {
    const form = document.getElementById("search-listings-form");
    const input = document.getElementById("search-listings-input");
    const searchResultsContainer = document.getElementById("search-results");

    if (!form || !input || !searchResultsContainer) {
        console.error("Search setup failed: Form or container not found.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const query = input.value.trim();
        if (!query) {
            alert("Please enter a search query.");
            return;
        }

        try {
            const results = await searchListings(query);
            if (results.length > 0) {
                searchResultsContainer.classList.remove("hidden");
                searchResultsContainer.classList.add("flex");
            }
            renderSearchResults(results, searchResultsContainer);
        } catch (error) {
            console.error("Search failed:", error);
            alert("An error occurred while searching. Please try again.");
        }
    });

    document.addEventListener("click", (event) => {
        if (
            !searchResultsContainer.contains(event.target) &&
            !form.contains(event.target)
        ) {
            searchResultsContainer.classList.add("hidden");
            searchResultsContainer.classList.remove("flex");
        }
    });
}


/**
 * Dynamically renders the search results in the specified container.
 * 
 * @param {Array<Object>} results - The array of search results to render.
 * Each result object should contain at least the following properties:
 * - `id`: The unique ID of the listing.
 * - `title`: The title of the listing.
 * - `media`: An array of media objects, each with `url` and optional `alt` text.
 * @param {HTMLElement} container - The HTML container element where the results will be rendered.
 * The container will be cleared before appending the results.
 * 
 * If the user is logged in (`isLoggedIn` returns true), results will be rendered as anchor tags (`<a>`).
 * If the user is not logged in, results will be rendered as div elements (`<div>`).
 */
export function renderSearchResults(results, container) {
    container.innerHTML = "";

    if (results.length === 0) {
        container.innerHTML = "<p>No results found.</p>";
        container.classList.add("hidden");
        container.classList.remove("block");
        return;
    }

    const loggedIn = isLoggedIn();

    results.forEach((result) => {
        let resultElement;

        if (loggedIn) {
            resultElement = document.createElement("a");
            resultElement.className = "block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300";
            resultElement.href = `/listing/?id=${result.id}`;
        } else {
            resultElement = document.createElement("div");
            resultElement.className = "block bg-white shadow-md rounded-lg overflow-hidden";
        }

        // Image container
        const imgContainer = document.createElement("div");
        imgContainer.className = "h-40 overflow-hidden";

        const img = document.createElement("img");
        if (result.media.length > 0) {
            img.src = result.media[0].url;
            img.alt = result.media[0].alt || "Result Image";
        } else {
            img.src = "default-placeholder.jpg";
            img.alt = "No image available";
        }

        img.className = "object-cover object-center w-full h-full";
        imgContainer.appendChild(img);

        // Content container
        const contentDiv = document.createElement("div");
        contentDiv.className = "p-4 flex flex-col gap-2";

        // Title
        const title = document.createElement("h2");
        title.className = "text-lg font-semibold text-gray-800";
        title.textContent = result.title || "Untitled";

        // Details container
        const detailsDiv = document.createElement("div");
        detailsDiv.className = "flex justify-between items-center text-sm text-gray-600";

        // Price and bids
        const priceDiv = document.createElement("div");
        priceDiv.className = "flex flex-col";

        const priceSpan = document.createElement("span");
        priceSpan.textContent = `${result._count?.bids || 0} bids`;
        priceSpan.className = "text-gray-500";

        const highestBid = result.bids?.reduce((max, bid) => Math.max(max, bid.amount), 0) || 0;
        const highestBidSpan = document.createElement("span");
        highestBidSpan.textContent = `Highest Bid: ${highestBid} Credits`;
        highestBidSpan.className = "font-medium text-green-600";

        priceDiv.appendChild(priceSpan);
        priceDiv.appendChild(highestBidSpan);

        // Time left
        const timeDiv = document.createElement("div");
        timeDiv.className = "text-gray-500";

        const timeSpan = document.createElement("span");
        const endsAt = new Date(result.endsAt);
        const now = new Date();
        const timeLeft = Math.max(0, endsAt - now);
        const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        timeSpan.textContent = `${daysLeft}d ${hoursLeft}hrs`;

        timeDiv.appendChild(timeSpan);

        detailsDiv.appendChild(priceDiv);
        detailsDiv.appendChild(timeDiv);

        // Append elements to content container
        contentDiv.appendChild(title);
        contentDiv.appendChild(detailsDiv);

        // Append image and content to the result element
        resultElement.appendChild(imgContainer);
        resultElement.appendChild(contentDiv);

        container.appendChild(resultElement);
    });

    container.classList.remove("hidden");
    container.classList.add("block");
}

