"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Discount from "../../components/cards/discount";
import OverallRatingScore from "../../components/views/overallRatingScore";
import Link from 'next/link';
import { ImageOff } from 'lucide-react';
import HeartButton from '../../components/buttons/heartButton';
import addToFavoriteList from "../../api/hotel/addToFavoriteList";
import removeFromFavoriteList from "../../api/hotel/removeFromFavoriteList";
import getFavoriteListByUserId from "../../api/hotel/getFavoriteListByUserId";

export default function HotelCardLong({
    id, 
    img, 
    hotelName, 
    city, 
    reviewAverageOverallPoint, 
    star, 
    reviewCount, 
    roomLowestOriginPrice, 
    roomLowestDiscountPercentage, 
    roomLowestDiscountedPrice, 
    roomLowestTotalPrice, 
    from, 
    to,
    initialFavorite = false
}) {
    const { userId } = useAuth();
    const [isFavorite, setIsFavorite] = useState(initialFavorite);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            try {
                if (userId && !initialFavorite) {
                    const favoriteList = await getFavoriteListByUserId(userId);
                    const isHotelFavorite = favoriteList?.favoriteHotels?.some(hotel => hotel.id === id) || false;
                    setIsFavorite(isHotelFavorite);
                }
            } catch (error) {
                console.error('Error checking favorite status:', error);
                setIsFavorite(false);
            }
        };
        checkFavoriteStatus();
    }, [userId, id, initialFavorite]);

    const handleHeartButtonPress = async () => {
        console.log('bam vao day ne');
        if (!userId) return;

        if (isFavorite) {
            await removeFromFavoriteList(userId, id);
            alert('Đã xóa khỏi danh sách yêu thích');
        } else {
            await addToFavoriteList(userId, id);
            alert('Đã thêm vào danh sách yêu thích');
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="flex h-[12.5rem] w-full rounded-[0.625rem] border border-[var(--primary-blue-50)] hover:border-[var(--primary-blue-100)]">
            <div className="w-1/3 h-full rounded-l-[0.625rem]">
                <Link href={`/hotelDetails/${id}?from=${from || ''}&to=${to || ''}`}>
                    {img ? (
                            <Image className="object-fill h-full rounded-l-[0.625rem]" src={img} width={350} height={200} alt="Picture of a hotel" priority/>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-1 h-full">
                            <p className='body5 italic'>Chưa có hình ảnh</p>
                            <ImageOff size={60} />
                        </div>
                    )}
                </Link>
            </div>

            <div className="flex flex-col justify-between p-5 w-2/3">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <h3>{hotelName}</h3>
                        <h5 className="text-primary-gold-100">{city}</h5>
                    </div>

                    <div>
                        <HeartButton onPress={handleHeartButtonPress} isFilled={isFavorite} />
                    </div>
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
    )
}