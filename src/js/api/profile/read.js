import { headers } from "../headers";
import { getKey } from "../auth/key";
import { API_AUCTION_PROFILE_BY_NAME } from "../constants";

export async function readProfile(username) {
    const myHeaders = headers();
    const token = await getKey();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch(`${API_AUCTION_PROFILE_BY_NAME(username)}`, requestOptions);

        if (!response.ok) {
            throw new Error(`Failed to fetch profile data: ${response.statusText}`);
        }

        const { data } = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching profile data:", error);
        throw error;
    }
}