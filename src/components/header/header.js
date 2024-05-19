import styles from "./header.module.css";
import Logo from "../../images/Hotelligence Logo.png"
import Image from "next/image";
import Link from "next/link";

export default function Header({isCenter}) {

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.leftSide}>
                    <Link href="/">
                        <Image src={Logo} height={60}></Image>
                    </Link>
            </div>

            <div className={styles.rightSide}>
                <Link href="/aboutUs">Về chúng tôi</Link>
                <Link href="/help">Hỗ trợ</Link>
                <Link href="/login">Đăng ký</Link>
                <Link href="/login">Đăng nhập</Link>
            </div>
        </div>
    );
}
