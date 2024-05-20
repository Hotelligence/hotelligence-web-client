import styles from "./bookingHistory.module.css"
import BookingHistoryCard from "../../components/cards/bookingHistoryCard"

export default async function BookingHistory() {

    const bookingResponse = await fetch('http://localhost:8081/api/bookings/getAll', {
        method: "GET"   
    });
    const bookings = await bookingResponse.json();

    return (
        <div className={styles.pageContainer}>
            <h2>Lịch sử đặt phòng</h2>
            
                <div className={styles.cards}>
            {bookings.map((booking) => 
                    <BookingHistoryCard 
                        key={booking.id}
                        bookingStatus={booking.bookingStatus}
                        bookingId={booking.id}
                        bookingDate={booking.bookingDate}
                        checkinDate={booking.checkinDate}
                        checkoutDate={booking.checkoutDate}
                    />
                )}
                </div>
        </div>
    )
}