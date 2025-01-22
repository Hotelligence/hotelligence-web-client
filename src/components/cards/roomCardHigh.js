'use client'
import styles from './roomCardHigh.module.css';
import Image from 'next/image';
import HotelAmenity from '../views/hotelAmenity';
import { RadioGroup, Radio } from "@heroui/react";
import Discount from './discount';
import CustomButton from '../buttons/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function RoomCardHigh({ 
        id,
        roomName,
        images,
        originPrice,
        discountPercentage,
        discountedPrice,
        taxPercentage,
        extraOptions,  // Changed from optionName, optionPrice to extraOptions array
        amenityType,
        amenityName
    }) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState("option0");
    const [isZoomed, setIsZoomed] = useState(false);
    const searchParams = useSearchParams();
    
    useEffect(() => {
        if (extraOptions && extraOptions.length > 0) {
            setSelectedOptions([extraOptions[0]]);
        }
    }, [extraOptions]);

    const subTotal = discountedPrice + selectedOptions.reduce((acc, option) => acc + option.optionPrice, 0);
    const totalPrice = subTotal + subTotal * taxPercentage / 100;

    console.log('selectedOptions: ', selectedOptions);
    console.log('totalPrice: ', totalPrice);

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
        <div className={styles.roomCardHighContainer}>
            <div 
                className={`${styles.imgContainer} ${isZoomed ? styles.zoomed : ''}`}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
            >
                <Image 
                    className={`${styles.imgWrapper} ${isZoomed ? styles.zoomedImage : ''}`} 
                    src={images} 
                    width={500} 
                    height={500} 
                    priority
                />
            </div>

            <div className={styles.infoContainer}>
                <h4>{roomName}</h4>
                <HotelAmenity isVertical="true"
                    roomName={roomName}
                    extraOptions={extraOptions}
                    discountPercentage={discountPercentage}
                    originPrice={originPrice}
                    discountedPrice={discountedPrice}
                    taxPercentage={taxPercentage}
                     />
            </div>

            <div className={styles.extraInfoContainer}>
                <div className={styles.breakfast}>
                    {extraOptions.length > 0 && (
                        <div className={styles.row1}>
                            <h6>Bổ sung</h6>
                            <text className='body5'>Giá mỗi đêm</text>
                        </div>
                    )}

                    <div className={styles.row2}>
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

                <div className={styles.price}>
                    <div className={styles.row3}>
                        <Discount discountPercentage={discountPercentage}/>
                        {/* <text className='h7 text-[var(--secondary-red-100)]'>Còn {numOfRemainingRooms} phòng</text> */}
                    </div>

                    <div className={styles.row4}>
                        <div className={styles.price}>
                            <div className={styles.priceDetails}>
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
    )
}
