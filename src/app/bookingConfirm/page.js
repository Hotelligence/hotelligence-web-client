import { Input } from "@heroui/react"
import BackButton from '../../components/buttons/backButton'
import CustomButton from '../../components/buttons/button'

export default function BookingConfirmPage() {
    return (
        <>
            <BackButton href="/bookingDetails" label="Quay lại Đặt phòng"/>

            <div className="flex flex-col items-center w-1/3 mt-7 mx-auto">
                <h2>Xác nhận đặt phòng</h2>

                <p className='body4 mt-[0.94rem] mb-[1.5rem] text-center text-[var(primary-blue-50)]'>Hãy nhập mã bảo mật chúng tôi đã gửi qua email. Nếu không thấy email này trong hộp thư đến, hãy kiểm tra hộp thư rác</p>

                <Input label="Mã xác nhận 6 chữ số" size="lg" variant="bordered" isClearable/>

                <div className="mt-[2.5rem]">
                    <CustomButton>Xác nhận</CustomButton>
                </div>
            </div>
        </>
    )
}