import { headers } from "../headers";
import { getKey } from "../auth/key";
import { API_AUCTION_PROFILE_BY_NAME } from "../constants";

export async function updateProfile(avatarUrl, bannerUrl, username) {
    const myHeaders = headers();
    const token = await getKey();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const rawData = {
        avatar: {
            url: avatarUrl,
            alt: "",
        },
        banner: {
            url: bannerUrl,
            alt: "",
        },
    };

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(rawData),
        redirect: "follow",
    };

    try {
        const response = await fetch(`${API_AUCTION_PROFILE_BY_NAME(username)}`, requestOptions);

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Failed to update profile data: ${errorResponse.message || response.statusText}`);
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error("Error updating profile data:", error);
        throw error;
    }
}

