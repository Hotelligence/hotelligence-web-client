import { TicketPercent } from 'lucide-react'
import styles from './discount.module.css'

export default function Discount() {
    return (
        <div className={styles.discountWrapper}>
            <div className={styles.leftSide}>
                <TicketPercent size={15}/>
            </div>

            <div className={styles.rightSide}>
                <text className='h8'>Giảm 50%</text>

            </div>
        </div>
    )
}