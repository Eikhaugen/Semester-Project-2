/**
 * Checks if the user is authenticated by verifying if the access token exists in localStorage.
 *
 * @returns {boolean} True if authenticated, otherwise false.
 */
export function isLoggedIn() {
  return !!localStorage.accessToken;
}

/**
* Guards a route by ensuring the user is authenticated.
* If the user is not logged in, it displays an alert and redirects them to a specified location.
*
* @param {string} redirectUrl - The URL to redirect unauthenticated users to (default is "/").
* @returns {void}
*/
export function authGuard(redirectUrl = "/") {
  if (!isLoggedIn()) {
      alert("You must be logged in to view this page");
      window.location.href = redirectUrl;
  }
}
