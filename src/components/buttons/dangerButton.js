'use client'
import { Button, Link } from "@heroui/react"
import styles from './button.module.css'
// import Link from 'next/link'

export default function CustomButton({ children, onPress, isDisabled, type}) {
    return (
        
            <Button 
                radius="full" 
                className="bg-[var(--secondary-red-100)] text-[var(--primary-white-100)] w-auto h-[3.125rem] px-5"
                onPress={onPress}
                isDisabled={isDisabled}
                type={type}>
                <div className="btnTxt">
                    {children}
                </div>
            </Button >
        
    )
}