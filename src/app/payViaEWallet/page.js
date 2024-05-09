import styles from './payViaEWallet.module.css'
import { ArrowLeft } from "lucide-react";
import { Button } from '@nextui-org/react';
import ButtonWithImage from '../../components/buttons/buttonWithImage';
import ButtonOutline from '../../components/buttons/buttonOutline';
import MomoLogoBig from '../../images/Momo_Logo_Big.png'
import VNPayLogoBig from '../../images/VNPay_Logo_Big.png'

export default function PayViaEWallet() {
    return (
        <>
            <div className={styles.header}>
                <Button className="flex justify-start mr-auto" isIconOnly color="transparent" disableAnimation="true">
                    <ArrowLeft size={24}/>
                </Button>
                <h2 className={styles.title}>Thanh toán bằng Ví điện tử</h2>
            </div>

            <div className={styles.pageContainer}>
                <h6 className='text-center'>Quý khách vui lòng chọn ví điện tử</h6>

                <div className="flex flex-row gap-[1.25rem]">
                    <ButtonWithImage title="Ví VNPay" img={VNPayLogoBig}/>
                    <ButtonWithImage title="Ví Momo" img={MomoLogoBig}/>
                </div>

                <div className="mt-[1.25rem]">
                    <ButtonOutline>Quay về Trang chủ</ButtonOutline>
                </div>
            </div>            
        </>
    )
}