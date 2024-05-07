import styles from './hotelOverview.module.css'
import OverallRatingScore from "../../components/views/overallRatingScore"
import { MapPin } from 'lucide-react'
import ViewAllButton from '../../components/buttons/viewAllButton'

export default function HotelOverview({hotelName, stars, address, description, ratingScore, ranking}) {
    return (
        <div className={styles.contentContainer}>
            <div className={styles.group1}>
                <div className={styles.hotelName}>
                    <h1>{hotelName}Fusion Suites</h1>
                    <text className='body2 text-[var(--primary-gold-120)]'>{stars} ssss</text>
                </div>

                <div className={styles.address}>
                    <MapPin size={19}/>
                    <text className='body3'>{address}hahahahahah</text>
                </div>
            </div>

            <div className={styles.group2}>
                <text className='body3'>{description}Khách sạn cao cấp với 9 hồ bơi trong nhà, gần Bãi Trước</text>
            </div>

            <div className={styles.group3}>
                <div className={styles.rating}>
                    <OverallRatingScore score={'8.8'}/>
                    <h4>{ranking}Rat tot</h4>
                </div>

                <ViewAllButton category="Đánh giá"/>
            </div>

        </div>
    )
}