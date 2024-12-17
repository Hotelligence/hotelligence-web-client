import Image from "next/image";
import CustomButton from "../buttons/button";

export default function EditRoomCard({roomName, roomType, bedType, roomNumber}) {
    return (
        <div className="flex flex-col justify-between w-[18.75rem] h-[22.5rem] border-1 border-[var(--primary-blue-50)] rounded-[0.625rem] hover:cursor-pointer hover:border-[var(--primary-blue-100)] hover:shadow-black">
            <div className="w-full h-[12.75rem]">
                <Image size={100} alt="roomImage"/>
            </div>

            <div className="flex flex-col p-3 justify-between items-stretch">
                <h4>{roomName}</h4>

                <div className="flex flex-row gap-2">
                    <h5>{roomType}</h5>
                    <h5>|</h5>
                    <h5>{bedType}</h5>
                </div>

                <h5>Số phòng: {roomNumber}</h5>

                <div className="flex justify-end mt-auto">
                    <CustomButton>Sửa</CustomButton>
                </div>
            </div>
        </div>
    )
}