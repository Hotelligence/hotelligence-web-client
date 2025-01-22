import { revalidateTag } from "next/cache";

export default async function recommendRoomsHybrid(userId, hotelId) {
    const response = await fetch(`http://localhost:5001/recommend/hybrid/${userId}/${hotelId}`, {
                method: "GET",
                headers: {
                    cache: 'no-cache',
                },
                next: { tags: ["recommendRoomsHybrid"] }
            });

    const rooms = await response.json();

    revalidateTag("recommendRoomsHybrid");
    
    return rooms;
    
}