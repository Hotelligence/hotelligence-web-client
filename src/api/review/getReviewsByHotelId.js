import { revalidateTag } from "next/cache";

export default async function getReviewsByHotelId(hotelId) {
    const res = await fetch(`http://localhost:8080/api/reviews/getReviewsByHotelId/${hotelId}`,
    {
        method: "GET",
        headers: {
            cache: 'no-cache',
        },
        next: { tags: ["getReviewsByHotelId"] }
    });
    const data = await res.json();
    revalidateTag("getReviewsByHotelId");
    return data;
}