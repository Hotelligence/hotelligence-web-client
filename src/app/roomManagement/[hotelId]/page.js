import BackButton from "../../../components/buttons/backButton";
import CustomButton from "../../../components/buttons/button";
import Sort from "../../../components/inputs/sort";
import CustomCheckbox from "../../../components/buttons/customCheckbox";
import EditRoomCard from "../../../components/cards/editRoomCard";
import getRoomsInHotel from "../../../api/room/getRoomsInHotel";
import Link from "next/link";

export default async function RoomManagement ({params}) {
    const rooms = await getRoomsInHotel(params.hotelId);
    console.log(rooms);

    return (        
        <>
            <div className="grid grid-cols-3 mb-[2.5rem]">
                <BackButton label={"Quay về Thiết lập Khách sạn"}/>
                <h2 className="text-center">Quản lý Phòng</h2>
            </div>

            <div className="flex flex-row gap-4">
                <div className="w-1/3">
                    <h3>Lọc theo</h3>

                    <CustomCheckbox label="Phòng đang hoạt động"/>
                </div>

                <div className="w-full">
                    <div className="flex flex-row justify-between mb-10">
                        <div className="w-[21.875rem]">
                            <Sort/>
                        </div>

                        <CustomButton><Link href={`/addRoom/${params.hotelId}`}> Thêm phòng </Link> </CustomButton>
                    </div>

                    <div className="flex flex-row flex-wrap justify-between gap-10">

                            
                            {rooms.map(room => (
                                room.roomName &&
                                <EditRoomCard key={room.id} 
                                    image={room.images[0]}
                                    roomName={room.roomName} 
                                    roomType={room.roomType} 
                                    bedType={room.bedType}
                                    roomNumber={room.roomNumber}
                                    href={`/editRoom/${room.id}`}/>
                            ))}
                            </div>
                </div>
            </div>
        </>
    )
}