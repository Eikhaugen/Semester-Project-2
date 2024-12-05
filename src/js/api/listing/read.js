import { API_AUCTION_LISTINGS,API_AUCTION_SEARCH_LISTINGS, API_AUCTION_LISTINGS_BY_ID } from "../constants";
import { headers } from "../headers";

/**
 * Fetches all auction listings, including bid details for each listing.
 * 
 * @async
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of listing objects.
 * Each listing object may include the following properties:
 * - `id`: The unique ID of the listing.
 * - `title`: The title of the listing.
 * - `description`: The description of the listing.
 * - `media`: An array of media objects with `url` and `alt` text.
 * - `_bids`: An array of bid objects associated with the listing, each with properties like:
 *   - `amount`: The amount of the bid.
 *   - `bidder`: The bidder's details.
 * 
 * @throws {Error} - Throws an error if the network request fails or the response is not OK.
 * 
 * @example
 * try {
 *     const listings = await fetchListings();
 *     console.log(listings);
 * } catch (error) {
 *     console.error("Error fetching listings:", error);
 * }
 */
export async function fetchListings() {
    const myHeaders = headers();

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch(`${API_AUCTION_LISTINGS}?_bids=true&_active=true&limit=24`, requestOptions);

        if (!response.ok) {
            throw new Error(`Failed to fetch listings: ${response.statusText}`);
        }

        const { data } = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching listings:", error);
        throw error;
    }
}

/**
 * Fetches a list of auction listings based on the provided search query.
 * 
 * @async
 * @param {string} query - The search query string used to filter listings by title or description.
 * 
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of listing objects.
 * Each listing object may include the following properties:
 * - `id`: The unique ID of the listing.
 * - `title`: The title of the listing.
 * - `media`: An array of media objects with `url` and `alt` text.
 * - `description`: The description of the listing.
 * - `_count`: An object containing counts of related items (e.g., bids).
 * - `bids`: An array of bid objects with `amount` and other details.
 * 
 * @throws {Error} - Throws an error if the network request fails or the response is not OK.
 * 
 * @example
 * try {
 *     const listings = await searchListings("laptop");
 *     console.log(listings);
 * } catch (error) {
 *     console.error("Error fetching listings:", error);
 * }
 */
export async function searchListings(query) {
    const myHeaders = headers();

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch(`${API_AUCTION_SEARCH_LISTINGS(query)}&_active=true&limit=5`, requestOptions);

        if (!response.ok) {
            throw new Error(`Failed to fetch listings: ${response.statusText}`);
        }

        const { data } = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching listings:", error);
        throw error;
    }
}

/**
 * Fetches a specific auction listing by its ID, including bid details for the listing.
 * 
 * @async
 * @param {string|number} id - The unique ID of the listing to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the listing object with the specified ID.
 * The listing object may include the following properties:
 * - `id`: The unique ID of the listing.
 * - `title`: The title of the listing.
 * - `description`: The description of the listing.
 * - `media`: An array of media objects with `url` and `alt` text.
 * - `_bids`: An array of bid objects associated with the listing, each with properties like:
 *   - `amount`: The amount of the bid.
 *   - `bidder`: The bidder's details.
 * 
 * @throws {Error} - Throws an error if the network request fails, the response is not OK, or the listing is not found.
 * 
 * @example
 * try {
 *     const listing = await fetchListingsByID(123);
 *     console.log(listing);
 * } catch (error) {
 *     console.error("Error fetching listing by ID:", error);
 * }
 */
export async function fetchListingsByID(id) {
    const myHeaders = headers();

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch(`${API_AUCTION_LISTINGS_BY_ID(id)}?_bids=true&_active=true&limit=24`, requestOptions);

        if (!response.ok) {
            throw new Error(`Failed to fetch listings: ${response.statusText}`);
        }

        const { data } = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching listings:", error);
        throw error;
    }
}
