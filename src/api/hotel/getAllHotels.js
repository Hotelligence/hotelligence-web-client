import { revalidateTag } from "next/cache";

export default async function getAllHotel() {
    const res = await fetch('http://localhost:8080/api/hotels/getAll', {
        method: "GET",
        headers: {
            cache: 'no-cache',
        },
        next: { tags: ["getAllHotel"] }
    });
    const hotels = await res.json();

    revalidateTag("getAllHotel");

    return hotels;
}