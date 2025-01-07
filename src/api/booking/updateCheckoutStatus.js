import { revalidateTag } from 'next/cache'

export default async function updateCheckoutStatus(bookingId) {
    const response = await fetch(`http://localhost:8080/api/bookings/updateCheckoutStatus/${bookingId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        next : { tags: ["updateCheckoutStatus"] }
    });

    revalidateTag("updateCheckoutStatus");
    const data = await response.json();
    console.log(data);
    return data;
}