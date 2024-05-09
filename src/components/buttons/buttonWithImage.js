import styles from './buttonWithImage.module.css'
import { Button } from "@nextui-org/react";
import Image from 'next/image'

export default function ButtonWithImage({title, img}) {
    return (
        <Button radius="sm" className={styles.button} variant="bordered"> 
            <div className={styles.inside}>
                <h4>{title}</h4>
                <div className={styles.imgContainer}>
                    <Image className={styles.imgWrapper} src={img}/>
                </div>
            </div>
        </Button>
    )
}