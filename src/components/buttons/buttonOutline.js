import { Button } from '@nextui-org/react'
import styles from './buttonOutline.module.css'

export default function CustomButton({ children }) {
    return (
        <Button radius="full" className={styles.button}><div className="btnTxt">{children}</div></Button >
    )
}