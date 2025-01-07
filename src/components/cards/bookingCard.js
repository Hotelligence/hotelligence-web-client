'use client';
import CustomButton from '../buttons/button';
import Link from 'next/link';
import UpdateBookingPaymentModal from '../views/updateBookingPaymentModal';
import CheckoutModal from '../views/checkoutModal';

export default function BookingCard({
    roomName,
    numOfNights,
    bookingId,
    bookingDate,
    checkinDate,
    checkoutDate,
    bookingStatus,
    updateAction,
    checkoutAction,
    bookingIdName
}) {
    function formatDate(date) {
        const d = new Date(date);
        const dd = d.getDate();
        const mm = d.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const yyyy = d.getFullYear();
        const dayOfWeek = d.toLocaleDateString('vi-VN', { weekday: 'long' }); // Get the day of the week
        const hours = d.getHours();
        const minutes = d.getMinutes().toString().padStart(2, '0'); // Add leading zero if minutes < 10
        return `${dayOfWeek}, ngày ${dd} tháng ${mm} năm ${yyyy} (${hours}:${minutes})`;
    }

    return (
        <>
            <div className="flex flex-col p-4 w-[30rem] h-auto max-h-[18rem] border-1 border-[var(--primary-blue-50)] rounded-[0.625rem] hover:cursor-pointer hover:border-[var(--primary-blue-100)] hover:shadow-black">
                <div className="flex mb-4">
                    <div className="w-full">
                        <h4>{roomName} ({numOfNights} đêm)</h4>
                    </div>
                    
                </div>

                <div className="flex flex-row">
                    <div className="w-[8rem]">
                        <h6 className="w-[8rem]">Mã đặt phòng</h6>
                    </div>
                    <text className="body3 text-justify">{`#${bookingId}`}</text>
                </div>

                <div className="flex flex-row">
                    <div className="w-[8rem]">
                        <h6 className="w-[8rem]">Đặt phòng</h6>
                    </div>
                    <text className="body3 text-justify">{formatDate(bookingDate)}</text>
                </div>

                <div className="flex flex-row">
                    <div className="w-[8rem]">
                        <h6 className="w-[8rem]">Nhận phòng</h6>
                    </div>
                    <text className="body3 text-justify">{formatDate(checkinDate)}</text>
                </div>

                <div className="flex flex-row">
                    <div className="w-[8rem]">
                        <h6 className="w-[8rem]">Trả phòng</h6>
                    </div>
                    <text className="body3 text-justify">{formatDate(checkoutDate)}</text>
                </div>

                <div className="flex flex-row mt-2">
                    <div className="w-[8rem]">
                        <h6 className="w-[8rem]">Tình trạng</h6>
                    </div>
                    {bookingStatus === "Đang chờ thanh toán" && 
                        <p className="body3 text-[var(--secondary-blue-100)]"> Đang chờ thanh toán </p>}

                    {bookingStatus === "Đã thanh toán" && 
                        <p className="body3 text-[var(--secondary-green-100)]"> Đã thanh toán </p>}

                    {bookingStatus === "Hoàn tất" && 
                        <p className="body3 text-[var(--secondary-green-100)]"> Hoàn tất </p>}

                    {bookingStatus === "Đã hủy" && 
                        <p className="body3 text-[var(--secondary-red-100)]"> Đã hủy </p>}
                </div>

                <div className="flex justify-end mt-4">                 
                    {bookingStatus === "Đang chờ thanh toán" &&
                        <UpdateBookingPaymentModal 
                            action={updateAction}
                            bookingId={bookingId} 
                            bookingIdName={bookingIdName}/>
                    }
                    {bookingStatus === "Đã thanh toán" &&
                        <CheckoutModal 
                            action={checkoutAction}
                            bookingId={bookingId} 
                            bookingIdName={bookingIdName}/>
                    }
                </div>
            </div>
        </>
    )
}