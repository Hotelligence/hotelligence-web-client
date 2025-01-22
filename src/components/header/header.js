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
        <header className="px-[100px] h-20 grid grid-cols-[1fr_auto_1fr] items-center bg-[var(--primary-blue-100)] text-[var(--primary-gold-100)] sticky top-0 z-[1000] mb-10">
            <div className="flex flex-row justify-start gap-[25px]">
                <Link href="/aboutUs">Về chúng tôi</Link>
                <Link href="/help">Hỗ trợ</Link>   
            </div>

            <div className="w-fit flex justify-center px-5">
                <Link href="/">
                    <Image src={Logo} height={60} alt="Hotelligence Logo" priority isZoomed={true}></Image>
                </Link>
            </div>

            <div className="flex flex-row justify-end gap-[25px]">                
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
        </header>
    );
}
