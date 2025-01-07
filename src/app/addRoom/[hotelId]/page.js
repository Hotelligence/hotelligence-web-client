import RoomInfoForm from "../../../components/forms/roomInfoForm"
import BackButton from "../../../components/buttons/backButton"
import getRoomById from "../../../api/room/getRoomById";
import getAllRoomAmenitiesByHotelId from "../../../api/hotel/getAllRoomAmenitiesByHotelId";
import { handleCreateRoom } from "../actions";

export default async function AddRoom({params}) {
    const hotelId = params.hotelId;    

    const allAmenities = await getAllRoomAmenitiesByHotelId(hotelId);

    const boundAction = async (formData) => {
        'use server'
        return handleCreateRoom(hotelId, allAmenities, formData);
    };

    return (
        <>
            <div className="grid grid-cols-3 mb-[2.5rem]">
                <BackButton label={"Quay về Quản lý phòng"}/>
                <h2 className="text-center">Thêm Phòng</h2>
            </div>

            <RoomInfoForm 
                action={boundAction}
                allRoomAmenitiesInHotel={allAmenities}
            />
        </>
    )
}