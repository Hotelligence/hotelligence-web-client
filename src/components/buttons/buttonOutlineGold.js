import { Button } from "@heroui/react"
import styles from './buttonOutlineGold.module.css'

export default function CustomButton({ children, onPress }) {
    return (
        <Button radius="full" className={styles.button} onPress={onPress}><div className="btnTxt">{children}</div></Button >
    )
}