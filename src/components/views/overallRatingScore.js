import styles from './overallRatingScore.module.css'

export default function OverallRatingScore({score}) {
    return (
        <div className={styles.overallRating}>
            <text className='body1'>{score}</text>
        </div>
    )
}