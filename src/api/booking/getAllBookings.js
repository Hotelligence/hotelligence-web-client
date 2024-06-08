export default async function getAllBookings() {
    const bookingResponse = await fetch('http://localhost:8080/api/bookings/getAll', {
        method: "GET",
        headers: {
            cache: 'no-cache'
        }    
    });
    const bookings = await bookingResponse.json();

    return bookings;
}