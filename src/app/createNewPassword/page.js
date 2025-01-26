'use client'
import React from 'react';
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button, Input } from "@heroui/react";
import CustomButton from '../../components/buttons/button';
import BackButtonIconOnly from "../../components/buttons/backButtonIconOnly";

export default function CreateNewPassword() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <>
            <div className="flex items-center mb-[0.94rem]">
                <BackButtonIconOnly/>
                <h2 className="flex text-center justify-center items-center mr-auto pr-[3rem]">Tạo mật khẩu mới  </h2>
            </div>

            <div className="flex flex-col mt-[1.25rem] w-1/3 items-center mx-auto gap-[1.25rem]">
                <p className="body4 text-[var(--primary-blue-50)] text-center">Mật khẩu từ 8-32 kí tự, trong đó ít nhất có 01 chữ cái in hoa và 01 chữ số.</p>

                <Input 
                    color="white" 
                    variant="bordered" 
                    fullWidth="true"                             
                    type={isVisible ? "text" : "password"}
                    endContent={
                        <Button className="focus:outline-none" type="button" onPress={toggleVisibility} isIconOnly color="transparent" disableAnimation="true">
                            {isVisible ? (
                            <Eye className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                            <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </Button>
                    }
                    label="Mật khẩu"                                                        
                    size="lg">
                </Input>

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
                    label="Nhập lại mật khẩu"         
                    size="lg">
                </Input>

                <div className='mt-[1.25rem]'>
                    <CustomButton href="/passwordRegister">Tiếp tục</CustomButton>
                </div>

            </div>
        </>
    )
}