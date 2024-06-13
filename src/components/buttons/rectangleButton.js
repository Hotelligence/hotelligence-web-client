import styles from './rectangleButton.module.css'
import { Button } from "@nextui-org/react";
import Link from 'next/link'

export default function RectangleButton({children, href}) {
    return (
        <Button radius="sm" className={styles.button}> 
            <Link href={href}>
                <div >
                    <h4>{children}</h4>
                </div> 
            </Link>
        </Button>    
    )
}