
import { auth } from '@clerk/nextjs/server';
import EditHotelCard from "../../../components/cards/editHotelCard";
import getHotelsByUserId from "../../../api/hotel/getHotelsByUserId";

export default async function HotelManagement({params}) {
    const { userId } = auth();
    params.userId = userId;

    const hotels = await getHotelsByUserId(userId);
    console.log(hotels);

    return (
        <>
            <div className="flex flex-col mb-[2.5rem]">                
                <h2 className="text-center">Quản lý Khách sạn</h2>
            </div>

            <div className="flex flex-row gap-4">                        
                {hotels.map(hotel => (
                    hotel.hotelName &&
                    <EditHotelCard key={hotel.id} hotelName={hotel.hotelName} href={`/hotelSetup/${hotel.id}`}/>
                ))}                    
            </div>
        </>
    )

}