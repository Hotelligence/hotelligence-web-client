import styles from './payViaCard.module.css'
import { ArrowLeft } from "lucide-react";
import { Button } from "@heroui/react";
import CustomButton from '../../components/buttons/button';
import ButtonOutline from '../../components/buttons/buttonOutline';

export default function PayViaCard() {
    return (
        <>
            <div className={styles.header}>
                <Button className="flex justify-start mr-auto" isIconOnly color="transparent" disableAnimation="true">
                    <ArrowLeft size={24}/>
                </Button>
                <h2 className={styles.title}>Thanh toán bằng Thẻ tín dụng</h2>
            </div>

            <div className={styles.pageContainer}>
                <h6 className='text-center'>Quý khách chắc chắn bằng việc thanh toán bằng thẻ tín dụng?</h6>

                <p className='body3 text-center'>Bằng việc bấm “Đồng ý”, số tiền thanh toán của Quý khách sẽ được thanh toán trực tiếp thông qua thẻ tín dụng Quý khách đã nhập trước đó.</p>

                <div className='mt-[1.25rem]'>
                    <CustomButton href="/paymentStatus">Đồng ý</CustomButton>
                </div>

                <ButtonOutline>Quay về Trang chủ</ButtonOutline>
            </div>            
        </>
    )
}