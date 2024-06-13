import styles from './comment.module.css';

export default function Comment({overallScore, ranking, date, comment, author}) {

    const dateFormatter = (date) => {
        const dateObj = new Date(date);
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();

        return `${day} tháng ${month}, ${year}`;
    }
    return (
        <div className={styles.commentWrapper}>
            <div>
                <h4 className='text-[var(--primary-gold-120)]'>{overallScore}/10 - {ranking}</h4>
                <p className='body4 opacity-80'>{dateFormatter(date)}</p>
            </div>

            <div>
                <p className='body3 text-[var(--primary-gold-120)]'>{author}</p>
                <p className='body3 text-justify'>{comment} </p>
            </div>
        </div>
    )
}