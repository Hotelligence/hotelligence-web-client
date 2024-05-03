import styles from './cityCard.module.css'
import Image from 'next/image'

export default function CityCard({img}) {
    return (
        <div className={styles.cityCardWrapper}>
            <div className={styles.upSide} >
                <Image class="rounded-t-lg"  src={img}/>
            </div>
            <div className={styles.downSide}>
                <h5>Vũng Tàu</h5>
                <text>Bà Rịa - Vũng Tàu</text>
            </div>
        </div>
    )
}