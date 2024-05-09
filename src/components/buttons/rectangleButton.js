import styles from './rectangleButton.module.css'
import { Button } from "@nextui-org/react";
import Link from 'next/link'

export default function RectangleButton({children, href}) {
    return (
        <Link href={href}>
            <Button radius="sm" className={styles.button}> 
                <div className={styles.btnTxt}>{children}</div> 
            </Button>    
        </Link>
    )
}