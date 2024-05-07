import Image from 'next/image'
import styles from './hotelCardLong.module.css'
import Discount from "../../components/cards/discount"
import OverallRatingScore from "../../components/views/overallRatingScore"

export default function HotelCardLong({img, hotelName, city, ratingScore, stars, numOfReviews, discount, oldPrice, newPrice, totalPrice}) {
    return (
        <div className={styles.hotelCardLongWrapper}>
            <div className={styles.leftSide}>
                <Image className={styles.imgWrapper} src={img} />
            </div>

            <div className={styles.rightSide}>
                <div className={styles.row1}>
                    <h3>{hotelName}</h3>
                    <h5 className={styles.city}>{city}</h5>
                </div>
                
                <div className={styles.row2}>
                    <div className={styles.rating}>
                        <OverallRatingScore score={ratingScore}/>

                        <div className={styles.starAndReview}>
                            <div className={styles.star}>
                                {Array.from({ length: stars }, (_, index) => (
                                    <span key={index}>★</span>
                                ))}
                            </div>

                            <div className={styles.numOfReviews}>
                                <text className='body5'>({numOfReviews} đánh giá)</text>
                            </div>
                        </div>
                    </div>

                    <div className={styles.price}>
                        <Discount discountPercentage={discount}/>

                        <div className={styles.priceDetails}>
                            <div className={styles.oldPrice}>
                                <text className='body2'>{oldPrice}đ</text>
                            </div>

                            <h4>{newPrice}đ</h4>
                        </div>

                        <div className={styles.totalPrice}>
                            <text className='body5'>Tổng {totalPrice}đ bao gồm thuế và phí</text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}