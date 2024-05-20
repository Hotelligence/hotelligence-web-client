import styles from "./bookingHistoryCard.module.css"
import HotelCardLong from "../cards/hotelCardLong"
import CustomButton from "../buttons/button"
import CancelBookingModal from "../views/cancelBookingModal"
import ReviewModal from "../views/reviewModal"

export default async function BookingHistoryCard({bookingStatus, bookingId, bookingDate, checkinDate, checkoutDate}) {
    
    const [hotels, rooms, bookings] = await Promise.all([
        fetch('http://localhost:8080/api/hotels/getAll').then(response => response.json()),
        fetch('http://localhost:8080/api/rooms/getAll').then(response => response.json()),
        fetch('http://localhost:8081/api/bookings/getAll').then(response => response.json()),
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

    console.log(joinedData);

    function formatDate(date) {
        const d = new Date(date);
        const dd = d.getDate();
        const mm = (d.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
        const yyyy = d.getFullYear();
        const dayOfWeek = d.toLocaleDateString('vi-VN', { weekday: 'long' }); // Get the day of the week
        const hours = d.getHours();
        const minutes = d.getMinutes().toString().padStart(2, '0'); // Add leading zero if minutes < 10
        return `${dayOfWeek}, ${dd}/${mm}/${yyyy} (${hours}:${minutes})`;
    }

    return (
        <div className={styles.cardContainer}>
            
            <h4>◆ &nbsp; {joinedData[0].hotelName}</h4>

            <div className={styles.mainBody}>
                <div className="w-full">
                    <HotelCardLong 
                        id={joinedData[0].id}
                        img={joinedData[0].image}
                        hotelName={joinedData[0].hotelName}
                        city={joinedData[0].city}
                        ratingScore={joinedData[0].ratingScore}
                        stars={joinedData[0].star}
                        numOfReviews={joinedData[0].numOfReviews}
                        discount={joinedData[0].discount}
                        oldPrice={joinedData[0].oldPrice}
                        newPrice={joinedData[0].newPrice}
                        totalPrice={joinedData[0].totalPrice} />
                </div>

                <div className={styles.rightSide}>
                    <div className={styles.row1}>
                        <div className={styles.details}>
                            <div className={styles.title}>
                                <h6 className="w-[6rem]">Mã đặt phòng</h6>
                            </div>
                            <text className="body3">{bookingId}</text>
                        </div>

                        <div className={styles.details}>
                            <div className={styles.title}>
                                <h6 className="w-[6rem]">Đặt phòng</h6>
                            </div>
                            <text className="body3">{formatDate(bookingDate)}</text>
                        </div>

                        <div className={styles.details}>
                            <div className={styles.title}>
                                <h6 className="w-[6rem]">Nhận phòng</h6>
                            </div>
                            <text className="body3">{formatDate(checkinDate)}</text>
                        </div>

                        <div className={styles.details}>
                            <div className={styles.title}>
                                <h6 className="w-[6rem]">Trả phòng</h6>
                            </div>
                            <text className="body3">{formatDate(checkoutDate)}</text>
                        </div>

                        <div className={styles.details2}>
                            <div className={styles.title}>
                                <h6 className="w-[6rem]">Tình trạng</h6>
                            </div>
                
                            {bookingStatus === "Đang chờ thanh toán" && (
                                <text className="body3 text-[var(--secondary-blue-100)]">
                                    Đang chờ thanh toán
                                </text>
                            )}

                            {bookingStatus === "Đã hoàn tất" && (
                                <text className="body3 text-[var(--secondary-green-100)]">
                                    Đã hoàn tất
                                </text>
                            )}

                            {bookingStatus === "Đã hủy" && (
                                <text className="body3 text-[var(--secondary-red-100)]">
                                    Đã hủy
                                </text>
                            )}
                        
                        </div>
                    </div>

                    <div className={styles.row2}>
                        {(bookingStatus === "Đã hoàn tất") && <ReviewModal />}
                        {(bookingStatus === "Đang chờ thanh toán") && <CustomButton>Thanh toán</CustomButton>}
                        {(bookingStatus === "Đang chờ thanh toán") && <CancelBookingModal />}                    
                    </div>
                </div>
            </div>
        </div>
    )
}