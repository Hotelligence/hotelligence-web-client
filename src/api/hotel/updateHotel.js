export default async function updateHotel(hotelId, hotelData) {

    try {
        const response = await fetch(`http://localhost:8080/api/hotels/updateHotel/${hotelId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // 'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(hotelData)
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const updatedHotel = await response.json();

        return updatedHotel;
    } catch (error) {
        console.error('Error:', error);
    }
}