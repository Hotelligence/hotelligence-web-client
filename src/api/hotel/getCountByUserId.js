export default async function getCountByUserId(userId) {
    return fetch(`http://localhost:8080/api/hotels/getCountByUserId/${userId}`, {
        method: "GET",
        headers: {
            cache: 'no-cache',
        }
    })
    .then(res => res.json())
    .catch(error => console.error("Error fetching count by user id:", error))

}