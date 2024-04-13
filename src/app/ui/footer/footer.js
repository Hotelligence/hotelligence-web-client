import styles from "./footer.module.css";

export default function Footer() {
    return (
        <div className={styles.footerWrapper}>
            <p>
            Bản quyền © 2024 Hotelligence™. Bảo lưu mọi quyền. <br />
            Hotelligence và logo Hotelligence là thương hiệu hoặc thương hiệu đã đăng ký bảo hộ của Hotelligence, L.P.
            </p>
        </div>
    );
}