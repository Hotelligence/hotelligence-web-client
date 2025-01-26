'use client'
import React from 'react';
import { Eye, EyeOff } from "lucide-react";
import { Button, Input, Checkbox } from "@heroui/react";
import CustomButton from "../../components/buttons/button";
import CustomButtonOutline from "../../components/buttons/buttonOutline";
import Link from 'next/link';
import BackButtonIconOnly from "../../components/buttons/backButtonIconOnly";

export default function LoginByPassword() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <>
            <div className={styleLoginByOTP.header}>
                <BackButtonIconOnly/>
                <h2 className={styleLoginByOTP.title}>Xác nhận bằng mật khẩu</h2>
            </div>

            <div className="flex justify-center mt-6">
                    <div className={styleLogin.buttonWrapper}>
                        <Input 
                            color="white" 
                            variant="bordered" 
                            fullWidth="true"                             
                            type="email"
                            label="Email"                                                        
                            isClearable="true">
                        </Input>
                    </div>
            </div>

            <div className="flex justify-center mt-6">
                    <div className={styleLogin.buttonWrapper}>
                        <Input 
                            color="white" 
                            variant="bordered" 
                            fullWidth="true"                             
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
                            isClearable="true">
                        </Input>
                    </div>
            </div>

            <div className="flex justify-center">
                <div className={styleLoginByOTP.buttonWrapper2}>
                    <Checkbox color="var(--primary-blue-100)" size="sm">
                        <p className="body4">Giữ tôi luôn đăng nhập</p>
                    </Checkbox>
                </div>
            </div>

            <div className="flex justify-center mt-10 mb-5">
                <CustomButton>Đăng nhập</CustomButton>
            </div>

            <div className="flex justify-center mt-20">
                <CustomButtonOutline>
                    <Link href="/loginByOTP">Xác nhận bằng OTP qua Email</Link>
                </CustomButtonOutline>
            </div>
        </>
    )
}