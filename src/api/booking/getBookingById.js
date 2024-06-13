export default async function getBookingById(bookingId) {
    try {
        const response = await fetch(`http://localhost:8080/api/bookings/getBookingById/${bookingId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        // Parse the response as JSON
        const booking = await response.json();
        return booking;

    } catch (error) {
        console.error('Error getting booking:', error);
        throw error;  // Re-throw the error after logging it
    }
}