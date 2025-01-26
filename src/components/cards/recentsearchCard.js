import { Building } from "lucide-react";

export default function recentsearchSearchCard({cityName}) {
    return (
        <div className="flex min-w-[17.5rem] h-[6.25rem] p-[0.4375rem_0.9375rem] items-center gap-2.5 rounded-[0.625rem] border border-[var(--primary-blue-50)] hover:border-[var(--primary-blue-100)] hover:shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] cursor-pointer">
            <div className="w-6">
                <Building size={24} />
            </div>

            <div className="flex flex-col gap-[0.05rem]">
                <h5>Khách sạn tại {cityName}</h5>
                <p>T2, 25/03/24 - T6, 29/03/24 </p>
                <p>2 khách | 1 phòng</p>
            </div>
        </div>
    )
}
