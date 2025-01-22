import styles from './payViaEWalletProcessing.module.css'
import { ArrowLeft } from "lucide-react";
import { Button } from "@heroui/react";
import { CircularProgress } from "@heroui/react";

export default function PayViaEWalletProcessing() {
    return (
        <>
            <div className={styles.header}>
                <Button className="flex justify-start mr-auto" isIconOnly color="transparent" disableAnimation="true">
                    <ArrowLeft size={24}/>
                </Button>
                <h2 className={styles.title}>Thanh toán bằng Ví điện tử</h2>
            </div>

            <div className={styles.pageContainer}>
                <h6 className='text-center'>Yêu cầu thanh toán bằng ví điện tử của Quý khách đang được xử lý. Quý khách vui lòng thực hiện các bước thanh toán tiếp theo trên trang hướng dẫn của ví điện tử .</h6>

                <CircularProgress size="lg"/>
            </div>
        </>
    )
}