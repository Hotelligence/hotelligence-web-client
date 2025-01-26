import Image from 'next/image'
import Discount from "../../components/cards/discount"
import OverallRatingScore from "../../components/views/overallRatingScore"
import Link from 'next/link'
import { ImageOff } from 'lucide-react'

export default function HotelCardLong({id, img, hotelName, city, reviewAverageOverallPoint, star, reviewCount, roomLowestOriginPrice, roomLowestDiscountPercentage, roomLowestDiscountedPrice, roomLowestTotalPrice, from, to}) {
    return (
        <Link href={`/hotelDetails/${id}?from=${from || ''}&to=${to || ''}`}>
            <div className="flex h-[12.5rem] w-full rounded-[0.625rem] border border-[var(--primary-blue-50)] hover:border-[var(--primary-blue-100)] hover:cursor-pointer">
                <div className="w-1/3 h-full rounded-l-[0.625rem]">
                    {img ? (
                            <Image className="object-fill h-full rounded-l-[0.625rem]" src={img} width={350} height={200} alt="Picture of a hotel" priority isZoomed={true}/>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-1">
                            <p className='body5 italic'>Chưa có hình ảnh</p>
                            <ImageOff size={60} />
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-between p-5 w-2/3">
                    <div className="flex flex-col">
                        <h3>{hotelName}</h3>
                        <h5 className="text-primary-gold-100">{city}</h5>
                    </div>
                    
                    <div className="flex justify-between items-end">
                        {reviewCount > 0 ? (<div className="flex gap-[0.3125rem]">
                            <OverallRatingScore reviewAverageOverallPoint={reviewAverageOverallPoint?.toFixed(1)}/>

                            <div className="flex flex-col justify-center">
                                <div className="text-primary-gold-100">
                                    {Array.from({ length: star }, (_, index) => (
                                        <span key={index}>★</span>
                                    ))}
                                </div>

                                <div className="text-[var(--primary-blue-50)]">
                                    <p className='body4'>({reviewCount} đánh giá)</p>
                                </div>
                            </div>
                        </div>) :  "" }

                        <div className="flex flex-col items-end gap-[0.3125rem]">
                            {roomLowestDiscountPercentage ? <Discount discountPercentage={roomLowestDiscountPercentage}/> : ""}

                            <div className="flex gap-[0.6125rem] items-baseline">
                                <div>
                                    {roomLowestOriginPrice ? <s className='body2'>{roomLowestOriginPrice?.toLocaleString('en-US')}đ</s> : ""}
                                </div>

                                {roomLowestDiscountedPrice ? <h4>{roomLowestDiscountedPrice?.toLocaleString('en-US')}đ</h4> : ""}
                            </div>

                            <div>
                                {roomLowestTotalPrice ? <p className='body5'>Tổng {roomLowestTotalPrice?.toLocaleString('en-US')}đ bao gồm thuế và phí</p> : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}