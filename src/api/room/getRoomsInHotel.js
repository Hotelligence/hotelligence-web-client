import { revalidateTag } from "next/cache";

export default async function getRoomsInHotel(hotelId) {
    const response = await fetch(`http://localhost:8080/api/rooms/getRoomsInHotel/${hotelId}`, {
        method: "GET",
        headers: {
            cache: 'no-cache',
        },
        next: { tags: ["getRoomsInHotel"] }
    });
    const rooms = await response.json();

    revalidateTag("getRoomsInHotel");
    
    return rooms;
}