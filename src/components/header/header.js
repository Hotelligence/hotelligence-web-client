'use client'

import styles from "./header.module.css";
import Logo from "../../images/Hotelligence Logo.png"
import Image from "next/image";
import Link from "next/link";
import { useAuth } from '@clerk/nextjs';  
import { UserButton } from "@clerk/nextjs";
import { CreateOrganization } from "@clerk/nextjs";
import getCountByUserId from "../../api/hotel/getCountByUserId"
import { useState, useEffect } from "react";


export default function Header() {
    const { userId } = useAuth();  
    const [count, setCount] = useState(null);

    useEffect(() => {
        async function fetchCount() {
            if (userId) {
                const result = await getCountByUserId(userId);
                setCount(result);
            }
        }
        fetchCount();
    }, [userId]);

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
                        {count !== null && count < 0 && (
                            <Link href="/partnerRegister">Đăng ký trở thành Đối tác</Link>                    
                        )}

                        <Link href={`/hotelManagement/${userId}`}>Quản lý khách sạn</Link>
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
