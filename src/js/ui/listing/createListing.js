import { createListing } from "../../api/listing/create";

/**
 * Handles the form submission for creating a new auction listing.
 *
 * @async
 * @function onCreateListing
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A promise that resolves when the listing has been created successfully.
 *
 * @throws {Error} Alerts the user if the listing could not be created due to an error.
 *
 * @example
 * document.querySelector("#create-listing-form").addEventListener("submit", onCreateListing);
 */
export async function onCreateListing(event) {
    event.preventDefault();

    /** @type {string} */
    const title = document.getElementById("title").value.trim();

    /** @type {string} */
    const description = document.getElementById("description").value.trim();

    /** @type {string} */
    const tagsInput = document.getElementById("tags").value.trim();

    /** @type {string} */
    const mediaUrl = document.getElementById("media-url").value.trim();

    /** @type {string} */
    const mediaAlt = document.getElementById("media-alt").value.trim();

    /** @type {string} */
    const endsAtInput = document.getElementById("endsAt").value;

    /** @type {Object} */
    const formData = {
        title,
        description,
        tags: tagsInput ? tagsInput.split(",").map(tag => tag.trim()) : [],
        media: mediaUrl ? [{ url: mediaUrl, alt: mediaAlt }] : [],
        endsAt: new Date(endsAtInput).toISOString(),
    };

    try {
        const result = await createListing(formData);

        if (result) {
            window.location.href = '/';
        }
    } catch (error) {
        console.error("Error creating listing:", error);
        alert(`Failed to create listing: ${error.message}`);
    }
}
