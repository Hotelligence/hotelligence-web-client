import { Button, Link } from '@nextui-org/react'
import styles from './button.module.css'
// import Link from 'next/link'

export default function CustomButton({ children, href }) {
    return (
        
            <Button 
                radius="full" 
                className={styles.button} 
                as={Link}
                href={href}>
                <div className="btnTxt">
                    {children}
                </div>
            </Button >
        
    )
}