import { revalidateTag } from "next/cache";

export default async function getActiveBookingByRoomId(roomId) {
    try {
        const response = await fetch(`http://localhost:8080/api/bookings/getActiveBookingByRoomId/${roomId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            next: {            
                tags: ["getActiveBookingByRoomId"]
            }
        });

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        // Parse the response as JSON
        const booking = await response.json();

        revalidateTag("getActiveBookingByRoomId");
        
        return booking;

    } catch (error) {
        console.error('Error getting booking:', error);
        throw error;  // Re-throw the error after logging it
    }
}