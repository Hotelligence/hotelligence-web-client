export default function getHotelsByUserId(userId) {
    return fetch(`http://localhost:8080/api/hotels/getHotelsByUserId/${userId}`, {
        method: "GET",
        headers: {
            cache: 'no-cache',
        }
    })
    .then(res => res.json())
    .catch(error => console.error("Error fetching hotels by user id:", error))

}