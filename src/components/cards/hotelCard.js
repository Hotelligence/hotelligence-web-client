import Image from 'next/image'
import styles from './hotelCard.module.css'
import Discount from './discount'

export default function HotelCard({img}) {
    return (
        <div className={styles.hotelCardWrapper}>
            <div className={styles.upSide}>
                <Image src={img} />
            </div>

            <div className={styles.downSide}>
                <div className={styles.row1}>
                    <text className="h8">9.6/10</text>
                    <text className='body5'>(84 đánh giá)</text>
                </div>

                <div className={styles.row2}>
                    <h5>Fusion Suites Vũng Tàu - VTVTVTVT</h5>
                    <h6 className={styles.row22}>Vũng Tàu</h6>
                </div>

                <div className={styles.row3}>
                    <div className={styles.row31}>
                        <h4>1.171.678đ</h4>
                        <h5 className={styles.strikethrough}>1.171.678đ</h5>
                    </div>
                    <div className={styles.row32}>
                        <text className='body5'>Tổng 2.678.125 bao gồm thuế và phí</text>
                    </div>
                </div>

                <div className={styles.row4}>
                    <Discount/>
                </div>
            </div>
        </div>
    )
}