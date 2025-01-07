export default async function createRoom(hotelId, roomData) {

    try {
        const response = await fetch(`http://localhost:8080/api/rooms/createRoom/${hotelId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(roomData)
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const createdRoom = await response.json();

        return createdRoom;
    } catch (error) {
        console.error('Error:', error);
    }
}