import styles from "./receipt.module.css"

export default function Receipt() {
    return (
        <div className={styles.receiptContainer}>
            <h3 className="text-center">Fusion Suites Vũng Tàu</h3>

            <div className={styles.checkInOut}>
                <div className={styles.row}>
                    <div className="w-[8rem]">
                        <h6 className="w-[8rem]">Nhận phòng</h6>
                    </div>
                    <text className="body3 text-justify">Chủ nhật, ngày 21 tháng 04 năm 2024 (15:00)</text>
                </div>

                <div className={styles.row}>
                    <div className="w-[8rem]">
                        <h6 className="w-[8rem]">Trả phòng</h6>
                    </div>
                    <text className="body3 text-justify">Thứ hai, ngày 22 tháng 04 năm 2024 (12:00)</text>
                </div>

                <div className={styles.row}>
                    <div className="w-[8rem]">
                        <h6 className="w-[8rem]">Số lượng</h6>
                    </div>
                    <text className="body3 text-justify">1 đêm</text>
                </div>
            </div>

            <hr/>

            <div className={styles.priceBill}>
                <h5>◆ &nbsp; Fusion Suites</h5>

                <div className={styles.rowBill}>
                    <h6>Giá phòng</h6>
                    <text className="body3 text-right">1.936.000đ</text>
                </div>

                <div className={styles.rowBill}>
                    <h6>Thuế</h6>
                    <text className="body3 text-right">59.424đ</text>
                </div>

                <div className={styles.rowBill}>
                    <h6>Phí phát sinh</h6>
                    <text className="body3 text-right">200.000đ</text>
                </div>

                <div className={styles.rowBill2}>
                    <h6>Tổng cộng</h6>
                    <h3 className="text-[var(--primary-gold-120)]">2.195.424đ</h3>
                </div>
            </div>
        </div>
    )
}