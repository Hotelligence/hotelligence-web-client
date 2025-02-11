import { revalidateTag } from "next/cache";

export default async function getComparisonListByUserId(userId) {
    try {
        const response = await fetch(`http://localhost:8080/api/comparisons/getComparisonListByUserId/${userId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            next: { tags: ["getComparisonListByUserId"] }
        });

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        // Parse the response as JSON
        const comparisonList = await response.json();

        revalidateTag("getComparisonListByUserId");

        return comparisonList;

    } catch (error) {
        console.error('Error getting comparison list:', error);
        throw error;  // Re-throw the error after logging it
    }
}