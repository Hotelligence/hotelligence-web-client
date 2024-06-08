export default async function getRoomsInHotel(hotelId) {
    const response = await fetch(`http://localhost:8080/api/rooms/getRoomsInHotel/${hotelId}`, {
        method: "GET",
        headers: {
            cache: 'no-cache',
        }
    });
    const rooms = await response.json();
    
    return rooms;
}