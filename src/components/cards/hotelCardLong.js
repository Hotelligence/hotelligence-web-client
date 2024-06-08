import Image from 'next/image'
import styles from './hotelCardLong.module.css'
import Discount from "../../components/cards/discount"
import OverallRatingScore from "../../components/views/overallRatingScore"
import Link from 'next/link'
import { ImageOff } from 'lucide-react'

export default function HotelCardLong({id, img, hotelName, city, ratingScore, stars, numOfReviews, originPrice, discount, discountPrice, totalPrice}) {
    return (
        <Link href={`/hotelDetails/${id}`}>
            <div className={styles.hotelCardLongWrapper}>
                <div className={styles.leftSide}>
                    {img ? (
                            <Image className={styles.imgWrapper} src={img} width={350} height={200} alt="Picture of a hotel" priority/>
                    ) : (
                        <div className="flex flex-col items-center gap-1">
                            <text className='body5 italic'>Chưa có hình ảnh</text>
                            <ImageOff size={60} />
                        </div>
                    )}
                </div>

                <div className={styles.rightSide}>
                    <div className={styles.row1}>
                        <h3>{hotelName}</h3>
                        <h5 className={styles.city}>{city}</h5>
                    </div>
                    
                    <div className={styles.row2}>
                        <div className={styles.rating}>
                            <OverallRatingScore score={ratingScore?.toFixed(1)}/>

                            <div className={styles.starAndReview}>
                                {/* <div className={styles.star}>
                                    {Array.from({ length: stars }, (_, index) => (
                                        <span key={index}>★</span>
                                    ))}
                                </div> */}

                                <div className={styles.numOfReviews}>
                                    <text className='body4'>({numOfReviews} đánh giá)</text>
                                </div>
                            </div>
                        </div>

                        <div className={styles.price}>
                            <Discount discountPercentage={discount}/>

                            <div className={styles.priceDetails}>
                                <div className={styles.originPrice}>
                                    <text className='body2'>{originPrice?.toLocaleString('en-US')}đ</text>
                                </div>

                                <h4>{discountPrice?.toLocaleString('en-US')}đ</h4>
                            </div>

                            <div className={styles.totalPrice}>
                                <text className='body5'>Tổng {totalPrice?.toLocaleString('en-US')}đ bao gồm thuế và phí</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}