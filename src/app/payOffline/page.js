import styles from './payOffline.module.css'
import ButtonOutline from '../../components/buttons/buttonOutline'

export default function PayOffline() {
    return (
        <div className={styles.pageContainer}>
            <h2>Thanh toán tại khách sạn</h2>

            <h6>Quý khách đã chọn phương thức thanh toán tại khách sạn!</h6>

            <p className='body3 text-center'>Quý khách vui lòng thanh toán sau khi nhận phòng hoặc trả phòng tại khách sạn theo hướng dẫn của lễ tân/quản lý khách sạn.</p>

            <div className='mt-[1.25rem]'>
                <ButtonOutline>Quay về Trang chủ</ButtonOutline>
            </div>
        </div>
    )
}