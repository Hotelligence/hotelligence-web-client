import { ArrowLeft } from "lucide-react";
import { Button } from "@heroui/react";
import ButtonWithImage from '../../../components/buttons/buttonWithImage';
import ButtonOutline from '../../../components/buttons/buttonOutline';
import MomoLogoBig from '../../../images/Momo_Logo_Big.png'
import VNPayLogoBig from '../../../images/VNPay_Logo_Big.png'
import handleVNPayPayment from '../../../api/payment/vnpay'
import getBookingById from '../../../api/booking/getBookingById';
import getBookingsByRoomId from '../../../api/booking/getBookingsByRoomId';
import getRoomById from '../../../api/room/getRoomById';
import { redirect } from 'next/navigation';
import updateBookingStatus from '../../../api/booking/updateBookingStatus';
import returnVNPay from '../../../api/payment/returnVNPay';


export default async function PayViaEWallet({params}) {
    const booking = await getBookingById(params.bookingId);
    const bookingsOfRoom = await getBookingsByRoomId(booking.roomId);
    const theLastBooking = bookingsOfRoom[bookingsOfRoom.length - 1];
    // console.log(theLastBooking);
    const roomInfo = await getRoomById(theLastBooking.roomId);
    console.log(roomInfo);

    // async function handleVNPay(){
    //     'use server'

    //     const vnPayRequest = {
    //         amount: roomInfo.totalPrice,
    //         orderInfo: `Thanh toán phòng ${roomInfo.roomName}`,
    //     }

    //     const url = await handleVNPayPayment(vnPayRequest);
    //     console.log(url);

    //     redirect(url);
    // }

    const vnpay = await handleVNPayPayment(roomInfo.totalPrice, `Thanh toán phòng ${roomInfo.roomName}`, params.bookingId);
    console.log(vnpay);

    // const returnUrl = await returnVNPay(booking.id);

    await updateBookingStatus(booking.id, 'Hoàn tất');
    

    return (
        <>
            <div className="flex items-center mb-[0.94rem]">
                <Button className="flex justify-start mr-auto" isIconOnly color="transparent" disableAnimation="true">
                    <ArrowLeft size={24}/>
                </Button>
                <h2 className="flex text-center justify-center items-center m-[0px_auto_0px_0px] pr-10">Thanh toán bằng Ví điện tử</h2>
            </div>

            <div className="flex flex-col mt-5 w-1/3 items-center mx-auto gap-5">
                <h6 className='text-center'>Quý khách vui lòng chọn ví điện tử</h6>

                <div className="flex flex-row gap-5">
                    <ButtonWithImage 
                        title="Ví VNPay" 
                        img={VNPayLogoBig} 
                        alt="vnpay" 
                        href={vnpay}
                    />
                    <ButtonWithImage title="Ví Momo" img={MomoLogoBig} alt="momo"/>
                </div>

                <div className="mt-5">
                    <ButtonOutline>Quay về Trang chủ</ButtonOutline>
                </div>
            </div>            
        </>
    )
}