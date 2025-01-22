'use client'
import { CheckboxGroup, Checkbox } from "@heroui/react"

export default function AmenityForm({allRoomAmenitiesInHotel, selectedAmenities, onAmenitiesChange}) {
    console.log('AmenityForm - Available amenities:', allRoomAmenitiesInHotel);
    console.log('AmenityForm - Selected amenities:', selectedAmenities);

    return (
        <div className="flex flex-col">
            {allRoomAmenitiesInHotel?.map((amenityGroup, index) => {
                const amenityNames = Array.isArray(amenityGroup.amenityName) 
                    ? amenityGroup.amenityName 
                    : [];
                
                // Get selected amenities for this group
                const groupSelectedAmenities = selectedAmenities.filter(
                    amenity => amenityNames.includes(amenity)
                );
                
                console.log(`Group ${amenityGroup.amenityType} selected:`, groupSelectedAmenities);
                    
                return (
                    <div key={index} className="flex flex-row gap-4 p-4">
                        <CheckboxGroup 
                            label={amenityGroup.amenityType}
                            value={groupSelectedAmenities}
                            defaultValue={groupSelectedAmenities}
                            onChange={(values) => {
                                const otherGroupsSelected = selectedAmenities.filter(
                                    amenity => !amenityNames.includes(amenity)
                                );
                                
                                const newSelectedAmenities = [
                                    ...otherGroupsSelected,
                                    ...values
                                ].filter(Boolean);

                                console.log('New selection:', newSelectedAmenities);
                                onAmenitiesChange(newSelectedAmenities);
                            }}
                        >
                            {amenityNames.map((amenity, idx) => (
                                <Checkbox 
                                    key={idx} 
                                    value={amenity}
                                    isSelected={selectedAmenities.includes(amenity)}
                                >
                                    {amenity}
                                </Checkbox>
                            ))}
                        </CheckboxGroup>
                    </div>
                )
            })}
        </div>
    )
}