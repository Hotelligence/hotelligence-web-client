import styles from "./header.module.css";
import Logo from "../../images/Hotelligence Logo.png"
import Image from "next/image";

export default function Header() {
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.leftSide}>
                <Image src={Logo} height={60}></Image>
            </div>
            <div className={styles.rightSide}>
                <a href="/aboutUs">Về chúng tôi</a>
                <a href="/help">Hỗ trợ</a>
                <a href="/signUp">Đăng ký</a>
                <a href="/login">Đăng nhập</a>                
            </div>
        </div>
    );
}
