import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

/**
 * Fetches all listings
 */
export async function fetchListings() {
    const myHeaders = headers();

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch(`${API_AUCTION_LISTINGS}?_bids=true`, requestOptions);

        if (!response.ok) {
            throw new Error(`Failed to fetch listings: ${response.statusText}`);
        }

        const { data } = await response.json();
        console.log("Fetched Listings:", data); 
        return data; 
    } catch (error) {
        console.error("Error fetching listings:", error);
        throw error;
    }
}
