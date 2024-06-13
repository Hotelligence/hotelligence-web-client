export default async function updateBookingStatus(bookingId, status) {
    const bookingStatus = {
        bookingId: bookingId,
        bookingStatus: status
    }

    try {
        const response = await fetch(`http://localhost:8080/api/bookings/updateBookingStatus/${bookingId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // 'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(bookingStatus)
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const updatedBooking = await response.json();

        return updatedBooking;
    } catch (error) {
        console.error('Error:', error);
    }
}