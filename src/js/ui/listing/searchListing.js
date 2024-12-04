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
                searchResultsContainer.classList.add("block");
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
            searchResultsContainer.classList.remove("block");
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
            resultElement.href = `listing/?id=${result.id}`;
        } else {
            resultElement = document.createElement("div");
        }

        resultElement.className = "search-result";

        const img = document.createElement("img");
        if (result.media.length > 0) {
            img.src = result.media[0].url;
            img.alt = result.media[0].alt || "Result Image";
        } else {
            img.src = "default-placeholder.jpg";
            img.alt = "No image available";
        }

        const contentDiv = document.createElement("div");
        const title = document.createElement("h2");
        title.textContent = result.title || "Untitled";

        contentDiv.appendChild(title);
        resultElement.appendChild(img);
        resultElement.appendChild(contentDiv);

        container.appendChild(resultElement);
    });

    container.classList.remove("hidden");
    container.classList.add("block");
}
