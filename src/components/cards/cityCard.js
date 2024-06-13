import styles from './cityCard.module.css'
import Image from 'next/image'

export default function CityCard({img, city, province}) {
    return (
        <div className={styles.cityCardWrapper}>
            <div className={styles.upSide} >
                <Image className="rounded-t-lg" src={img}/>
            </div>
            <div className={styles.downSide}>
                <h5>{city}</h5>
                <p>{province}</p>
            </div>
        </div>
    )
}