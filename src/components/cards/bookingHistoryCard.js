import styles from "./bookingHistoryCard.module.css"
import HotelCardLong from "../cards/hotelCardLong"
import CustomButton from "../buttons/button"
import CancelBookingModal from "../views/cancelBookingModal"
import ReviewModal from "../views/reviewModal"

export default function BookingHistoryCard({isPaymentPending, isCompleted, isCanceled, bookingId, bookingDate, checkinDate, checkoutDate}) {
    return (
        <div className={styles.cardContainer}>
            <h4>◆ &nbsp; Fusion Suites</h4>

            <div className={styles.mainBody}>
                <div className="w-full">
                    <HotelCardLong />
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
                            <text className="body3">{bookingDate}</text>
                        </div>

                        <div className={styles.details}>
                            <div className={styles.title}>
                                <h6 className="w-[6rem]">Nhận phòng</h6>
                            </div>
                            <text className="body3">{checkinDate}</text>
                        </div>

                        <div className={styles.details}>
                            <div className={styles.title}>
                                <h6 className="w-[6rem]">Trả phòng</h6>
                            </div>
                            <text className="body3">{checkoutDate}</text>
                        </div>

                        <div className={styles.details2}>
                            <div className={styles.title}>
                                <h6 className="w-[6rem]">Tình trạng</h6>
                            </div>

                            {isPaymentPending && (
                                <text className="body3 text-[var(--secondary-blue-100)]">
                                    Đang chờ thanh toán
                                </text>
                            )}

                            {isCompleted && (
                                <text className="body3 text-[var(--secondary-green-100)]">
                                    Hoàn tất
                                </text>
                            )}

                            {isCanceled && (
                                <text className="body3 text-[var(--secondary-red-100)]">
                                    Đã hủy
                                </text>
                            )}
                        </div>
                    </div>

                    <div className={styles.row2}>
                        {isCompleted && <ReviewModal />}
                        {isPaymentPending && <CustomButton>Thanh toán</CustomButton>}
                        {isPaymentPending && <CancelBookingModal />}                    
                    </div>
                </div>
            </div>
        </div>
    )
}