import styles from './ratingScoreInReview.module.css';

export default function RatingScoreInReview({
    reviewAverageOverallPoint, 
    reviewAveragePointCategory, 
    reviewCount, 
    reviewAverageCleanPoint, 
    reviewAverageStaffPoint, 
    reviewAverageServicePoint, 
    reviewAverageFacilityPoint, 
    reviewAverageEnvironmentPoint
}) {
    return (
        <div className={styles.container}>
            <div className={styles.reviewAverageOverallPoint}>
                <text className='h0 text-[var(--primary-gold-120)]'>{reviewAverageOverallPoint}</text>

                <div className={styles.rightSide}>
                    <h6 className='text-[var(--primary-gold-120)]'>{reviewAveragePointCategory}</h6>
                    <text className='h7'>{reviewCount} nhận xét</text>
                </div>
            </div>

            <div className={styles.componentScore}>
                <div>
                    <h4 className='mb-[-0.25rem]'>{reviewAverageCleanPoint}/10</h4>
                    <text className='body4 opacity-80'>Sạch sẽ</text>
                </div>

                <div>
                    <h4 className='mb-[-0.25rem]'>{reviewAverageStaffPoint}/10</h4>
                    <text className='body4 opacity-80'>Nhân viên</text>
                </div>

                <div>
                    <h4 className='mb-[-0.25rem]'>{reviewAverageServicePoint}/10</h4>
                    <text className='body4 opacity-80 leading-[0.1rem]'>Tiện nghi, dịch vụ</text>
                </div>

                <div>
                    <h4 className='mb-[-0.25rem]'>{reviewAverageFacilityPoint}/10</h4>
                    <text className='body4 opacity-80 leading-[0.1rem]'>Điều kiện & cơ sở vật chất</text>
                </div>

                <div>
                    <h4 className='mb-[-0.25rem]'>{reviewAverageEnvironmentPoint}/10</h4>
                    <text className='body4 opacity-80 leading-[0.1rem]'>Thân thiện với môi trường</text>
                </div>
            </div>            
        </div>
    )
}