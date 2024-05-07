import styles from './ratingScoreInReview.module.css';

export default function RatingScoreInReview({overallScore, ranking, numReviews, cleanScore, staffScore, amenityScore, facilityScore, ecofriendlyScore}) {
    return (
        <div className={styles.container}>
            <div className={styles.overallScore}>
                <text className='h0 text-[var(--primary-gold-120)]'>{overallScore}8.8</text>

                <div className={styles.rightSide}>
                    <h6 className='text-[var(--primary-gold-120)]'>{ranking}Rất tốt</h6>
                    <text className='h7'>{numReviews} nhận xét</text>
                </div>
            </div>

            <div className={styles.componentScore}>
                <div>
                    <h4 className='mb-[-0.25rem]'>{cleanScore}/10</h4>
                    <text className='body4 opacity-80'>Sạch sẽ</text>
                </div>

                <div>
                    <h4 className='mb-[-0.25rem]'>{staffScore}/10</h4>
                    <text className='body4 opacity-80'>Nhân viên</text>
                </div>

                <div>
                    <h4 className='mb-[-0.25rem]'>{amenityScore}/10</h4>
                    <text className='body4 opacity-80 leading-[0.1rem]'>Tiện nghi, dịch vụ</text>
                </div>

                <div>
                    <h4 className='mb-[-0.25rem]'>{facilityScore}/10</h4>
                    <text className='body4 opacity-80 leading-[0.1rem]'>Điều kiện & cơ sở vật chất</text>
                </div>

                <div>
                    <h4 className='mb-[-0.25rem]'>{ecofriendlyScore}/10</h4>
                    <text className='body4 opacity-80 leading-[0.1rem]'>Thân thiện với môi trường</text>
                </div>
            </div>            
        </div>
    )
}