import styles from "./cancelPolicy.module.css"

export default function CancelPolicy() {
    return (
        <div className={styles.cancelPolicyContainer}>
            <h5>Chính sách hủy</h5>

            <ol className="body3">
                <li>&nbsp;Quý khách được hủy miễn phí đến 18:00 19/04/2024.</li>
                <li>&nbsp;Nếu Quý khách thay đổi hoặc hủy đặt phòng sau 18:00 19/04/2024, Quý khách sẽ phải thanh toán phí tương đương 1 đêm (gồm thuế).</li>
                <li>&nbsp;Nếu Quý khách thay đổi hoặc hủy đặt phòng sau 09:00 21/04/2024, Quý khách sẽ không được hoàn trả bất kỳ khoản thanh toán nào.</li>
            </ol>

            <text className="body3 text-justify">*Thời gian được tính theo giờ địa phương hiện tại của Quý khách (GMT +7)</text>
        </div>
    )
}