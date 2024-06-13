export default async function getAllBookings(userId) {
    const bookingResponse = await fetch(`http://localhost:8080/api/bookings/getBookingsByUserId/${userId}`, {
        method: "GET",
        headers: {
            cache: 'no-cache'
        }    
    });
    const bookings = await bookingResponse.json();

    return bookings;
}