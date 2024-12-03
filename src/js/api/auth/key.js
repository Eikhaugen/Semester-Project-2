/**
 * Retrieves the access token from localStorage.
 *
 * @async
 * @function getKey
 * @returns {Promise<string|null>} The access token if found, or `null` if not found.
 * @throws {Error} Logs an error message if the token is not found.
 */
export async function getKey() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.error("Access token not found in localStorage.");
        return null;  
    }
    return accessToken;
}

/**
 * Saves the access token to localStorage.
 *
 * @async
 * @function setKey
 * @param {string} accessToken - The access token to save.
 * @throws {Error} Logs an error message if the provided token is invalid.
 */
export async function setKey(accessToken) {
    if (!accessToken) {
        console.error("No access token provided to setKey.");
        return;
    }
    localStorage.setItem('accessToken', accessToken);
    console.log("Access token saved successfully.");
}

/**
 * Removes the access token from localStorage.
 *
 * @async
 * @function clearKey
 * @returns {Promise<void>} Resolves when the token is cleared.
 * @throws {Error} Logs a warning message if no token is found to clear.
 */
export async function clearKey() {
    if (localStorage.getItem('accessToken')) {
        localStorage.removeItem('accessToken');
        console.log("Access token cleared successfully.");
    } else {
        console.warn("No access token found to clear.");
    }
}
