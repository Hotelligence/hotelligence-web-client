import styles from './paymentStatus.module.css'
import ButtonOutline from '../../components/buttons/buttonOutline'

export default function PaymentStatus({totalPrice}) {
    return (
        <div className={styles.pageContainer}>
            <h2>Thanh toán thành công!</h2>

            <h6>Quý khách đã thanh toán thành công số tiền <span className='text-[var(--primary-gold-120)]'>{totalPrice}đ</span></h6>

            <p className='body3 text-center'>Cảm ơn Quý khách đã sử dụng dịch vụ của Hotelligence. <br/> Kính chúc Quý khách có một chuyến đi vui vẻ!</p>

            <div className='mt-[1.25rem]'>
                <ButtonOutline>Quay về Trang chủ</ButtonOutline>
            </div>
        </div>
    )
}