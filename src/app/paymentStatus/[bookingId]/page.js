import ButtonOutline from '../../../components/buttons/buttonOutline'
import handleVNPayPayment from '../../../api/payment/vnpay'
import Link from 'next/link';
import updateBookingStatus from '../../../api/booking/updateBookingStatus';
import getBookingById from '../../../api/booking/getBookingById';
import returnVNPay from '../../../api/payment/returnVNPay';

export default async function PaymentStatus({params}) {

    const booking = await getBookingById(params.bookingId);
    console.log(booking);
    console.log(await updateBookingStatus(params.bookingId, 'Hoàn tất'));

    return (
        <div className="flex flex-col items-center w-[35%] mx-auto mt-7 gap-5">
            <h2>Thanh toán thành công!</h2>

            {/* <h6>Quý khách đã thanh toán thành công số tiền <span className='text-[var(--primary-gold-120)]'>{amount.toLocaleString()}đ</span></h6> */}

            <p className='body3 text-center'>Cảm ơn Quý khách đã sử dụng dịch vụ của Hotelligence. <br/> Kính chúc Quý khách có một chuyến đi vui vẻ!</p>

            <div className='mt-5'>
                <ButtonOutline>
                    <Link href="/">
                        Quay về Trang chủ
                    </Link>
                </ButtonOutline>
            </div>
        </div>
    );
}