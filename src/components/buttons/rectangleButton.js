import { Button } from "@heroui/react";
import Link from 'next/link'

export default function RectangleButton({children, href}) {
    return (
        <Button 
            radius="sm" 
            className="bg-[var(--primary-blue-100)] text-[var(--primary-gold-100)] h-20 w-50 hover:bg-[var(--primary-gold-120)] hover:text-[var(--primary-white-100)]"
        > 
            <Link href={href}>
                <div>
                    <h4>{children}</h4>
                </div> 
            </Link>
        </Button>    
    )
}