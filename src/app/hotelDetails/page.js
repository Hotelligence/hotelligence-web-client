'use client'
import React, { useRef } from "react";
import { Button } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import styles from "./hotelDetails.module.css";
import Image from "next/image";
import fusion from "../../images/fusion.jpg";
import fusion1 from "../../images/fusion1.webp";
import fusion2 from "../../images/fusion2.webp";
import fusion3 from "../../images/fusion3.webp";
import fusion4 from "../../images/fusion4.jpg";
import fusion5 from "../../images/fusion5.jpg";
import fusion6 from "../../images/fusion6.webp";
import HotelTabs from "../../components/buttons/hotelTabs";
import CustomButton from "../../components/buttons/button";
import HotelOverview from "../../components/views/hotelOverview";
import HotelAmenity from "../../components/views/hotelAmenity";
import DatePicker from "../../components/inputs/datepicker";
import PopOver from "../../components/inputs/popover";
import RoomCardHigh from "../../components/cards/roomCardHigh";
import NumRoomRadio from "../../components/buttons/numRoomRadio";
import Link from "next/link";
import RatingScoreInReview from "../../components/views/ratingScoreInReview";
import Comment from "../../components/views/comment";
import ViewAllButton from "../../components/buttons/viewAllButton";

export default function HotelDetails({numOfSelectedRooms, allRooms}) {

    return (
        <>
            <Button className="flex justify-start mr-auto p-0" color="transparent" disableAnimation="true">
                    <ArrowLeft size={19}/>
                    <h6 className="underline underline-offset-4">Xem tất cả khách sạn</h6>
            </Button>

            <div className={styles.pageContainer}>
                <div id="overview" className={styles.imagesContainer}>                       
                    <Image src={fusion} className={styles.firstOne}/>                        

                    <div className={styles.others}>
                        <Image src={fusion1} className={styles.item}/>
                        <Image src={fusion2} className={styles.item}/>
                        <Image src={fusion3} className={styles.item}/>
                        <Image src={fusion4} className={styles.item}/>
                        <Image src={fusion5} className={styles.item}/>
                        <Image src={fusion6} className={styles.item}/>
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
                    <HotelOverview/>
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
                        <text className="body3 text-[var(--primary-blue-50)]">Hiển thị {numOfSelectedRooms} trên {allRooms} phòng</text>
                    </div>

                    <div className={styles.roomCards}>
                        <RoomCardHigh img={fusion6}/>
                        <RoomCardHigh/>
                        <RoomCardHigh/>
                        <RoomCardHigh/>
                        <RoomCardHigh/>
                        <RoomCardHigh/>
                    </div>
                </div>

                <div id="policy" className="h-[3.125rem]"/>
                <div className={styles.policy}>
                    <h2 className="text-[var(--primary-gold-120)] w-fit text-nowrap">Phí & Chính sách</h2>

                    <div className={styles.policyDetails}>
                        <div>
                            <h4>Phí tùy chọn</h4>
                            <ul>
                                <li>Khách có thể dùng bữa sáng buffet với phụ phí ước tính 290000 VND mỗi người</li>
                                <li>Khách có thể nhận phòng sớm với khoản phụ phí nhỏ (tùy theo tình hình thực tế)</li>
                                <li>Khách có thể trả phòng muộn với khoản phụ phí nhỏ (tùy theo tình hình thực tế)</li>
                            </ul>
                        </div>

                        <div>
                            <h4>Hồ bơi, spa & gym (nếu có)</h4>
                            <ul>
                                <li>Cần đăng ký trước để sử dụng dịch vụ massage và dịch vụ spa. Khách có thể đặt trước khi đến bằng cách liên hệ nơi lưu trú qua số điện thoại được cung cấp trong xác nhận đặt phòng.</li>
                            </ul>
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
                            <menu>
                                <li>Fusion Suites Vung Tau Hotel</li>
                                <li>Fusion Suites Vung Tau Vung Tau</li>
                                <li>Fusion Suites Vung Tau Hotel Vung Tau</li>
                            </menu>
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