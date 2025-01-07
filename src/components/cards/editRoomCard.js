import Image from "next/image";
import CustomButton from "../buttons/button";
import Link from "next/link";

export default function EditRoomCard({image, roomName, roomType, bedType, roomNumber, href}) {
    return (
        <div className="flex flex-col justify-between w-[18.75rem] h-[22.5rem] border-1 border-[var(--primary-blue-50)] rounded-[0.625rem] hover:cursor-pointer hover:border-[var(--primary-blue-100)] hover:shadow-black">
            <div className="relative w-full h-[12.75rem] rounded-t-[0.625rem] overflow-hidden group">
                <Image 
                    src={image} 
                    alt="roomImage" 
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 group-hover:scale-110"
                /> 
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
                    <CustomButton><Link href={href}>Sửa</Link></CustomButton>
                </div>
            </div>
        </div>
    )
}