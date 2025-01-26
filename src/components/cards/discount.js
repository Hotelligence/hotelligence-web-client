import { TicketPercent } from 'lucide-react'

export default function Discount({discountPercentage}) {
    return (
        <div className="flex items-center bg-[var(--secondary-green-100)] p-[0.44rem_0.64rem] rounded-[0.3125rem] w-fit h-[1.875rem] gap-[0.31rem]">
            <div className="text-[var(--primary-white-100)]">
                <TicketPercent size={15}/>
            </div>

            <div className="flex items-center text-[var(--primary-white-100)]">
                <p className="h8">Giảm {discountPercentage}%</p>
            </div>
        </div>
    )
}