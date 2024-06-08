export default async function placeBooking({roomId, bookingData}) {
    const response = await fetch(`http://localhost:8080/api/bookings/placeBooking/${roomId}`, {
        method: "POST",
        body: JSON.stringify(bookingData)
    });    
    
    if (!response.ok) {
        throw new Error('Failed to place booking');
    }

    return response.json();
}