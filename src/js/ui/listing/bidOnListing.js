import { bidOnListing } from "../../api/listing/bidOnListing.js";
import { getListingIDFromURL } from "../../utils/getListingIDfromURL.js";

/**
 * Handles the form submission for placing a bid on an auction listing.
 *
 * @async
 * @function onPlaceBid
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A promise that resolves when the bid has been processed.
 *
 * @throws {Error} Alerts the user if the bid could not be placed due to an error.
 *
 * @example
 * document.querySelector("#bid-form").addEventListener("submit", onPlaceBid);
 */
export async function onPlaceBid(event) {
    event.preventDefault();

    /** @type {string} */
    const listingId = await getListingIDFromURL();

    /** @type {string} */
    const amountInput = document.getElementById("bid-amount").value.trim();

    /** @type {number} */
    const amount = parseFloat(amountInput);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid bid amount.");
        return;
    }

    try {
        const result = await bidOnListing(listingId, amount);

        if (result.success) {
            alert("Bid placed successfully!");
            window.location.reload();
        }
    } catch (error) {
        console.error("Error placing bid:", error);
        alert(`Failed to place bid: ${error.message}`);
    }
}
