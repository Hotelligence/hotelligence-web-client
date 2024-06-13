import styles from "./cancelPolicy.module.css"

export default function CancelPolicy({ cancelDue, unCancelDue }) {

    function formatDate(date) {
        const d = new Date(date);
        const dd = d.getDate();
        const mm = d.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const yyyy = d.getFullYear();
        const dayOfWeek = d.toLocaleDateString('vi-VN', { weekday: 'long' }); // Get the day of the week
        const hours = d.getHours();
        const minutes = d.getMinutes().toString().padStart(2, '0'); // Add leading zero if minutes < 10
        return `${hours}:${minutes} - ${dayOfWeek}, ngày ${dd} tháng ${mm} năm ${yyyy}`;
    }
      
    return (
        <div className={styles.cancelPolicyContainer}>
            <h5>Chính sách hủy</h5>

            <ol className="body3">
                <li>&nbsp;Quý khách được hủy miễn phí đến {formatDate(cancelDue)}.</li>
                <li>&nbsp;Nếu Quý khách thay đổi hoặc hủy đặt phòng sau {formatDate(cancelDue)}, Quý khách sẽ phải thanh toán phí tương đương 1 đêm (gồm thuế).</li>
                <li>&nbsp;Nếu Quý khách thay đổi hoặc hủy đặt phòng sau {formatDate(unCancelDue)}, Quý khách sẽ không được hoàn trả bất kỳ khoản thanh toán nào.</li>
            </ol>

            <p className="body3 text-justify">*Thời gian được tính theo giờ địa phương hiện tại của Quý khách (GMT +7)</p>
        </div>
    )
}