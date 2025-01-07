import Image from "next/image";
import CustomButton from "../buttons/button";
import Link from "next/link";

export default function EditHotelCard({hotelName, href}) {
    return (
        <div className="flex flex-col justify-between w-[18.75rem] h-auto border-1 border-[var(--primary-blue-50)] rounded-[0.625rem] hover:cursor-pointer hover:border-[var(--primary-blue-100)] hover:shadow-black">
            

            <div className="flex flex-col p-3 justify-between items-stretch">
                <h4>Khách sạn: {hotelName}</h4>

                <div className="flex justify-end mt-auto">
                    <CustomButton><Link href={href}>Sửa</Link></CustomButton>
                </div>
            </div>
        </div>
    )
}