import styles from "./bookingHistoryCard.module.css"
import HotelCardLong from "../cards/hotelCardLong"
import CustomButton from "../buttons/button"
import CancelBookingModal from "../views/cancelBookingModal"
import ReviewModal from "../views/reviewModal"

export default async function BookingHistoryCard({
    roomName, 
    hotelId, 
    image, 
    hotelName, 
    city, 
    ratingScore, 
    star, 
    numOfReviews, 
    discount, 
    oldPrice, 
    newPrice, 
    totalPrice, 
    bookingId, 
    bookingDate, 
    checkinDate, 
    checkoutDate, 
    status}) {
    
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

    const digitsOnlyBookingId = bookingId.replace(/\D/g, '');
    
    return (
        <div className={styles.cardContainer}>
                <div>
                    <h4 className="text-[var(--primary-gold-120)]">◆ &nbsp; {roomName}</h4>

                    <div className={styles.mainBody}>
                        <div className="w-full">
                            <HotelCardLong 
                                id={hotelId}
                                img={image}
                                hotelName={hotelName}
                                city={city}
                                ratingScore={ratingScore}
                                stars={star}
                                numOfReviews={numOfReviews}
                                discount={discount}
                                oldPrice={oldPrice}
                                newPrice={newPrice}
                                totalPrice={totalPrice} />
                        </div>

                        <div className={styles.rightSide}>
                            <div className={styles.row1}>
                                <div className={styles.details}>
                                    <div className={styles.title}>
                                        <h6 className="w-[6rem]">Mã đặt phòng</h6>
                                    </div>
                                    <text className="body3">#{digitsOnlyBookingId}</text>
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
                        
                                    {status === "Đang chờ thanh toán" && (
                                        <text className="body3 text-[var(--secondary-blue-100)]">
                                            Đang chờ thanh toán
                                        </text>
                                    )}

                                    {status === "Hoàn tất" && (
                                        <text className="body3 text-[var(--secondary-green-100)]">
                                            Hoàn tất
                                        </text>
                                    )}

                                    {status === "Đã hủy" && (
                                        <text className="body3 text-[var(--secondary-red-100)]">
                                            Đã hủy
                                        </text>
                                    )}
                                
                                </div>
                            </div>

                            <div className={styles.row2}>
                                {(status === "Hoàn tất") && <ReviewModal />}
                                {(status === "Đang chờ thanh toán") && <CustomButton>Thanh toán</CustomButton>}
                                {(status === "Đang chờ thanh toán") && <CancelBookingModal />}                    
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}