import { Button } from "@heroui/react";
import Link from 'next/link'

export default function RectangleButton({children, href}) {
    return (
        <Button radius="sm" className="bg-[var(--primary-blue-100)] text-[var(--primary-gold-100)] h-20 max-w-full"> 
            <Link href={href}>
                <div className="leading-6">
                    <h4>{children}</h4>
                </div> 
            </Link>
        </Button>    
    )
}