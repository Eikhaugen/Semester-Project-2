import { API_AUCTION_BID_ON_LISTING } from "../constants";
import { headers } from "../headers";
import { getKey } from "../auth/key";

/**
 * Places a bid on a specific auction listing.
 *
 * @async
 * @function bidOnListing
 * @param {string} listingId - The unique identifier of the auction listing to place a bid on.
 * @param {number} amount - The bid amount to be placed (must be a positive number).
 * @returns {Promise<{ success: boolean }>} A promise that resolves to an object indicating success.
 * @throws {Error} Throws an error if the request fails or the response is not OK.
 *
 * @example
 * try {
 *     const result = await bidOnListing("abc123", 150);
 *     console.log(result.success); // true
 * } catch (error) {
 *     console.error("Error placing bid:", error);
 * }
 */
export async function bidOnListing(listingId, amount) {
    const myHeaders = headers();
    const token = await getKey();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ amount: amount }),
        redirect: "follow",
    };

    try {
        const response = await fetch(API_AUCTION_BID_ON_LISTING(listingId), requestOptions);

        if (!response.ok) {
            throw new Error(`Failed to place bid: ${response.statusText}`);
        }

        return { success: true };
    } catch (error) {
        console.error("Error placing bid:", error);
        throw error;
    }
}
