import Image from 'next/image'
import styles from './hotelCardLong.module.css'
import Discount from "../../components/cards/discount"
import OverallRatingScore from "../../components/views/overallRatingScore"
import Link from 'next/link'
import { ImageOff } from 'lucide-react'

export default function HotelCardLong({id, img, hotelName, city, reviewAverageOverallPoint, star, reviewCount, roomLowestOriginPrice, roomLowestDiscountPercentage, roomLowestDiscountedPrice, roomLowestTotalPrice}) {
    return (
        <Link href={`/hotelDetails/${id}`}>
            <div className={styles.hotelCardLongWrapper}>
                <div className={styles.leftSide}>
                    {img ? (
                            <Image className={styles.imgWrapper} src={img} width={350} height={200} alt="Picture of a hotel" priority isZoomed={true}/>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-1">
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
                        {reviewCount > 0 ? (<div className={styles.rating}>
                            <OverallRatingScore reviewAverageOverallPoint={reviewAverageOverallPoint?.toFixed(1)}/>

                            <div className={styles.starAndReview}>
                                <div className={styles.star}>
                                    {Array.from({ length: star }, (_, index) => (
                                        <span key={index}>★</span>
                                    ))}
                                </div>

                                <div className={styles.reviewCount}>
                                    <text className='body4'>({reviewCount} đánh giá)</text>
                                </div>
                            </div>
                        </div>) :  "" }

                        <div className={styles.price}>
                            {roomLowestDiscountPercentage ? <Discount discountPercentage={roomLowestDiscountPercentage}/> : ""}

                            <div className={styles.priceDetails}>
                                <div className={styles.roomLowestOriginPrice}>
                                    {roomLowestOriginPrice ? <s className='body2'>{roomLowestOriginPrice?.toLocaleString('en-US')}đ</s> : ""}
                                </div>

                                {roomLowestDiscountedPrice ? <h4>{roomLowestDiscountedPrice?.toLocaleString('en-US')}đ</h4> : ""}
                            </div>

                            <div className={styles.roomLowestTotalPrice}>
                                {roomLowestTotalPrice ? <p className='body5'>Tổng {roomLowestTotalPrice?.toLocaleString('en-US')}đ bao gồm thuế và phí</p> : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}