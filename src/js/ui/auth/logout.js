import { clearKey } from "../../api/auth/key.js";

/**
 * Clears the 'accessToken' using the clearKey function and redirects to the homepage.
 * 
 * @async
 * @function logout
 * @returns {void}
 */
export async function logout() {
    try {
        await clearKey();
        window.location.href = "/";
    } catch (error) {
        console.error("Failed to log out:", error);
        throw error;
    }
}


/**
 * Adds a click event listener to the button with the id 'logout-btn'.
 * When clicked, the logout function is invoked.
 * 
 * @returns {void}
 */
export function setLogoutListener() {
    const logoutButton = document.getElementById("logout-btn");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    } else {
        console.warn("Logout button not found.");
    }
}

