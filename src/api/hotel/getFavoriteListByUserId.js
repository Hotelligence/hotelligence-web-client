import { revalidateTag } from "next/cache";

export default async function getFavoriteListByUserId(userId) {
    try {
        const response = await fetch(`http://localhost:8080/api/favorites/getFavoriteListByUserId/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            next: {
                tags: ["getFavoriteListByUserId"]
            }
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();
        revalidateTag("getFavoriteListByUserId");
        return data;
    } catch (error) {
        console.error('Error fetching favorite list:', error);
        // Return a default structure if the API call fails
        return {
            favoriteHotels: []
        };
    }
}