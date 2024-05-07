import styles from './comment.module.css';

export default function Comment({overallScore, ranking, date, comment, author}) {
    return (
        <div className={styles.commentWrapper}>
            <div>
                <h4 className='text-[var(--primary-gold-120)]'>{overallScore}10/10 - Tuyệt vời{ranking}</h4>
                <text className='body4 opacity-80'>{date}1 tháng 5, 2024</text>
            </div>

            <div>
                <text className='body3 text-[var(--primary-gold-120)]'>{author}Lê Đoàn Tấn Trí</text>
                <p className='body3 text-justify'>{comment}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
            </div>
        </div>
    )
}