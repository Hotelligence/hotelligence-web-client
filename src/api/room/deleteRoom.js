export default async function deleteRoom(roomId) {
    const response = await fetch(`http://localhost:8080/api/rooms/deleteRoom/${roomId}`, {
        method: "DELETE",
        headers: {
            cache: 'no-cache',
        },        
    });
    const room = await response.json();
    return room;
}