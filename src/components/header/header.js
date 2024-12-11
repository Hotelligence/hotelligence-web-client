import styles from "./header.module.css";
import Logo from "../../images/Hotelligence Logo.png"
import Image from "next/image";
import Link from "next/link";
import { auth } from '@clerk/nextjs/server';
import { UserButton } from "@clerk/nextjs";
import { CreateOrganization } from "@clerk/nextjs";

export default function Header() {
    const {userId} = auth();
    console.log(userId);

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.leftSide}>
                <Link href="/aboutUs">Về chúng tôi</Link>
                <Link href="/help">Hỗ trợ</Link>   
            </div>

            <div className={styles.middle}>
                <Link href="/">
                    <Image src={Logo} height={60} alt="Hotelligence Logo" priority></Image>
                </Link>
            </div>

            <div className={styles.rightSide}>                
                {userId ? (
                    <>
                    <Link href="/bookingHistory">Lịch sử đặt phòng</Link>
                    <UserButton afterSignOutUrl="/"/>
                    </>
                ) : (
                    <>
                        <Link href="/partnerRegister">Đăng ký trở thành Đối tác</Link>                    
                        <Link href="/loginOrSignUp">Đăng ký</Link>
                        <Link href="/loginOrSignUp">Đăng nhập</Link>
                    </>
                )}

                
            </div>
        </div>
    );
}
