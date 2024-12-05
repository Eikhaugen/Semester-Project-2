/**
 * Sets the logged-in user's ID in localStorage.
 *
 * @param {string} userID - The user ID to store.
 * @throws {Error} - Throws an error if the provided userID is invalid or missing.
 *
 * @example
 * setLoggedInUserID("12345");
 * console.log(localStorage.getItem("userID")); // Outputs: "12345"
 */
export function setLoggedInUserID(userID) {
    if (!userID || typeof userID !== "string") {
        throw new Error("Invalid userID. Must be a non-empty string.");
    }
    localStorage.setItem("userID", userID);
}


/**
 * Retrieves the logged-in user's username from localStorage.
 *
 * @returns {string|null} The username if present, otherwise null.
 */
export function getLoggedInUserName() {
    return localStorage.getItem('userID');
}
