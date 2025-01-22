
import styles from "./header.module.css";
import Logo from "../../images/Hotelligence Logo.png"
import Image from "next/image";
import Link from "next/link";
// import { useAuth } from '@clerk/nextjs';  
import { UserButton } from "@clerk/nextjs";
import { CreateOrganization } from "@clerk/nextjs";
import getCountByUserId from "../../api/hotel/getCountByUserId"
import { auth } from '@clerk/nextjs/server'

export default async function Header() {
    const { userId } = auth();  

    const count = await getCountByUserId(userId);
    
    console.log(userId)
    console.log(count)
    
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.leftSide}>
                <Link href="/aboutUs">Về chúng tôi</Link>
                <Link href="/help">Hỗ trợ</Link>   
            </div>

            <div className={styles.middle}>
                <Link href="/">
                    <Image src={Logo} height={60} alt="Hotelligence Logo" priority isZoomed={true}></Image>
                </Link>
            </div>

            <div className={styles.rightSide}>                
                {userId ? (
                    <>
                        {(count <= 0 || count === null) && (
                            <Link href="/partnerRegister">Đăng ký trở thành Đối tác</Link>                    
                        )}

                        {(count > 0) && (
                            <Link href={`/hotelManagement/${userId}`}>Quản lý khách sạn</Link>
                        )}

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
