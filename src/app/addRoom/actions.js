'use server'

import createRoom from "../../api/room/createRoom";

export async function handleCreateRoom(hotelId, allAmenities, formData) {
    let amenities = [];
    try {
        const amenitiesData = formData.get("amenitiesData");
        const selectedAmenityNames = amenitiesData ? JSON.parse(amenitiesData) : [];
        
        const groupedAmenities = allAmenities.map(group => ({
            amenityType: group.amenityType,
            amenityName: group.amenityName.filter(name => 
                selectedAmenityNames.includes(name)
            )
        })).filter(group => group.amenityName.length > 0);

        amenities = groupedAmenities;
    } catch (error) {
        console.error('Error parsing amenities:', error);
        amenities = [];
    }

    let images = [];
    try {
        const imagesData = formData.get("imagesData");
        images = imagesData ? JSON.parse(imagesData) : [];
    } catch (error) {
        console.error('Error parsing images:', error);
        images = [];
    }

    const roomData = {
        roomName: formData.get("roomName"),
        roomNumber: formData.get("roomNumber"),
        roomType: formData.get("roomType"),
        numOfBeds: formData.get("numOfBeds"),
        bedType: formData.get("bedType"),
        maxAdults: formData.get("maxAdults"),
        maxChildren: formData.get("maxChildren"),
        images: images,
        description: formData.get("description"),
        amenities: amenities,
        originPrice: formData.get("originPrice"),
        discountPercentage: formData.get("discountPercentage"),
        taxPercentage: formData.get("taxPercentage"),
    };

    return createRoom(hotelId, roomData);
}
