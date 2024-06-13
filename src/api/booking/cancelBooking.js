import { revalidateTag } from 'next/cache'

export default async function cancelBooking(bookingId) {
    const response = await fetch(`http://localhost:8080/api/bookings/cancelBooking/${bookingId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        next : { tags: ["bookingList"] }
    });

    revalidateTag("bookingList");
    const data = await response.json();
    console.log(data);
    return data;
}