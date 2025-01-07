import RoomInfoForm from "../../../components/forms/roomInfoForm"
import BackButton from "../../../components/buttons/backButton"
import getRoomById from "../../../api/room/getRoomById";
import getAllRoomAmenitiesByHotelId from "../../../api/hotel/getAllRoomAmenitiesByHotelId";
import { handleUpdateRoom } from "../actions";

export default async function EditRoom({params}) {
    const roomId = params.roomId;
    
    console.log('Fetching room with ID:', roomId);
    const room = await getRoomById(roomId);
    if (!room) {
        console.error('Room not found');
        throw new Error(`Room with ID ${roomId} not found`);
    }

    const allAmenities = await getAllRoomAmenitiesByHotelId(room.hotelId);

    // Bind the action with roomId and allAmenities
    const boundAction = async (formData) => {
        'use server'
        return handleUpdateRoom(roomId, allAmenities, formData);
    };

    return (
        <>
            <div className="grid grid-cols-3 mb-[2.5rem]">
                <BackButton label={"Quay về Quản lý phòng"}/>
                <h2 className="text-center">Chỉnh sửa Phòng <br/> {room?.roomName}</h2>
            </div>

            <RoomInfoForm 
                action={boundAction}
                room={room} 
                allRoomAmenitiesInHotel={allAmenities}
            />
        </>
    )
}