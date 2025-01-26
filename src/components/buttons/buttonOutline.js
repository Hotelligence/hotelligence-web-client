import { Button } from "@heroui/react"

export default function CustomButton({ children, onPress }) {
    return (
        <Button 
            radius="full" 
            className="bg-white text-[var(--primary-blue-100)] border border-[var(--primary-blue-100)] h-[3.125rem] w-auto hover:shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)]"
            onPress={onPress}
        >
            <div className="btnTxt">{children}</div>
        </Button>
    )
}