export default async function getAllRooms() {
    const response = await fetch('http://localhost:8080/api/rooms/getAll', {
        method: "GET",
        headers: {
            cache: 'no-cache',
        }
    });
    const rooms = await response.json();
    
    return rooms;
}