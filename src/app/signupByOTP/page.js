'use client'
import styles from "../loginByOTP/loginByOTP.module.css";
import styleLogin from "../loginOrSignUp/loginOrSignUp.module.css";
import { Checkbox, Input } from "@nextui-org/react";
import CustomButton from "../../components/buttons/button";
import CustomButtonOutline from "../../components/buttons/buttonOutline";
import Link from 'next/link';
import BackButtonIconOnly from "../../components/buttons/backButtonIconOnly";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignUpByOTP() {
    const {signUp} = useSignUp();
    const [code, setCode] = useState("");
    const router = useRouter();

    const onPressVerify = async () => {
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === 'complete' || completeSignUp.status === 'missing_requirements') {
                router.push("/nameAndPasswordRegister");
            } else {
                console.log('Unexpected status:', completeSignUp.status);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className={styles.header}>
                <BackButtonIconOnly/>
                <h2 className={styles.title}>Hãy xác nhận đó là bạn</h2>
            </div>

            <div className={styles.descriptionWrapper}>
                <div className={styles.description}>
                    <text className="body4">Hãy nhập mã bảo mật chúng tôi đã gửi qua email. Nếu không thấy email này trong hộp thư đến, hãy kiểm tra hộp thư rác.</text>
                </div>
            </div>

            <div className={styleLogin.buttonContainer}>
                    <div className={styleLogin.buttonWrapper}>
                        <Input 
                            color="white" 
                            variant="bordered" 
                            fullWidth="true" 
                            size="lg" 
                            placeholder="Mã xác nhận 6 chữ số"                            
                            isClearable="true"
                            onChange={(e) => setCode(e.target.value)}
                            value={code}
                            id="code"
                        >
                        </Input>
                    </div>
            </div>
            
            <div className={styleLogin.buttonContainer}>
                <div className={styles.buttonWrapper2}>
                    <Checkbox color="var(--primary-blue-100)" size="sm">
                        <text className="body4">Giữ tôi luôn đăng nhập</text>
                    </Checkbox>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <CustomButton onPress={onPressVerify}>Xác nhận</CustomButton>
            </div>

            <div className={styleLogin.buttonContainer}>
                <div className={styles.countdown}>
                    <text className="body4">Gửi lại mã sau 30 giây</text>
                </div>
            </div>
        </>
    )
}