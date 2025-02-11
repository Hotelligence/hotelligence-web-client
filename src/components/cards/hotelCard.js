"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Discount from "./discount";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import HeartButton from "../buttons/heartButton";
import { useAuth } from "@clerk/nextjs";
import addToFavoriteList from "../../api/hotel/addToFavoriteList";
import removeFromFavoriteList from "../../api/hotel/removeFromFavoriteList";
import getFavoriteListByUserId from "../../api/hotel/getFavoriteListByUserId";

export default function HotelCard({
  id,
  initialFavorite = false,
  images,
  reviewAverageOverallPoint,
  reviewCount,
  hotelName,
  city,
  roomLowestOriginPrice,
  roomLowestDiscountPercentage,
  roomLowestDiscountedPrice,
  roomLowestTotalPrice,
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
    if (!userId) return;

    try {
      if (isFavorite) {
        await removeFromFavoriteList(userId, id);
        setIsFavorite(false);
        alert('Đã xóa khỏi danh sách yêu thích');
      } else {
        await addToFavoriteList(userId, id);
        setIsFavorite(true);
        alert('Đã thêm vào danh sách yêu thích');
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  return (
    <div className="flex flex-col w-[17.5rem] h-[26.5rem] rounded-[0.625rem] border border-[var(--primary-blue-50)] hover:border-[var(--primary-blue-100)] hover:shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] hover:cursor-pointer">
      <div className="relative h-[12.5rem] rounded-t-[0.625rem] flex justify-center items-center">
        {images ? (
          <Image
            className="object-fill rounded-t-[0.625rem] h-[12.5rem]"
            src={images}
            width={280}
            height={200}
            alt="Picture of a hotel"
            priority
          />
        ) : (
          <div className="flex flex-col items-center gap-1">
            <p className="body5 italic">Chưa có hình ảnh</p>
            <ImageOff size={60} />
          </div>
        )}

        <div
          className="absolute top-2 right-2 z-10000"
        >
          <HeartButton onPress={handleHeartButtonPress} isFilled={isFavorite} />
        </div>
      </div>
      <Link href={`/hotelDetails/${id}`}>
        <div className="flex flex-col p-[0.938rem] h-full">
          <div className="flex gap-[0.31rem] mb-[0.62rem]">
            <p className="h8">{reviewAverageOverallPoint}/10</p>
            <p className="body5">({reviewCount} đánh giá)</p>
          </div>

          <div className="mb-5">
            <h5 className="truncate">{hotelName}</h5>
            <h6 className="text-[var(--primary-gold-100)]">{city}</h6>
          </div>

          <div className="flex flex-col items-baseline justify-end">
            {roomLowestDiscountPercentage > 0 ? (
              <div className="mb-3">
                <Discount discountPercentage={roomLowestDiscountPercentage} />
              </div>
            ) : (
              <div className="h-[2.675rem]"></div>
            )}
            <div className="flex gap-[0.62rem] items-baseline -mb-1">
              <h4>{roomLowestOriginPrice?.toLocaleString("en-US")}đ</h4>
              {roomLowestDiscountPercentage > 0 && (
                <h5 className="line-through text-[var(--primary-blue-50)]">
                  {roomLowestDiscountedPrice?.toLocaleString("en-US")}đ
                </h5>
              )}
            </div>
            <div className="text-[var(--primary-blue-50)]">
              <p className="body5">
                Tổng {roomLowestTotalPrice?.toLocaleString("en-US")}đ bao gồm
                thuế và phí
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
