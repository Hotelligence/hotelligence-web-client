'use client'
import { Button, Link } from '@nextui-org/react'
import styles from './button.module.css'
// import Link from 'next/link'

export default function CustomButton({ children, onPress, isDisabled, type}) {
    return (
        
            <Button 
                radius="full" 
                className={styles.button} 
                onPress={onPress}
                isDisabled={isDisabled}
                type={type}>
                <div className="btnTxt">
                    {children}
                </div>
            </Button >
        
    )
}