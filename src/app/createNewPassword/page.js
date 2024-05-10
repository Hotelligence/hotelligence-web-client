'use client'
import React from 'react';
import styles from './createNewPassword.module.css'
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button, Input } from '@nextui-org/react';
import CustomButton from '../../components/buttons/button';

export default function CreateNewPassword() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <>
            <div className={styles.header}>
                <Button className="flex justify-start mr-auto" isIconOnly color="transparent" disableAnimation="true">
                    <ArrowLeft size={24}/>
                </Button>
                <h2 className={styles.title}>Tạo mật khẩu mới  </h2>
            </div>

            <div className={styles.pageContainer}>
                <text className='body4 text-[var(--primary-blue-50)] text-center'>Mật khẩu từ 8-32 kí tự, trong đó ít nhất có 01 chữ cái in hoa và 01 chữ số.</text>

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