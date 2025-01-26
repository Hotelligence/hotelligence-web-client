import CustomButton from '../../components/buttons/button'
import Link from 'next/link'
import ButtonOutline from '../../components/buttons/buttonOutline'
import { auth } from "@clerk/nextjs/server";
import getAllHotel from '../../api/hotel/getAllHotels'
import getHotelsByUserId from '../../api/hotel/getHotelsByUserId'


export default async function PartnerRegister () {
    const { userId } = auth();

    const hotels = await getHotelsByUserId(userId);
    console.log(hotels);

    // get the lastest created hotel
    const hotel = hotels[hotels.length - 1];
    console.log(hotel);

    return (
        <div className="flex flex-col items-center mt-7 w-1/3 mx-auto gap-5">
            <h2>Đăng ký trở thành Đối tác</h2>
            <>
                <h6 className='text-center'>
                Chúc mừng quý khách đã thành công trở thành đối tác của Hotelligence!
                </h6>

                <div className='flex mt-[1.25rem] gap-[2.5rem]'>
                    <CustomButton><Link href={`/hotelSetup/${hotel.id}`}>Thiết lập khách sạn</Link></CustomButton>                    
                </div>

                <div className='mt-[1.25rem]'>
                    <ButtonOutline><Link href="/">Quay về trang chủ</Link></ButtonOutline>
                </div>
            </>
        </div>
    )
}