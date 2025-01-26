'use client'
import { Checkbox, Input } from "@heroui/react";
import CustomButton from "../../components/buttons/button";
import CustomButtonOutline from "../../components/buttons/buttonOutline";
import Link from 'next/link';
import BackButtonIconOnly from "../../components/buttons/backButtonIconOnly";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function LoginByOTP() {
    const { setActive, signIn} = useSignIn();
    const [code, setCode] = useState("");
    const router = useRouter();
    
    const onPressVerify = async () => {
        try {
            const completeSignIn = await signIn.attemptFirstFactor({
                code,
            });

            if (completeSignIn.status === 'complete') {
                await setActive({ session: completeSignIn.createdSessionId });
                router.push("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="flex items-center mb-[0.94rem]">
                <BackButtonIconOnly/>
                <h2 className="flex text-center justify-center items-center m-0 mr-auto">Hãy xác nhận đó là bạn</h2>
            </div>

            <div className="flex justify-center flex-wrap text-center mb-6 text-[var(--primary-blue-50)]">
                <div className="flex max-w-[22.5rem]">
                    <p className="body4">Hãy nhập mã bảo mật chúng tôi đã gửi qua email. Nếu không thấy email này trong hộp thư đến, hãy kiểm tra hộp thư rác.</p>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-[22.5rem] h-[3.13rem]">
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
                    />
                </div>
            </div>
            
            <div className="flex justify-center">
                <div className="w-[22.5rem] h-[3.13rem] flex justify-left">
                    <Checkbox color="var(--primary-blue-100)" size="sm">
                        <p className="body4">Giữ tôi luôn đăng nhập</p>
                    </Checkbox>
                </div>
            </div>

            <div className="flex justify-center mt-10 mb-5">
                <CustomButton onPress={onPressVerify}>Xác nhận</CustomButton>
            </div>

            <div className="flex justify-center">
                <div className="text-primary-blue-50">
                    <p className="body4">Gửi lại mã sau 30 giây</p>
                </div>
            </div>

            <div className="flex justify-center mt-20">
                <CustomButtonOutline>
                    <Link href="/loginByPassword">Xác nhận bằng mật khẩu</Link>
                </CustomButtonOutline>
            </div>
        </>
    )
}