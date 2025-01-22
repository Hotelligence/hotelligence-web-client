import React from "react";
import styles from "./hotelDetails.module.css";
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
import ZoomableImage from "../../../components/buttons/ZoomableImage";
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
    const recommendationData = await recommendRoomsWithinHotel(params.hotelId);
    
    // Transform recommendation data into room objects with error handling
    const recommendedRooms = await Promise.all(
        recommendationData.map(async ([roomId]) => {
            try {
                const room = await getRoomById(roomId);
                return room;
            } catch (error) {
                console.error(`Error fetching room ${roomId}:`, error);
                return null;
            }
        })
    ).then(rooms => rooms.filter(room => room !== null)); // Remove any failed requests

    console.log('recommendedRooms', recommendedRooms);

    // Update date parameter names
    const from = searchParams.from;
    const to = searchParams.to;

    console.log(hotelDetails.policies);
    return (
        <>
            <BackButton label="Xem tất cả khách sạn"/>

            <div className={styles.pageContainer}>
                <div id="overview" className={styles.imagesContainer}>                       
                    <ZoomableImage src={hotelDetails.images && hotelDetails.images.length > 0 ? hotelDetails.images[0] : ""} className={styles.firstOne} width={500} height={500} priority/>                        

                    <div className={styles.others}>
                        {hotelDetails.images && hotelDetails.images.length > 0 && hotelDetails.images.slice(1, 7).map((image, index) => (
                            <ZoomableImage key={index} src={image || ""} className={styles.item} width={500} height={500} priority/>
                        ))}
                    </div>
                </div>             

                <div className={styles.tabs}>
                    <HotelTabs href1="#overview" href2="#amenity" href3="#room" href4="#policy" href5="#review"/>
                    <CustomButton>
                        <Link href="#room">
                            Đặt phòng
                        </Link>                        
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

                <div id="amenity" className="h-[3.125rem]"/>

                <div className={styles.amenity}>
                    <h2 className="text-[var(--primary-gold-120)]">Tiện nghi, dịch vụ nổi bật</h2>
                    <HotelAmenity isVertical="false"/>
                </div>

                <div id="room" className="h-[3.125rem]"/>
                <div className={styles.room}>
                    <h2 className="text-[var(--primary-gold-120)]">Chọn phòng</h2>

                    <div className={styles.searchAgain}>
                        <DatePicker 
                            defaultCheckinDate={from}
                            defaultCheckoutDate={to}
                        />
                        <PopOver/>                        
                    </div>        

                    <div className={styles.numOfRooms}>
                        <NumRoomRadio/>
                        <text className="body3 text-[var(--primary-blue-50)]">Hiển thị  trên {hotelDetails.roomCount} phòng</text>
                    </div>

                    <div className={styles.roomCards}>
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
                            <div className={styles.roomCards}>
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
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div id="policy" className="h-[3.125rem]"/>
                <div className={styles.policy}>
                    <h2 className="text-[var(--primary-gold-120)] w-fit text-nowrap">Phí & Chính sách</h2>

                    <div className={styles.policyDetails}>
                        <div>
                            <h4>Phí tùy chọn</h4>
                            {/* <menu>
                                <li>Khách có thể dùng bữa sáng buffet với phụ phí ước tính 290000 VND mỗi người</li>
                                <li>Khách có thể nhận phòng sớm với khoản phụ phí nhỏ (tùy theo tình hình thực tế)</li>
                                <li>Khách có thể trả phòng muộn với khoản phụ phí nhỏ (tùy theo tình hình thực tế)</li>
                            </menu> */}
                            <p>{hotelDetails.optionalFees}</p>
                        </div>

                        <div>
                            <h4>Hồ bơi, spa & gym (nếu có)</h4>
                            {/* <menu>
                                <li>Cần đăng ký trước để sử dụng dịch vụ massage và dịch vụ spa. Khách có thể đặt trước khi đến bằng cách liên hệ nơi lưu trú qua số điện thoại được cung cấp trong xác nhận đặt phòng.</li>
                            </menu> */}
                            <p>{hotelDetails.amenities}</p>
                        </div>

                        <div>
                            <h4>Chính sách </h4>
                            {/* <menu>
                                <li>Chỉ khách đã đăng ký được lưu trú tại phòng.</li>
                                <li>Khách có thể an tâm nghỉ ngơi khi biết rằng có bình cứu hỏa và hệ thống an ninh trong khuôn viên.</li>
                                <li>Nơi lưu trú này nhận thanh toán bằng thẻ tín dụng và tiền mặt.</li>
                            </menu> */}
                            <p>{hotelDetails.policies}</p>
                        </div>

                        <div>
                            <h4>Tên khác </h4>
                            {/* <ul>
                                <li>Fusion Suites Vung Tau Hotel</li>
                                <li>Fusion Suites Vung Tau Vung Tau</li>
                                <li>Fusion Suites Vung Tau Hotel Vung Tau</li>
                            </ul> */}
                            <p>{hotelDetails.otherNames}</p>
                        </div>
                    </div>
                </div>

                <div id="review" className="h-[3.125rem]"/>
                <div className={styles.review}>
                    <h2 className="text-[var(--primary-gold-120)]">Đánh giá</h2>
                    <div className={styles.ratingAndComment}>
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
                        <div className={styles.comments}>  
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
                            {/* <ViewAllButton category="Đánh giá"/> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}