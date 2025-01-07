import styles from "./receipt.module.css"

export default function Receipt({
    hotelName, 
    roomName, 
    checkinDate, 
    checkoutDate, 
    numOfNights, 
    originPrice, 
    discountPercentage,
    discountedPrice,
    taxPercentage, 
    extraOptions, 
}) {

    const subTotal = originPrice - originPrice * (discountPercentage / 100) + 
        (extraOptions?.reduce((acc, option) => acc + option.optionPrice, 0) || 0);
    const totalPrice = subTotal + subTotal * taxPercentage / 100;
        
    function formatDate(date) {
        const d = new Date(date);
        const dd = d.getDate();
        const mm = d.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const yyyy = d.getFullYear();
        const dayOfWeek = d.toLocaleDateString('vi-VN', { weekday: 'long' }); // Get the day of the week
        const hours = d.getHours();
        const minutes = d.getMinutes().toString().padStart(2, '0'); // Add leading zero if minutes < 10
        return `${dayOfWeek}, ngày ${dd} tháng ${mm} năm ${yyyy} (${hours}:${minutes})`;
    }

    return (
        <div className={styles.receiptContainer}>
            <h3 className="text-center">{hotelName}</h3>

            <div className={styles.checkInOut}>
                <div className={styles.row}>
                    <div className="w-[8rem]">
                        <h6 className="w-[8rem]">Nhận phòng</h6>
                    </div>
                    <text className="body3 text-justify">{formatDate(checkinDate)}</text>
                </div>

                <div className={styles.row}>
                    <div className="w-[8rem]">
                        <h6 className="w-[8rem]">Trả phòng</h6>
                    </div>
                    <text className="body3 text-justify">{formatDate(checkoutDate)}</text>
                </div>

                <div className={styles.row}>
                    <div className="w-[8rem]">
                        <h6 className="w-[8rem]">Số lượng</h6>
                    </div>
                    <text className="body3 text-justify">{numOfNights} đêm</text>
                </div>
            </div>

            <hr/>

            <div className={styles.priceBill}>
                <h5>◆ &nbsp; {roomName}</h5>

                <div className={styles.rowBill}>
                    <h6>Giá phòng</h6>
                    <text className="body3 text-right">{originPrice?.toLocaleString('en-US')}đ</text>
                </div>

                <div className={styles.rowBill}>
                    <h6>Chiết khấu</h6>
                    <text className="body3 text-right">{discountPercentage?.toLocaleString('en-US')}%</text>
                </div>

                {discountPercentage > 0 && <div className={styles.rowBill}>
                    <h6>Giá khi áp dụng chiết khấu</h6>
                    <text className="body3 text-right">{discountedPrice?.toLocaleString('en-US')}đ</text>
                </div>}

                {extraOptions && extraOptions.length > 0 && (
                    <div className={styles.rowBill}>
                        <h6>Phí phát sinh</h6>
                        <div className="flex flex-col items-end">
                            {extraOptions.map((option, index) => (
                                <text key={index} className="body3 text-right">
                                    {option.optionName}: {option.optionPrice?.toLocaleString('en-US')}đ
                                </text>
                            ))}
                        </div>
                    </div>
                )}

                <div className={styles.rowBill}>
                    <h6>Thuế</h6>
                    <text className="body3 text-right">{`(${taxPercentage}% = ) ${totalPrice?.toLocaleString('en-US')}đ`}</text>
                </div>

                <div className={styles.rowBill2}>
                    <h6>Tổng cộng</h6>
                    <h3 className="text-[var(--primary-gold-120)]">{totalPrice?.toLocaleString('en-US')}đ</h3>
                </div>
            </div>
        </div>
    )
}