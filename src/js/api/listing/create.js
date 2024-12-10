import { API_AUCTION_CREATE_LISTING } from "../constants";
import { headers } from "../headers";
import { getKey } from "../auth/key";

/**
 * Creates a new auction listing.
 *
 * @async
 * @function createListing
 * @param {Object} listingData - The data for the new listing.
 * @param {string} listingData.title - The title of the listing (required).
 * @param {string} [listingData.description] - A description of the listing (optional).
 * @param {string} listingData.endsAt - The end date and time for the listing in ISO format (required).
 * @param {string[]} [listingData.tags] - An array of tags related to the listing (optional).
 * @param {Object[]} [listingData.media] - An array of media objects (optional).
 * @param {string} listingData.media[].url - The URL of the media item.
 * @param {string} listingData.media[].alt - The alt text for the media item.
 * @returns {Promise<{ success: boolean }>} A promise that resolves to an object indicating success.
 * @throws {Error} Throws an error if the request fails or the response is not OK.
 *
 * @example
 * const listingData = {
 *     title: "Vintage Watch",
 *     description: "A beautiful vintage watch.",
 *     endsAt: "2024-12-31T23:59:59.000Z",
 *     tags: ["watch", "vintage"],
 *     media: [{ url: "https://example.com/watch.jpg", alt: "Vintage watch image" }]
 * };
 *
 * try {
 *     const result = await createListing(listingData);
 *     console.log(result.success); // true
 * } catch (error) {
 *     console.error("Error:", error);
 * }
 */
export async function createListing(listingData) {
    const myHeaders = headers();

    const token = await getKey();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const payload = {
        title: listingData.title,
        description: listingData.description || "",
        endsAt: listingData.endsAt,
    };

    if (listingData.tags && listingData.tags.length > 0) {
        payload.tags = listingData.tags;
    }

    if (listingData.media && listingData.media.length > 0) {
        payload.media = listingData.media;
    }

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: "follow",
    };

    try {
        const response = await fetch(API_AUCTION_CREATE_LISTING, requestOptions);

        if (!response.ok) {
            throw new Error(`Failed to create listing: ${response.statusText}`);
        }

        return { success: true };
    } catch (error) {
        console.error("Error creating listing:", error);
        throw error;
    }
}
