'use client'
import { useState, useEffect } from "react";
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, useDisclosure} from "@heroui/react";
import ViewAllButton from "../buttons/viewAllButton";
import styles from "./roomDetailsModal.module.css"
import Image from "next/image";
import fusion3 from "../../images/fusion3.webp";
import HotelAmenity from "./hotelAmenity";
import { RadioGroup, Radio } from "@heroui/react";
import Discount from "../cards/discount";   
import CustomButton from "../buttons/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RoomDetailsModal({
    id,
    img, 
    roomName, 
    extraOptions, 
    discountPercentage, 
    originPrice, 
    discountedPrice,
    taxPercentage
}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState("option0");
    const searchParams = useSearchParams();
    
    useEffect(() => {
        if (extraOptions && extraOptions.length > 0) {
            setSelectedOptions([extraOptions[0]]);
        }
    }, [extraOptions]);

    const subTotal = discountedPrice + selectedOptions.reduce((acc, option) => acc + option.optionPrice, 0);
    const totalPrice = subTotal + subTotal * taxPercentage / 100;

    const handleOptionChange = (value) => {
        setSelectedValue(value);
        const optionIndex = parseInt(value.replace('option', ''));
        const selectedOption = extraOptions[optionIndex];
        setSelectedOptions(selectedOption ? [selectedOption] : []);
    };

    const createBookingUrl = () => {
        const params = new URLSearchParams();
        params.set('from', searchParams.get('from'));
        params.set('to', searchParams.get('to'));
        if (selectedOptions.length > 0) {
            params.set('options', JSON.stringify(selectedOptions));
        }
        return `/bookingDetails/${id}?${params.toString()}`;
    };
    
    return (
        <div>      
            <ViewAllButton onPress={onOpen} category="tiện ích"/>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="2xl">
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
                                    <div className="flex flex-col gap-2">
                                        <h5>Tùy chọn thêm</h5>

                                        <div className="flex flex-row justify-between items-baseline">
                                            <h6>Bổ sung</h6>
                                            <text className='body5'>Giá mỗi đêm</text>
                                        </div>

                                        <div className="flex flex-row justify-between items-baseline">
                                            <RadioGroup 
                                                value={selectedValue}
                                                onValueChange={handleOptionChange}
                                                className="w-full"
                                            >
                                                {extraOptions && extraOptions.map((option, index) => (
                                                    <div key={index} className="flex justify-between">
                                                        <Radio key={`option${index}`} value={`option${index}`}>                                    
                                                            <text className='body3'>{option.optionName}</text>                                                                          
                                                        </Radio>
                                                        <h6 className='text-right'>+ {option.optionPrice?.toLocaleString('en-US')}đ</h6>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="flex flex-row gap-2 items-baseline mt-[1.56rem]">
                                            {discountPercentage > 0 ? <Discount discountPercentage={discountPercentage}/> : <div className="h-[30px]"/>}
                                            {/* <text className='h7 text-[var(--secondary-red-100)]'>Còn {numOfRemainingRooms} phòng</text> */}
                                        </div>

                                        <div className="flex flex-row justify-between items-end mt-2">
                                            <div className="flex flex-col">
                                                <div className="flex flex-row gap-[0.625rem] items-baseline">
                                                    <h4>{discountedPrice?.toLocaleString('en-US')}đ</h4>
                                                    <text className='body2 line-through text-[var(--primary-blue-50)]'>{originPrice?.toLocaleString('en-US')}đ</text>
                                                </div>

                                                <text className='body5 text-[var(--primary-blue-50)]'>Tổng {totalPrice?.toLocaleString('en-US')}đ bao gồm thuế và phí</text>
                                            </div>

                                            <CustomButton>
                                                <Link href={createBookingUrl()}>
                                                    Đặt
                                                </Link>
                                            </CustomButton>
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
