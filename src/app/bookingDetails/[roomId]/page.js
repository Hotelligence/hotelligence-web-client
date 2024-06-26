import BackButton from "../../../components/buttons/backButton";
import styles from "./bookingDetails.module.css";
import BookingForm from "../../../components/views/bookingForm";
import { Input, RadioGroup, Radio } from "@nextui-org/react";
import Image from "next/image";
import VisaLogo from "../../../images/Visa_Logo.png"
import MasterCardLogo from "../../../images/MasterCard_Logo.png"
import MomoLogo from "../../../images/Momo_Logo.png"
import VNPayLogo from "../../../images/VNPay_Logo.png"
import CustomButton from "../../../components/buttons/button";
import Receipt from "../../../components/views/receipt";
import CancelPolicy from "../../../components/views/cancelPolicy";
import getAllHotels from "../../../api/hotel/getAllHotels"
import getAllRooms from "../../../api/room/getAllRooms";
import getAllBookings from "../../../api/booking/getAllBookings";
import placeBooking from "../../../api/booking/placeBooking";
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation'
import getBookingById from "../../../api/booking/getBookingById";
import { getLocalTimeZone, today, parseDate } from "@internationalized/date";

export default async function BookingDetails({ params }) {
    
    const {userId} = auth();

    const hotels = await getAllHotels();
    const rooms = await getAllRooms();
    const bookings = await getAllBookings();

    const roomDetails = rooms.find(r => r.id === params.roomId); 
    const hotelDetails = hotels.find(h => h.id === roomDetails.hotelId);
    const bookingDetails = bookings.find(b => b.roomId === params.roomId);

    async function handlePlaceBooking(formData){
        'use server'

        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localDate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

        const bookingData = {
            userId: formData.get("userId"),
            fullName: formData.get("fullName"),
            email: formData.get("email"),
            phoneNumber: formData.get("phoneNumber"),
            paymentMethod: formData.get("paymentMethod"),
            bookingDate: localDate,
            checkinDate: localDate,
            checkoutDate: localDate,
            cancelDue: localDate,
            unCancelDue: localDate,
            bookingStatus: "Đang chờ thanh toán" 
            // cardNumber: formData.get("cardNumber"),
            // expiredDate: formData.get("expiredDate"),
            // cvv: formData.get("cvv"),
            // roomId: params.roomId,
        }

        console.log(bookingData.checkinDate);
        console.log(bookingData)

        await placeBooking(roomDetails.id, bookingData);

        const bookings = await getAllBookings();
        console.log(bookings);
        const booking = await getBookingById(bookings[bookings.length - 1].id);
        console.log(booking);

        let paymentRedirectUrl = '';
        if (bookingData.paymentMethod === "offline") {
            paymentRedirectUrl = "/payOffline";
        } else {
            paymentRedirectUrl = `/payOnline/${booking.id}`; 
        }

        if (paymentRedirectUrl) {
            redirect(paymentRedirectUrl);
        }
    }

    return (
        <>
            <BackButton label="Xem tất cả phòng"/>

            <h2 className="mt-[1.875rem]">Chi tiết đặt phòng</h2>

            <div className={styles.pageContainer}>
                <form className={styles.forms} action={handlePlaceBooking}>            
                    <BookingForm step={1} title="Thông tin cá nhân">
                        <p className="body4 text-justify">Vui lòng cho chúng tôi biết tên khách sẽ lưu trú tại phòng này chính xác như trên giấy tờ tùy thân sẽ sử dụng khi nhận phòng. Vui lòng nhập đầy đủ nếu khách mang họ kép (như Nguyễn Phước, Tôn Nữ, Lê Đoàn, v.v.).</p>

                        <div className="flex flex-col gap-[1.25rem] w-[45%]">
                            <Input label="Họ và tên" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isClearable isRequired
                                name="fullName"/>
                            <Input label="Email" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isClearable isRequired
                                type="email"
                                name="email"/>
                            <Input label="Số điện thoại" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isClearable isRequired
                                type="text"
                                name="phoneNumber"
                                pattern="[0-9]*"
                                title="Please enter a valid phone number"/>
                        </div>
                    </BookingForm>

                    <BookingForm step={2} title="Kiểm tra thông tin phòng">
                        <h5>◆ &nbsp; {roomDetails.roomName}</h5>
                        {/* <h6 className="text-[var(--secondary-green-100)]">✓ Bao gồm bữa sáng cho 2 người</h6> */}
                    </BookingForm>

                    <BookingForm step={3} title="Phương thức thanh toán">
                        <RadioGroup defaultValue="offline"  name="paymentMethod">
                            <Radio value="offline"><h6>Thanh toán tại khách sạn</h6></Radio>
                            <Radio value="online"><h6>Thanh toán trực tuyến</h6></Radio>
                        </RadioGroup>

                        <div className="mt-[-0.5rem] pl-[1.75rem]">
                            <p className="body3 opacity-80">Chấp nhận thanh toán thông qua các thẻ tín dụng và ví điện tử hiện hành:</p>
                            <div className="flex flex-row gap-[1rem] mt-[0.5rem]">
                                {/* <Image src={VisaLogo}/>
                                <Image src={MasterCardLogo}/>
                                <Image src={MomoLogo}/> */}
                                <Image src={VNPayLogo}/>
                            </div>
                        </div>

                        <hr/>

                        {/* <p className="body3 text-justify opacity-80">Để đảm bảo quyền lợi giữa Quý khách và khách sạn, chúng tôi yêu cầu thêm thông tin về thẻ tín dụng. Chúng tôi cam kết sử dụng phương thức truyền tải an toàn để bảo vệ thông tin cá nhân của Quý khách.</p>
                        <div className="flex flex-row justify-between gap-[1rem]">
                            <Input label="Số thẻ" labelPlacement="outside" variant="bordered" placeholder="XXXX XXXX XXXX XXXX" size="lg" isClearable isRequired
                                name="cardNumber"/>
                            <Input label="Ngày hết hạn" labelPlacement="outside" variant="bordered" placeholder="MM/YY" size="lg" isClearable isRequired
                                name="expiredDate"/>
                            <Input label="Mã số CVV" labelPlacement="outside" variant="bordered" placeholder="XXX" size="lg" isClearable isRequired
                                name="cvv"/>
                        </div> */}
                    </BookingForm>

                    {/* Hidden inputs to pass additional data */}                    
                    <input type="hidden" name="checkinDate" value={Date.parse("2024-08-15")} />
                    <input type="hidden" name="checkoutDate" value={Date.parse("2024-08-15")} />
                    <input type="hidden" name="cancelDue" value={Date.parse("2024-08-15")} />
                    <input type="hidden" name="unCancelDue" value={Date.parse("2024-08-15")} />
                    <input type="hidden" name="userId" value={userId} />

                    <p className="body3 text-justify">Bằng việc bấm "Đặt phòng", chúng tôi mặc định Quý khách xác nhận đã đọc và đồng ý Điều khoản & Điều kiện, Chính sách bảo mật và Hướng dẫn du lịch của chính phủ của Hotelligence.</p>

                    <div className="flex justify-end">
                        <CustomButton type="submit">                   
                            Đặt phòng
                        </CustomButton>
                    </div>
                </form>

                <div className={styles.receipt}>
                    <Receipt 
                        hotelName={hotelDetails.hotelName} 
                        roomName={roomDetails.roomName}
                        checkinDate={bookingDetails.checkinDate}
                        checkoutDate={bookingDetails.checkoutDate}
                        numOfNights={roomDetails.numOfGuests}
                        originPrice={roomDetails.originPrice}
                        taxPercentage={roomDetails.taxPercentage}
                        tax={roomDetails.tax}
                        extraFee={roomDetails.extraFee}
                        totalPrice={roomDetails.totalPrice}/>
                    <CancelPolicy 
                        cancelDue={today(getLocalTimeZone()).add({ days: 1 })}
                        unCancelDue={today(getLocalTimeZone()).add({ days: 7 })}
                        />
                </div>
            </div>
        </>
    )
}