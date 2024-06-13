export default async function handlePlaceBooking(roomId, bookingData) {
    try {
        const response = await fetch(`http://localhost:8080/api/bookings/placeBooking/${roomId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        // Parse the response as JSON
        const bookingResult = JSON.stringify(bookingData, null, 2);
        return bookingResult;

    } catch (error) {
        console.error('Error placing booking:', error);
        throw error;  // Re-throw the error after logging it
    }
}
