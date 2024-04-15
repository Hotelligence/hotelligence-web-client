import styles from "./header.module.css";
import Logo from "../../images/Hotelligence Logo.png"
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    // const [isLogin, setIsLogin] = useState(false);

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
                {/* {!isLogin ? (
                    <>
                        <a href="/signUp">Đăng ký</a>
                        <a href="/login">Đăng nhập</a>
                    </>
                ) : (
                    <a href="/profile">Tài khoản</a>
                )} */}
            </div>
        </div>
    );
}
