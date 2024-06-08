export default async function getAllHotel() {
    const res = await fetch('http://localhost:8080/api/hotels/getAll', {
        method: "GET",
        headers: {
            cache: 'no-cache',
        }    
    });
    const hotels = await res.json();

    return hotels;
}