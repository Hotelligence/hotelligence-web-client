export default async function updateRoom(roomId, roomData) {

    try {
        const response = await fetch(`http://localhost:8080/api/rooms/updateRoom/${roomId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(roomData)
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const updatedRoom = await response.json();

        return updatedRoom;
    } catch (error) {
        console.error('Error:', error);
    }
}