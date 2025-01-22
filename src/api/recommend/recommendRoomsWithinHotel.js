import { revalidateTag } from "next/cache";

export default async function recommendRoomsWithinHotel(hotelId) {
    const response = await fetch(`http://localhost:5001/recommend/hotel/${hotelId}`, {
            method: "GET",
            headers: {
                cache: 'no-cache',
            },
            next: { tags: ["recommendRoomsWithinHotel"] }
        });

    const rooms = await response.json();

    revalidateTag("recommendRoomsWithinHotel");
    
    return rooms;
}