import styles from "./bookingHistory.module.css"
import BookingHistoryCard from "../../components/cards/bookingHistoryCard"

export default async function BookingHistory() {

    const [hotels, rooms, bookings] = await Promise.all([
        fetch('http://localhost:8080/api/hotels/getAll', {
            headers: {
                'Cache-Control': 'no-cache'
            }
        }).then(response => response.json()),
        fetch('http://localhost:8080/api/rooms/getAll', {
            headers: {
                'Cache-Control': 'no-cache'
            }
        }).then(response => response.json()),
        fetch('http://localhost:8081/api/bookings/getAll', {
            headers: {
                'Cache-Control': 'no-cache'
            }
        }).then(response => response.json()),
        
    ]);

    const joinedData = bookings.map(booking => {
        const room = rooms.find(r => r.id === booking.roomId);
        const hotel = hotels.find(h => h.id === room.hotelId);
        return {
            ...booking,
            ...hotel,
            ...room
        };
    });

    // console.log(joinedData);

    return (
        <div className={styles.pageContainer}>
            <h2>Lịch sử đặt phòng</h2>
            
                {(joinedData.map((data => 
                <div className={styles.cards} key={data.id}>
                    <BookingHistoryCard 
                    roomName={data.roomName}
                    hotelId={data.hotelId}
                    image={data.image}
                    hotelName={data.hotelName}
                    city={data.city}
                    ratingScore={data.ratingScore}
                    star={data.star}
                    numOfReviews={data.numOfReviews}
                    discount={data.discount}
                    oldPrice={data.oldPrice}
                    newPrice={data.newPrice}
                    totalPrice={data.totalPrice}
                    bookingId={data.id}
                    bookingDate={data.bookingDate}
                    checkinDate={data.checkinDate}
                    checkoutDate={data.checkoutDate}
                    status={data.bookingStatus}
                    />
                </div>)))}
        </div>
    )
}