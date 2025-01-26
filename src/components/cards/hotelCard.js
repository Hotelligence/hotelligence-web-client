import Image from 'next/image'
import Discount from './discount'
import Link from 'next/link'
import { ImageOff } from 'lucide-react'

export default function HotelCard({id, image, ratingScore, numOfReviews, hotelName, city, originPrice, discount, discountPrice, totalPrice}) {
    return (
        <Link href={`/hotelDetails/${id}`}>
            <div className="flex flex-col min-w-[17.5rem] h-[27.5rem] rounded-[0.625rem] border border-[var(--primary-blue-50)] hover:border-[var(--primary-blue-100)] hover:shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] hover:cursor-pointer">
                <div className="h-[12.5rem] rounded-t-[0.625rem] flex justify-center items-center">
                    {image ? (
                        <Image className="object-fill rounded-t-[0.625rem] h-[12.5rem]" src={image} width={280} height={200} alt="Picture of a hotel" priority/>
                    ) : (
                        <div className="flex flex-col items-center gap-1">
                            <p className='body5 italic'>Chưa có hình ảnh</p>
                            <ImageOff size={60} />
                        </div>
                    )}
                </div>

                <div className="flex flex-col p-[0.938rem]">
                    <div className="flex gap-[0.31rem] mb-[0.62rem]">
                        <p className="h8">{ratingScore}/10</p>
                        <p className='body5'>({numOfReviews} đánh giá)</p>
                    </div>

                    <div className="mb-5">
                        <h5 className="truncate">{hotelName}</h5>
                        <h6 className="text-[var(--primary-gold-100)]">{city}</h6>
                    </div>

                    <div className="mb-5">
                        <div className="flex gap-[0.62rem] items-baseline -mb-2">
                            <h4>{originPrice?.toLocaleString('en-US')}đ</h4>
                            <h5 className="line-through text-[var(--primary-blue-50)]">{discountPrice?.toLocaleString('en-US')}đ</h5>
                        </div>
                        <div className="text-[var(--primary-blue-50)]">
                            <p className='body5'>Tổng {totalPrice?.toLocaleString('en-US')}đ bao gồm thuế và phí</p>
                        </div>
                    </div>

                    <div>
                        <Discount discountPercentage={discount}/>
                    </div>
                </div>
            </div>
        </Link>
    )
}