'use client'
import styles from './nameRegister.module.css'
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button, Input } from "@heroui/react";
import CustomButton from '../../components/buttons/button';
import BackButtonIconOnly from "../../components/buttons/backButtonIconOnly";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


export default function NameAndPasswordRegister() {
    
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const {isLoaded, setActive, signUp} = useSignUp();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const onPressVerify = async () => {

        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.update({
                first_name: firstName,
                last_name: lastName,
                password: password
            });
            

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push("/");
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
                <h2 className={styles.title}>Tạo tên tài khoản và mật khẩu</h2>
            </div>

            <div className={styles.pageContainer}>
                <text className='body4 text-[var(--primary-blue-50)] text-center'>Tên tài khoản của Quý khách nên giống với tên trên giấy tờ tùy thân (như Căn cước công dân, Hộ chiếu)</text>

                <div className='flex flex-row gap-2'>
                    <Input label="Họ " variant="bordered" size="lg" isClearable description='VD: "Lê", "Nguyễn", "Trần", v.v.'
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}/>
                    <Input label="Tên" variant="bordered" size="lg" isClearable description='VD: "Đoàn Tấn Trí", "Phú Thịnh", v.v.'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}/>
                </div>

                <text className='body4 text-[var(--primary-blue-50)] text-center'>Mật khẩu từ 8-72 kí tự, trong đó ít nhất có 01 chữ cái in hoa và 01 chữ số.</text>

                <Input 
                    color="white" 
                    variant="bordered"                           
                    type={isVisible ? "text" : "password"}
                    endContent={
                        <Button className="focus:outline-none" type="button" onClick={toggleVisibility} isIconOnly color="transparent" disableAnimation="true">
                            {isVisible ? (
                            <Eye className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                            <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </Button>
                    }
                    label="Mật khẩu"                                                        
                    isClearable="true"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password">
                </Input>

                <div className='mt-[1.25rem]'>
                    <CustomButton onPress={onPressVerify}>Tiếp tục</CustomButton>
                </div>

            </div>
        </>
    )
}