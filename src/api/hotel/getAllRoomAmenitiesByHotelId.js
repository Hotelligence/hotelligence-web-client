import { revalidateTag } from "next/cache";

export default async function getAllRoomAmenitiesByHotelId(hotelId) {
    if (!hotelId) {
        console.error('getAllRoomAmenitiesByHotelId called without hotelId');
        return [];
    }

    const apiUrl = `http://localhost:8080/api/hotels/getAllRoomAmenitiesByHotelId/${hotelId}`;
    console.log('Fetching amenities from:', apiUrl);

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                cache: 'no-cache',
            },
            next: { tags: ["getAllRoomAmenitiesByHotelId"] }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        console.log('Raw response text:', text);

        if (!text) {
            console.warn('Empty response received');
            return [];
        }

        const amenities = JSON.parse(text);
        console.log('Parsed amenities:', amenities);

        revalidateTag("getAllRoomAmenitiesByHotelId");
        return amenities;
    } catch (error) {
        console.error('Error in getAllRoomAmenitiesByHotelId:', error);
        console.error('Hotel ID was:', hotelId);
        return [];
    }
}