import styles from './overallRatingScore.module.css'

export default function OverallRatingScore({reviewAverageOverallPoint}) {
    return (
        <div className={styles.overallRating}>
            <text className='body1'>{reviewAverageOverallPoint}</text>
        </div>
    )
}