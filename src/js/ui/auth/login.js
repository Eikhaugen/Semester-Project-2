import { login } from "../../api/auth/login.js"

/**
 * Handles the login form submission event.
 *
 * This function is triggered when the user submits the login form. It prevents the default form submission,
 * collects the input values for email and password from the form fields, and calls the `login` API function
 * to authenticate the user. If the login is successful, it redirects the user to the home page.
 * In case of an error, it logs the error to the console and shows an alert to the user.
 *
 * @async
 * @function onLogin
 * @param {Event} event - The form submission event object.
 *
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
 */
export async function onLogin(event) {
    event.preventDefault();

    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    try {
        const result = await login(formData);

        if (result) {
            window.location.href = '/';
        }
    } catch (error) {
        console.error(error);
        alert(`Login failed: ${error.message}`);
    }
}
