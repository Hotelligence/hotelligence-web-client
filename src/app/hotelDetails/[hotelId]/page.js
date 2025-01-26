import React, { Suspense } from "react";
import HotelTabs from "../../../components/buttons/hotelTabs";
import CustomButton from "../../../components/buttons/button";
import HotelOverview from "../../../components/views/hotelOverview";
import HotelAmenity from "../../../components/views/hotelAmenity";
import DatePicker from "../../../components/inputs/datepicker";
import PopOver from "../../../components/inputs/popover";
import RoomCardHigh from "../../../components/cards/roomCardHigh";
import NumRoomRadio from "../../../components/buttons/numRoomRadio";
import RatingScoreInReview from "../../../components/views/ratingScoreInReview";
import Comment from "../../../components/views/comment";
import ViewAllButton from "../../../components/buttons/viewAllButton";
import BackButton from "../../../components/buttons/backButton";
import ZoomableImage from "../../../components/buttons/zoomableImage";
import Link from "next/link";
import getHotelById from "../../../api/hotel/getHotelById";
import getRoomsInHotel from "../../../api/room/getRoomsInHotel";
import getReviewsByHotelId from "../../../api/review/getReviewsByHotelId";
import recommendRoomsWithinHotel from "../../../api/recommend/recommendRoomsWithinHotel";
import getRoomById from "../../../api/room/getRoomById";

export default async function HotelDetails({ params, searchParams }) {
    const hotelDetails = await getHotelById(params.hotelId);
    const roomsInHotel = await getRoomsInHotel(params.hotelId);
    const reviewsOfHotel = await getReviewsByHotelId(params.hotelId);
    
    let recommendedRooms = [];
    try {
        const recommendationData = await recommendRoomsWithinHotel(params.hotelId);
        recommendedRooms = await Promise.all(
            recommendationData.map(async ([roomId]) => {
                try {
                    return await getRoomById(roomId);
                } catch (error) {
                    console.error(`Error fetching room ${roomId}:`, error);
                    return null;
                }
            })
        ).then(rooms => rooms.filter(room => room !== null));
    } catch (error) {
        console.error('Error fetching recommendations:', error);
    }

    // Update date parameter names
    const from = searchParams.from;
    const to = searchParams.to;

    console.log(hotelDetails.policies);
    return (
        <>
            <BackButton label="Xem tất cả khách sạn"/>

            <div className="flex flex-col mt-8">
                <div id="overview" className="grid grid-cols-3 gap-0.5">                       
                    <ZoomableImage 
                        src={hotelDetails.images && hotelDetails.images.length > 0 ? hotelDetails.images[0] : ""} 
                        className="h-[17.6rem] object-cover" 
                        width={500} 
                        height={500} 
                        priority
                    />                        

                    <div className="col-span-2 grid grid-cols-3 grid-rows-2 gap-0.5">
                        {hotelDetails.images && hotelDetails.images.length > 0 && hotelDetails.images.slice(1, 7).map((image, index) => (
                            <ZoomableImage 
                                key={index} 
                                src={image || ""} 
                                className="h-[8.75rem] object-cover" 
                                width={500} 
                                height={500} 
                                priority
                            />
                        ))}
                    </div>
                </div>             

                <div className="flex justify-between mt-5 sticky top-0 bg-white">
                    <HotelTabs href1="#overview" href2="#amenity" href3="#room" href4="#policy" href5="#review"/>
                    <CustomButton>
                        <Link href="#room">Đặt phòng</Link>                        
                    </CustomButton>
                </div> 

                <div>                              
                    <HotelOverview 
                        hotelName={hotelDetails.hotelName} 
                        stars={hotelDetails.star} 
                        address={hotelDetails.address} 
                        city={hotelDetails.city}
                        district={hotelDetails.district}
                        province={hotelDetails.province}
                        description={hotelDetails.description} 
                        reviewAverageOverallPoint={hotelDetails.reviewAverageOverallPoint}
                        reviewAveragePointCategory={hotelDetails.reviewAveragePointCategory}
                        />
                </div>

                <div id="amenity" className="h-20"/>

                <div className="flex flex-col gap-4">
                    <h2 className="text-[var(--primary-gold-120)]">Tiện nghi, dịch vụ nổi bật</h2>
                    <HotelAmenity isVertical="false"/>
                </div>

                <div id="room" className="h-20"/>
                <div className="flex flex-col gap-4">
                    <h2 className="text-[var(--primary-gold-120)]">Chọn phòng</h2>

                    <div className="flex gap-[1.875rem] w-[50vw]">
                        <Suspense fallback={<div>Loading...</div>}>
                        <DatePicker 
                            defaultCheckinDate={from}
                            defaultCheckoutDate={to}
                        />
                        <PopOver/>    
                        </Suspense>                    
                    </div>        

                    <div className="flex justify-between items-center">
                        <NumRoomRadio/>
                        <p className="body3 text-[var(--primary-blue-50)]">Hiển thị  trên {hotelDetails.roomCount} phòng</p>
                    </div>

                    <div className="flex flex-row flex-wrap justify-between gap-y-5">
                        {roomsInHotel.length > 0 ? (
                            roomsInHotel.map((room) => (
                                <RoomCardHigh
                                    key={room.id}
                                    id={room.id}
                                    images={room.images[0]}
                                    roomName={room.roomName}
                                    originPrice={room.originPrice}
                                    discountPercentage={room.discountPercentage}
                                    discountedPrice={room.discountedPrice}
                                    taxPercentage={room.taxPercentage}
                                    extraOptions={room.extraOptions || []}
                                    amenityType={room.amenityType}
                                    amenityName={room.amenityName}
                                    checkinDate={from}
                                    checkoutDate={to}
                                />
                            ))
                        ) : (
                            <h5 className="text-[var(--secondary-red-100)]">Hiện tại khách sạn chưa có phòng nào. Quý khách vui lòng quay lại sau!</h5>
                        )}
                    </div>

                    {recommendedRooms && recommendedRooms.length > 0 && (
                        <div className="flex flex-col gap-4 mt-8">
                            <h2 className="text-[var(--primary-gold-120)]">Phòng được đề xuất cho bạn</h2>
                            <div className="flex flex-row flex-wrap justify-between gap-y-5">
                                {recommendedRooms.map((room) => (
                                    <RoomCardHigh
                                        key={room.id}
                                        id={room.id}
                                        images={room.images[0]}
                                        roomName={room.roomName}
                                        originPrice={room.originPrice}
                                        discountPercentage={room.discountPercentage}
                                        discountedPrice={room.discountedPrice}
                                        taxPercentage={room.taxPercentage}
                                        extraOptions={room.extraOptions || []}
                                        amenityType={room.amenityType}
                                        amenityName={room.amenityName}
                                        checkinDate={from}
                                        checkoutDate={to}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div id="policy" className="h-20"/>
                <div className="flex flex-row gap-[3.125rem]">
                    <h2 className="text-[var(--primary-gold-120)] w-fit text-nowrap">Phí & Chính sách</h2>

                    <div className="flex flex-col gap-5 pt-[0.6rem]">
                        <div>
                            <h4>Phí tùy chọn</h4>
                            <p>{hotelDetails.optionalFees}</p>
                        </div>

                        <div>
                            <h4>Hồ bơi, spa & gym (nếu có)</h4>
                            <p>{hotelDetails.amenities}</p>
                        </div>

                        <div>
                            <h4>Chính sách </h4>
                            <p>{hotelDetails.policies}</p>
                        </div>

                        <div>
                            <h4>Tên khác </h4>
                            <p>{hotelDetails.otherNames}</p>
                        </div>
                    </div>
                </div>

                <div id="review" className="h-20"/>
                <div className="flex flex-col gap-4">
                    <h2 className="text-[var(--primary-gold-120)]">Đánh giá</h2>
                    <div className="flex flex-row gap-[1.875rem]">
                        <RatingScoreInReview 
                            reviewAverageOverallPoint={hotelDetails.reviewAverageOverallPoint}
                            reviewAveragePointCategory={hotelDetails.reviewAveragePointCategory}
                            reviewCount={hotelDetails.reviewCount}
                            reviewAverageCleanPoint={hotelDetails.reviewAverageCleanPoint}
                            reviewAverageStaffPoint={hotelDetails.reviewAverageStaffPoint}
                            reviewAverageServicePoint={hotelDetails.reviewAverageServicePoint}
                            reviewAverageFacilityPoint={hotelDetails.reviewAverageFacilityPoint}
                            reviewAverageEnvironmentPoint={hotelDetails.reviewAverageEnvironmentPoint}
                            />
                        <div className="flex flex-col gap-4 items-start w-full">  
                            {reviewsOfHotel.length > 0 ? reviewsOfHotel.map((review) => (
                                <Comment
                                    key={review.id}
                                    id={review.id}
                                    overallScore={review.overallPoint}
                                    ranking={review.pointCategory}
                                    date={review.reviewDate}
                                    comment={review.comment}
                                    author={review.userName}
                                />
                            )) : (
                                <h5 className="text-[var(--secondary-red-100)]">Hiện tại chưa có đánh giá nào!</h5>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}