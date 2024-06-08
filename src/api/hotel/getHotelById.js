export default async function getHotelById(hotelId) {
    const response = await fetch(`http://localhost:8080/api/hotels/getHotelById/${hotelId}`, {
        method: "GET",
        headers: {
            cache: 'no-cache',
        }
    });
    const hotel = await response.json();
    
    return hotel;
}