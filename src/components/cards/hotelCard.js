import Image from 'next/image'
import styles from './hotelCard.module.css'
import Discount from './discount'
import Link from 'next/link'
import { ImageOff } from 'lucide-react'

export default function HotelCard({id, image, ratingScore, numOfReviews, hotelName, city, originPrice, discount, discountPrice, totalPrice}) {
    return (
        <Link href={`/hotelDetails/${id}`}>
            <div className={styles.hotelCardWrapper}>
                <div className={styles.upSide}>
                    {image ? (
                        <Image className={styles.imgWrapper} src={image} width={280} height={200} alt="Picture of a hotel" priority/>
                    ) : (
                        <div className="flex flex-col items-center gap-1">
                            <text className='body5 italic'>Chưa có hình ảnh</text>
                            <ImageOff size={60} />
                        </div>
                    )}
                </div>

                <div className={styles.downSide}>
                    <div className={styles.row1}>
                        <text className="h8">{ratingScore}/10</text>
                        <text className='body5'>({numOfReviews} đánh giá)</text>
                    </div>

                    <div className={styles.row2}>
                        <h5 className="truncate">{hotelName}</h5>
                        <h6 className={styles.row22}>{city}</h6>
                    </div>

                    <div className={styles.row3}>
                        <div className={styles.row31}>
                            <h4>{originPrice?.toLocaleString('en-US')}đ</h4>
                            <h5 className={styles.strikethrough}>{discountPrice?.toLocaleString('en-US')}đ</h5>
                        </div>
                        <div className={styles.row32}>
                            <text className='body5'>Tổng {totalPrice?.toLocaleString('en-US')}đ bao gồm thuế và phí</text>
                        </div>
                    </div>

                    <div className={styles.row4}>
                        <Discount discountPercentage={discount}/>
                    </div>
                </div>
            </div>
        </Link>
    )
}