import Image from 'next/image'
import styles from './hotelCardLong.module.css'
import Discount from "../../components/cards/discount"
import OverallRatingScore from "../../components/views/overallRatingScore"
import Link from 'next/link'

export default function HotelCardLong({id, img, hotelName, city, ratingScore, stars, numOfReviews, discount, oldPrice, newPrice, totalPrice}) {
    return (
        <Link href={`/hotelDetails/${id}`}>
            <div className={styles.hotelCardLongWrapper}>
                <div className={styles.leftSide}>
                    <Image className={styles.imgWrapper} src={img} width={500} height={500} alt="Picture of a hotel" priority/>
                </div>

                <div className={styles.rightSide}>
                    <div className={styles.row1}>
                        <h3>{hotelName}</h3>
                        <h5 className={styles.city}>{city}</h5>
                    </div>
                    
                    <div className={styles.row2}>
                        <div className={styles.rating}>
                            <OverallRatingScore score={ratingScore.toFixed(1)}/>

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
                            <Discount discountPercentage={discount*100}/>

                            <div className={styles.priceDetails}>
                                <div className={styles.oldPrice}>
                                    <text className='body2'>{oldPrice.toLocaleString('en-US')}đ</text>
                                </div>

                                <h4>{newPrice.toLocaleString('en-US')}đ</h4>
                            </div>

                            <div className={styles.totalPrice}>
                                <text className='body5'>Tổng {totalPrice.toLocaleString('en-US')}đ bao gồm thuế và phí</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}