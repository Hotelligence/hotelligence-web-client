import { Checkbox, Input,Button } from "@heroui/react";
import CustomButton from "../../components/buttons/button";
import CustomButtonOutline from "../../components/buttons/buttonOutline";
import Link from 'next/link';
import BackButtonIconOnly from "../../components/buttons/backButtonIconOnly";

export default function ForgetPasswordByOTP() {
    return (
        <>
            <div className="flex items-center mb-[0.94rem]">
                <BackButtonIconOnly/>
                <h2 className="flex text-center justify-center items-center mr-auto pr-[3rem]">Hãy xác nhận đó là bạn</h2>
            </div>

            <div className="flex flex-col mt-[1.25rem] w-1/3 items-center mx-auto gap-[1.25rem]">
                <p className='body4 text-[var(--primary-blue-50)] text-center'>Hãy nhập mã bảo mật chúng tôi đã gửi qua email. Nếu không thấy email này trong hộp thư đến, hãy kiểm tra hộp thư rác</p>

                <Input label="Mã xác nhận 6 chữ số" variant="bordered" size="lg" isClearable/>

                <div className='mt-[1.25rem]'>
                    <CustomButton href="/createNewPassword">Tiếp tục</CustomButton>
                </div>

                <p className="body4">Gửi lại mã sau 30 giây</p>
            </div>

        </>
    )
}