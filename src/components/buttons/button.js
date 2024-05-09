import { Button } from '@nextui-org/react'
import styles from './button.module.css'
import Link from 'next/link'

export default function CustomButton({ children, href }) {
    return (
        <Link href={href}>
            <Button radius="full" className={styles.button}><div className="btnTxt">{children}</div></Button >
        </Link>
    )
}