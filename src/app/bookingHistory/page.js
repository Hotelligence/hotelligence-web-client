import styles from "./bookingHistory.module.css"
import BookingHistoryCard from "../../components/cards/bookingHistoryCard"

export default function BookingHistory() {
    return (
        <div className={styles.pageContainer}>
            <h2>Lịch sử đặt phòng</h2>
            <div className={styles.cards}>
                <BookingHistoryCard isCompleted/>
                <BookingHistoryCard isPaymentPending/>
                <BookingHistoryCard isCanceled/>
            </div>
        </div>
    )
}