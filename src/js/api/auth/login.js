import { API_AUTH_LOGIN } from "../constants";
import { headers } from "../headers.js";
import { setKey } from "./key.js";
import { setLoggedInUserID } from "../../utils/loggedInUserID.js";

/**
 * Logs in a user by sending a POST request to the login API.
 * 
 * This function uses pre-defined headers and the user credentials to authenticate the user.
 * If the login is successful, the access token from the server's response is saved using `setKey`.
 * 
 * @async
 * @param {Object} userData - The user credentials object.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password for the user's account.
 * 
 * @returns {Promise<Object>} A promise that resolves with the user data from the server's response.
 * @throws Will throw an error if the fetch request fails.
 */
export async function login({ email, password }) {
    const myHeaders = headers();

    const rawData = JSON.stringify({
        email,
        password,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: rawData,
        redirect: "follow",
    };

    try {
        const response = await fetch(API_AUTH_LOGIN, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        const accessToken = result?.data?.accessToken;
        if (accessToken) {
            await setKey(accessToken);
        } else {
            console.warn("No access token found in the response.");
        }

        const userID = result?.data?.name;
        if (userID) {
            await setLoggedInUserID(userID);
        } else {
            console.warn("No user ID found in the response.");
        }

        return result.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}
