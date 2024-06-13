export default async function getRoomById(roomId) {
    const response = await fetch(`http://localhost:8080/api/rooms/getRoomById/${roomId}`, {
        method: "GET",
        headers: {
            cache: 'no-cache',
        }
    });
    const room = await response.json();
    
    return room;
}