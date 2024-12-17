import InfoForm from "../../../components/forms/hotelInfoForm";
import PolicyForm from "../../../components/forms/policyForm";
import RectangleButton2 from "../../../components/buttons/rectangleButton2";
import getHotelById from "../../../api/hotel/getHotelById";
import updateHotel from "../../../api/hotel/updateHotel";
import { auth } from "@clerk/nextjs/server";
import getHotelsByUserId from "../../../api/hotel/getHotelsByUserId";

export default async function HotelSetup({params}) {
    const {userId} = auth();

    const hotels = await getHotelsByUserId(userId);

    //hotelToGet is the hotel that has the id = params.hotelId
    const hotelToGet = hotels.filter(hotel => hotel.id === params.hotelId)[0];
    console.log(hotelToGet);    

    async function handleUpdateHotel(formData) {
        'use server'
        
        let images = [];
        try {
            const imagesData = formData.get("imagesData");
            images = imagesData ? JSON.parse(imagesData) : [];
        } catch (error) {
            console.error('Error parsing images:', error);
            images = [];
        }
        
        const hotelData = {
            hotelName: formData.get("hotelName"),
            country: formData.get("country"),
            province: formData.get("province"),
            city: formData.get("city"),
            district: formData.get("district"),
            address: formData.get("address"),
            postalCode: formData.get("postalCode"),
            businessType: formData.get("businessType"),
            phoneNumber: formData.get("phoneNumber"),
            emailAddress: formData.get("emailAddress"),
            star: formData.get("star"),
            description: formData.get("description"),
            images: images,
            optionalFees: formData.get("optionalFees"),
            amenities: formData.get("amenities"),
            policies: formData.get("policies"),
            otherNames: formData.get("otherNames"),
        };

        await updateHotel(hotelToGet.id, hotelData);
    }

    return(
        <div>
            <h2 className="mt-[1.75rem] mb-[2.5rem] text-center mx-auto">Thiết lập Khách sạn</h2>

            <div className="flex flex-row gap-[1.875rem]">
                <div className="flex flex-col w-[63rem] gap-[1.25rem]">
                    <InfoForm 
                        title={`Thông tin khách sạn: Khách sạn ${hotelToGet.hotelName}`} 
                        action={handleUpdateHotel}
                        hotel={hotelToGet}
                    />
                </div>

                <div className="flex flex-col gap-[1.875rem] w-[19rem]">
                    <RectangleButton2 href={"/roomManagement"}> Quản lý Phòng </RectangleButton2>
                    <RectangleButton2 href={"/updatePaymentStatus"}> Cập nhật Tình trạng <br/> Đơn đặt phòng </RectangleButton2>
                    <RectangleButton2 href={"/cancelParnership"}> Hủy Đối tác </RectangleButton2>
                </div>
            </div>
        </div>
    )
}