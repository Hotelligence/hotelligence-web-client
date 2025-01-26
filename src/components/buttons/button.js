'use client'
import { Button, Link } from "@heroui/react"
// import Link from 'next/link'

export default function CustomButton({ children, onPress, isDisabled, type}) {
    return (
        <Button 
            radius="full" 
            className="h-[3.125rem] px-5 bg-[var(--primary-blue-100)] text-[var(--primary-gold-100)] hover:bg-[var(--primary-gold-120)] hover:text-[var(--primary-white-100)]"
            onPress={onPress}
            isDisabled={isDisabled}
            type={type}
        >
            <div className="btnTxt">
                {children}
            </div>
        </Button>
    )
}