export default async function createHotel(hotelData) {
    try {
        const response = await fetch(`http://localhost:8080/api/hotels/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hotelData)
        });

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        // Parse the response as JSON
        const hotelResult = JSON.stringify(hotelData, null, 2);
        return hotelResult;

    } catch (error) {
        console.error('Error creating hotel:', error);
        throw error;  // Re-throw the error after logging it
    }
}