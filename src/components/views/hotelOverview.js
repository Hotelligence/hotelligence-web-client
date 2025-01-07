import styles from './hotelOverview.module.css'
import OverallRatingScore from "../../components/views/overallRatingScore"
import { MapPin } from 'lucide-react'
import ViewAllButton from '../../components/buttons/viewAllButton'

export default function HotelOverview({hotelName, stars, address, city, district, province, description, reviewAverageOverallPoint, reviewAveragePointCategory}) {
    return (
        <div className={styles.contentContainer}>
            <div className={styles.group1}>
                <div className={styles.hotelName}>
                    <h1>{hotelName}</h1>
                    <text className='body2 text-[var(--primary-gold-120)]'>
                        {Array.from({ length: stars }, (_, index) => (
                            <span key={index}>★</span>
                        ))}
                    </text>
                </div>

                <div className={styles.address}>
                    <MapPin size={19}/>
                    <text className='body3'>{address}, {(city !== province) && city && "," } {district}, {province} </text>
                </div>
            </div>

            <div className={styles.group2}>
                <text className='body3'>{description}</text>
            </div>

            <div className={styles.group3}>
                <div className={styles.rating}>
                    <OverallRatingScore 
                        reviewAverageOverallPoint={reviewAverageOverallPoint}
                        />
                    <h4>{reviewAveragePointCategory}</h4>
                </div>

                <ViewAllButton category="Đánh giá"/>
            </div>

        </div>
    )
}