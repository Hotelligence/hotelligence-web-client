import styles from "./header.module.css";
import Logo from "../../images/Hotelligence Logo.png"
import Image from "next/image";
import Link from "next/link";
import { auth } from '@clerk/nextjs/server';
import { UserButton } from "@clerk/nextjs";

export default function Header() {
    const {userId} = auth();
    console.log(userId);

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.leftSide}>
                    <Link href="/">
                        <Image src={Logo} height={60} alt="Hotelligence Logo" priority></Image>
                    </Link>
            </div>

            <div className={styles.rightSide}>
                <Link href="/aboutUs">Về chúng tôi</Link>
                <Link href="/help">Hỗ trợ</Link>
                {userId ? (
                    <>
                    <Link href="/bookingHistory">Lịch sử đặt phòng</Link>
                    <UserButton afterSignOutUrl="/"/>
                    </>
                ) : (
                    <>
                        <Link href="/loginOrSignUp">Đăng ký/Đăng nhập</Link>
                    </>
                )}

                
            </div>
        </div>
    );
}
