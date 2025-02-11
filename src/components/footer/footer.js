import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex flex-col px-[100px] gap-4 bg-[var(--primary-blue-100)] text-[var(--primary-gold-100)] relative w-full mt-20">
            <div className="flex flex-row justify-between mt-8">
                <div className="flex flex-col justify-center gap-4 h-20 place-items-start">
                    <Link href="/aboutUs">Về chúng tôi</Link>
                    <Link href="/help">Hỗ trợ</Link>   
                </div>
            </div>
            <div className="h-20 flex items-center justify-start opacity-65">
                <p>
                Bản quyền © 2024 Hotelligence™. Bảo lưu mọi quyền. <br />
                Hotelligence và logo Hotelligence là thương hiệu hoặc thương hiệu đã đăng ký bảo hộ của Hotelligence, L.P.
                </p>
            </div>
        </footer>
    );
}