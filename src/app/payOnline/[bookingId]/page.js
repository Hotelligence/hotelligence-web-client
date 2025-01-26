import RectangleButton from '../../../components/buttons/rectangleButton'
import ButtonOutline from '../../../components/buttons/buttonOutline'
import getBookingById from '../../../api/booking/getBookingById'

export default async function PayOnline({params}) {
    const booking = await getBookingById(params.bookingId);
    console.log(booking);
    return (
        <div className="flex flex-col items-center w-[35%] mx-auto mt-7 gap-5">
            <h2>Thanh toán trực tuyến</h2>

            <h6> Quý khách vui lòng chọn hình thức thanh toán trực tuyến </h6>

            <div className='flex flex-row gap-[1.25rem]'>
                {/* <RectangleButton href="/payViaCard">Thẻ tín dụng</RectangleButton> */}
                <RectangleButton href={`/payViaEWallet/${booking.id}`}>Ví điện tử</RectangleButton>
            </div>

            <div className='mt-[1.25rem]'>
                <ButtonOutline>Quay về Trang chủ</ButtonOutline>
            </div>
        </div>
    )
}
