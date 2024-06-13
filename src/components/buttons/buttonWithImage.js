import styles from './buttonWithImage.module.css'
import { Button, Link } from "@nextui-org/react";
import Image from 'next/image'

export default function ButtonWithImage({title, img, href, alt, onPress}) {
    return (
        <Button radius="sm" className={styles.button} variant="bordered" as={Link} href={href}> 
            <div className={styles.inside}>
                <h4 className='text-center'>{title}</h4>
                <div className={styles.imgContainer}>
                    <Image className={styles.imgWrapper} src={img} alt={alt} priority/>
                </div>
            </div>
        </Button>
    )
}