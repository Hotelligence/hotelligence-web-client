import BackButton from "../../../components/buttons/backButton";
import CustomButton from "../../../components/buttons/button";
import Sort from "../../../components/inputs/sort";
import CustomCheckbox from "../../../components/buttons/customCheckbox";
import EditRoomCard from "../../../components/cards/editRoomCard";
import getRoomsInHotel from "../../../api/room/getRoomsInHotel";
import Link from "next/link";
import BookingCard from "../../../components/cards/bookingCard"
import getBookingsByHotelId from "../../../api/booking/getBookingsByHotelId";
import updateBookingStatus from "../../../api/booking/updateBookingStatus";
import updateCheckoutStatus from "../../../api/booking/updateCheckoutStatus";

export default async function BookingManagement({params}) {
    const hotelId = params.hotelId;

    const bookings = await getBookingsByHotelId(hotelId);
    
    async function handleUpdatePaymentStatus(formData) {
        'use server'

        const updatePaymentStatus = {
            bookingId: formData.get("dataBookingId"),        
        }

        await updateBookingStatus(updatePaymentStatus.bookingId, "Đã thanh toán");
        console.log(updatePaymentStatus.bookingId);
    }

    async function handleCheckout(formData) {
        'use server'

        const checkout = {
            bookingId: formData.get("dataBookingId"),        
        }

        await updateCheckoutStatus(checkout.bookingId);
        console.log(checkout.bookingId);
    }

    return (
        <>
            <div className="grid grid-cols-3 mb-[2.5rem]">
                <BackButton label={"Quay về Thiết lập Khách sạn"}/>
                <h2 className="text-center">Quản lý Đơn đặt phòng</h2>
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

                        {/* <CustomButton><Link href={`/addRoom/${params.hotelId}`}> Thêm phòng </Link> </CustomButton> */}
                    </div>

                    <div className="flex flex-row flex-wrap justify-between gap-10">                            
                        {bookings.map(booking => (
                            booking &&
                            <BookingCard 
                                key={booking.id}
                                roomName={booking.roomName}
                                numOfNights={booking.numOfNights}
                                bookingId={booking.id}
                                bookingDate={booking.bookingDate}
                                checkinDate={booking.checkinDate}
                                checkoutDate={booking.checkoutDate}
                                bookingStatus={booking.bookingStatus}
                                updateAction={handleUpdatePaymentStatus}
                                checkoutAction={handleCheckout}
                                bookingIdName="dataBookingId"
                                />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )   
}