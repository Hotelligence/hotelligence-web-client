import React from "react";
import styles from "./hotelDetails.module.css";
import fusion6 from "../../../images/fusion6.webp";
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
import Image from "next/image";


export default async function HotelDetails({ params }) {

    const res = await fetch('http://localhost:8080/api/hotels/getAll', {
        method: "GET"   
    });
    const hotels = await res.json();
    const hotelDetails = hotels.find(h => h.id === params.hotelId);    

    const response = await fetch('http://localhost:8080/api/rooms/getAll', {
        method: "GET"   
    });
    const rooms = await response.json();
    const roomsInHotel = rooms.filter(r => r.hotelId === params.hotelId);

    return (
        <>
            <BackButton label="Xem tất cả khách sạn"/>

            <div className={styles.pageContainer}>
                <div id="overview" className={styles.imagesContainer}>                       
                    <Image src={hotelDetails.image} className={styles.firstOne} width={500} height={500} priority/>                        

                    <div className={styles.others}>
                        <Image src={hotelDetails.image} className={styles.item} width={500} height={500} priority/>
                        <Image src={hotelDetails.image} className={styles.item} width={500} height={500} priority/>
                        <Image src={hotelDetails.image} className={styles.item} width={500} height={500} priority/>
                        <Image src={hotelDetails.image} className={styles.item} width={500} height={500} priority/>
                        <Image src={hotelDetails.image} className={styles.item} width={500} height={500} priority/>
                        <Image src={hotelDetails.image} className={styles.item} width={500} height={500} priority/>
                    </div>
                </div>             

                <div className={styles.tabs}>
                    <HotelTabs href1="#overview" href2="#amenity" href3="#room" href4="#policy" href5="#review"/>
                    <CustomButton href="#room">                        
                            Đặt phòng
                    </CustomButton>
                </div> 

                <div>                              
                    <HotelOverview hotelName={hotelDetails.hotelName} stars={hotelDetails.star} address={hotelDetails.address} description={hotelDetails.description} ratingScore={hotelDetails.ratingScore}/>
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
                        <DatePicker/>
                        <PopOver/>
                        
                    </div>        

                    <div className={styles.numOfRooms}>
                        <NumRoomRadio/>
                        <text className="body3 text-[var(--primary-blue-50)]">Hiển thị  trên  phòng</text>
                    </div>

                    <div className={styles.roomCards}>
                        {(roomsInHotel.length > 0) && roomsInHotel.map((room) => (
                            <RoomCardHigh
                                key={room.id}
                                id={room.id}
                                roomName={room.roomName}
                                breakfastPrice={room.breakfastPrice}
                                breakfastFor2Price={room.breakfastFor2Price}
                                discountPercentage={room.discount}
                                oldPrice={room.oldPrice}
                                newPrice={room.newPrice}
                                totalPrice={room.totalPrice}
                            />
                        ))}

                        <h5 className="text-[var(--secondary-red-100)]">Hiện tại khách sạn chưa có phòng nào. Quý khách vui lòng quay lại sau!</h5>
                    </div>
                </div>

                <div id="policy" className="h-[3.125rem]"/>
                <div className={styles.policy}>
                    <h2 className="text-[var(--primary-gold-120)] w-fit text-nowrap">Phí & Chính sách</h2>

                    <div className={styles.policyDetails}>
                        <div>
                            <h4>Phí tùy chọn</h4>
                            <menu>
                                <li>Khách có thể dùng bữa sáng buffet với phụ phí ước tính 290000 VND mỗi người</li>
                                <li>Khách có thể nhận phòng sớm với khoản phụ phí nhỏ (tùy theo tình hình thực tế)</li>
                                <li>Khách có thể trả phòng muộn với khoản phụ phí nhỏ (tùy theo tình hình thực tế)</li>
                            </menu>
                        </div>

                        <div>
                            <h4>Hồ bơi, spa & gym (nếu có)</h4>
                            <menu>
                                <li>Cần đăng ký trước để sử dụng dịch vụ massage và dịch vụ spa. Khách có thể đặt trước khi đến bằng cách liên hệ nơi lưu trú qua số điện thoại được cung cấp trong xác nhận đặt phòng.</li>
                            </menu>
                        </div>

                        <div>
                            <h4>Chính sách </h4>
                            <menu>
                                <li>Chỉ khách đã đăng ký được lưu trú tại phòng.</li>
                                <li>Khách có thể an tâm nghỉ ngơi khi biết rằng có bình cứu hỏa và hệ thống an ninh trong khuôn viên.</li>
                                <li>Nơi lưu trú này nhận thanh toán bằng thẻ tín dụng và tiền mặt.</li>
                            </menu>
                        </div>

                        <div>
                            <h4>Tên khác </h4>
                            <ul>
                                <li>Fusion Suites Vung Tau Hotel</li>
                                <li>Fusion Suites Vung Tau Vung Tau</li>
                                <li>Fusion Suites Vung Tau Hotel Vung Tau</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="review" className="h-[3.125rem]"/>
                <div className={styles.review}>
                    <h2 className="text-[var(--primary-gold-120)]">Đánh giá</h2>
                    <div className={styles.ratingAndComment}>
                        <RatingScoreInReview/>
                        <div className={styles.comments}>  
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <ViewAllButton category="Đánh giá"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}