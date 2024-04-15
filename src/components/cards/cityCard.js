import styles from './cityCard.module.css'
import Image from 'next/image'

export default function CityCard({img}) {
    return (
        <div className={styles.cityCardWrapper}>
            <Image className={styles.upSide} src={img}/>
            <div className={styles.downSide}>
                <h5>Vũng Tàu</h5>
                <text>Bà Rịa - Vũng Tàu</text>
            </div>
        </div>
    )
}