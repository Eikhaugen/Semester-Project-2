import { register } from '../../api/auth/register.js';

/**
 * Handles the registration form submission event.
 *
 * This function is triggered when the user submits the registration form. It prevents the default form
 * submission, gathers the input values from the form fields, and calls the `register` API function.
 * If the registration is successful, it redirects the user to the login page.
 * In case of an error, it logs the error and shows an alert.
 *
 * @async
 * @param {Event} event - The form submission event object.
 *
 * @returns {Promise<void>} A promise that resolves when the registration process is complete.
 */
export async function onRegister(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirm-password').value,
        avatar: document.getElementById('avatar-url').value || null,
        banner: document.getElementById('banner-url').value || null,
    };

    if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    try {
        const result = await register(formData);

        if (result) {
            alert('Registration successful! Redirecting to login...');
            window.location.href = '/auth/login/';
        }
    } catch (error) {
        console.error(error);
        alert(`Registration failed: ${error.message}`);
    }
}
