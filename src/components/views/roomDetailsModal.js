'use client'
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, useDisclosure} from "@nextui-org/react";
import ViewAllButton from "../buttons/viewAllButton";
import styles from "./roomDetailsModal.module.css"
import Image from "next/image";
import fusion3 from "../../images/fusion3.webp";
import HotelAmenity from "./hotelAmenity";
import { RadioGroup, Radio } from "@nextui-org/react";
import Discount from "../cards/discount";
import CustomButton from "../buttons/button";
import stylesRoomCardHigh from "../cards/roomCardHigh.module.css";

export default function RoomDetailsModal({img, roomName, breakfastPrice, breakfastFor2Price, discountPercentage, numOfRemainingRooms, originPrice, discountPrice, totalPrice}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div>      
      <ViewAllButton onPress={onOpen} category="tiện ích"/>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="2xl" >
        <ModalContent className="overflow-hidden">
            <>
                <ModalHeader className="flex justify-center"> <h5>Thông tin phòng</h5></ModalHeader>
                <ModalBody className={styles.customScrollbar}>
                    <div className={styles.bodyContainer}>
                        <div className={styles.imgContainer}>
                            <Image src={img} className={styles.imgWrapper} width={200} height={200} priority/>
                        </div>

                        <h3>{roomName}</h3>

                        <HotelAmenity isVertical="true" isRoomDetailModal/>

                        <div className={styles.extraInfoContainer}>
                            <div className={stylesRoomCardHigh.breakfast}>
                                <h5>Tùy chọn thêm</h5>

                                <div className={stylesRoomCardHigh.row1}>
                                    <h6>Bổ sung</h6>
                                    <text className='body5'>Giá mỗi đêm</text>
                                </div>

                                <div className={stylesRoomCardHigh.row2}>
                                    <RadioGroup defaultValue="breakfast" className="w-full">
                                        <div className="flex justify-between">
                                            <Radio value="breakfast">                                    
                                                <text className='body3'>Bữa sáng</text>                                                                          
                                            </Radio>
                                            <h6 className='text-right'>+ {breakfastPrice?.toLocaleString('en-US')}đ</h6>
                                        </div>

                                        <div className="flex justify-between">
                                            <Radio value="breakfast-for2">
                                                <text className='body3'>Bữa sáng cho 2 người</text>
                                            </Radio>
                                            <h6>+ {breakfastFor2Price?.toLocaleString('en-US')}đ</h6>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className={stylesRoomCardHigh.price}>
                                <div className={stylesRoomCardHigh.row3}>
                                    <Discount discountPercentage={discountPercentage*100}/>
                                    <text className='h7 text-[var(--secondary-red-100)]'>Còn {numOfRemainingRooms} phòng</text>
                                </div>

                                <div className={stylesRoomCardHigh.row4}>
                                    <div className={stylesRoomCardHigh.price}>
                                        <div className={stylesRoomCardHigh.priceDetails}>
                                            <h4>{discountPrice?.toLocaleString('en-US')}đ</h4>
                                            <text className='body2 line-through text-[var(--primary-blue-50)]'>{originPrice?.toLocaleString('en-US')}đ</text>
                                        </div>

                                        <text className='body5 text-[var(--primary-blue-50)]'>Tổng {totalPrice?.toLocaleString('en-US')}đ bao gồm thuế và phí</text>
                                    </div>

                                    <CustomButton>Đặt</CustomButton>
                                </div>
                            </div>      
                        </div>  
                    </div>
                </ModalBody>
            </>
        </ModalContent>
      </Modal>
    </div>
  );
}
