export default async function getReviewsByRoomId(roomId) {
    const res = await fetch(`http://localhost:8080/api/reviews/getReviewsByRoomId/${roomId}`,
    {
        method: "GET",
        headers: {
            cache: 'no-cache',
        }
    });
    const data = await res.json();
    return data;
}