import CustomButton from '../../components/buttons/button'
import ButtonOutline from '../../components/buttons/buttonOutline'

export default function BookingStatusPage() {
    return (
        <div className="flex flex-col mt-[1.75rem] w-1/3 items-center mx-auto gap-[1.25rem]">
            <h2>Đặt phòng thành công!</h2>

            <h6>Chúc mừng Quý khách đã đặt phòng thành công!</h6>

            <p className="body3 text-center">Quý khách vui lòng theo dõi và hoàn thành các thủ tục còn lại (nếu có) theo hướng dẫn để có được trải nghiệm tốt nhất. <br/>
            Cảm ơn Quý khách đã sử dụng dịch vụ của Hotelligence.</p>

            <div className='mt-[1.25rem]'>
                <CustomButton>Thanh toán</CustomButton>
            </div>

            <ButtonOutline>Quay về trang chủ</ButtonOutline>
        </div>
    )
}