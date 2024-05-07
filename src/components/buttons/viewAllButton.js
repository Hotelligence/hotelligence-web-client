import { Button } from "@nextui-org/react"

export default function viewAllButton({category}) {
    return (
        <Button color='transparent' className='p-0 text-[var(--primary-gold-120)]' disableAnimation="true">
            <div>
                <text className='h7 underline'>Xem tất cả {category}</text>
                <text>{' >'}</text>
            </div>
        </Button>
    )
}