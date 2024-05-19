import { ArrowLeft } from "lucide-react";
import styles from "./forgetPasswordByOTP.module.css";
import { Checkbox, Input,Button } from "@nextui-org/react";
import CustomButton from "../../components/buttons/button";
import CustomButtonOutline from "../../components/buttons/buttonOutline";
import Link from 'next/link';
import BackButtonIconOnly from "../../components/buttons/backButtonIconOnly";

export default function ForgetPasswordByOTP() {
    return (
        <>
            <div className={styles.header}>
                <BackButtonIconOnly/>
                <h2 className={styles.title}>Hãy xác nhận đó là bạn</h2>
            </div>

            <div className={styles.pageContainer}>
                <text className='body4 text-[var(--primary-blue-50)] text-center'>Hãy nhập mã bảo mật chúng tôi đã gửi qua email. Nếu không thấy email này trong hộp thư đến, hãy kiểm tra hộp thư rác</text>

                <Input label="Mã xác nhận 6 chữ số" variant="bordered" size="lg" isClearable/>

                <div className='mt-[1.25rem]'>
                    <CustomButton href="/createNewPassword">Tiếp tục</CustomButton>
                </div>

                <text className="body4">Gửi lại mã sau 30 giây</text>
            </div>

        </>
    )
}