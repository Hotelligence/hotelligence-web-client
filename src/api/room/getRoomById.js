import { revalidateTag } from "next/cache";

export default async function getRoomById(roomId) {
    const response = await fetch(`http://localhost:8080/api/rooms/getRoomById/${roomId}`, {
        method: "GET",
        headers: {
            cache: 'no-cache',
        },
        tags: ["getRoomById"]
    });
    const room = await response.json();

    revalidateTag("getRoomById");
    
    return room;
}