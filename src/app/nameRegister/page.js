import styles from './nameRegister.module.css'
import { ArrowLeft } from "lucide-react";
import { Button, Input } from '@nextui-org/react';
import CustomButton from '../../components/buttons/button';

export default function NameRegister() {
    return (
        <>
            <div className={styles.header}>
                <Button className="flex justify-start mr-auto" isIconOnly color="transparent" disableAnimation="true">
                    <ArrowLeft size={24}/>
                </Button>
                <h2 className={styles.title}>Tạo tên tài khoản</h2>
            </div>

            <div className={styles.pageContainer}>
                <text className='body4 text-[var(--primary-blue-50)] text-center'>Tên tài khoản của Quý khách phải giống với tên trên giấy tờ tùy thân (như Căn cước công dân, Hộ chiếu)</text>

                <Input label="Họ và tên" variant="bordered" size="lg" isClearable/>

                <div className='mt-[1.25rem]'>
                    <CustomButton href="/passwordRegister">Tiếp tục</CustomButton>
                </div>

            </div>
        </>
    )
}