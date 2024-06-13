import { Button } from "@nextui-org/react"

export default function ViewAllButton({category, onPress}) {
    return (
        <Button color='transparent' className='p-0 text-[var(--primary-gold-120)]' disableAnimation="true" onPress={onPress}>
            <div className="flex flex-row">
                <p className='h7 underline'>Xem tất cả {category}</p>
                <p>{' >'}</p>
            </div>
        </Button>
    )
}