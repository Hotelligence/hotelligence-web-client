'use client'
// Remove styles import
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
        <div className="flex flex-col rounded-[1.25rem] border border-[var(--primary-blue-50)] h-auto w-[25rem]">
            <div 
                className={`h-[13.75rem] overflow-hidden rounded-t-[1.25rem] relative ${
                    isZoomed ? 'zoomed' : ''
                }`}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
            >
                <Image 
                    className={`object-cover h-full w-full transition-transform duration-300 ease-in-out rounded-t-[1.25rem] ${
                        isZoomed ? 'scale-110' : ''
                    }`}
                    src={images} 
                    width={500} 
                    height={500} 
                    priority
                />
            </div>

            <div className="flex flex-col p-5">
                <h4>{roomName}</h4>
                <HotelAmenity 
                    roomId={id}
                    isVertical="true"
                    roomName={roomName}
                    extraOptions={extraOptions}
                    discountPercentage={discountPercentage}
                    originPrice={originPrice}
                    discountedPrice={discountedPrice}
                    taxPercentage={taxPercentage}
                />
            </div>

            <div className="flex flex-col p-5 border-t border-[var(--primary-blue-50)]">
                <div className="flex flex-col gap-2">
                    {extraOptions.length > 0 && (
                        <div className="flex flex-row justify-between items-baseline">
                            <h6>Bổ sung</h6>
                            <p className="body5">Giá mỗi đêm</p>
                        </div>
                    )}

                    <div className="flex flex-row justify-between items-baseline">
                        <RadioGroup 
                            value={selectedValue}
                            onValueChange={handleOptionChange}
                            className="w-full"
                        >
                            {extraOptions && extraOptions.map((option, index) => (
                                <div key={index} className="flex justify-between">
                                    <Radio key={`option${index}`} value={`option${index}`}>                                    
                                        <p className="body3">{option.optionName}</p>                                                                          
                                    </Radio>
                                    <h6 className="text-right">+ {option.optionPrice?.toLocaleString('en-US')}đ</h6>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-row gap-2 items-baseline mt-6">
                        {discountPercentage > 0 ? <Discount discountPercentage={discountPercentage}/> : <div className="h-[30px]"/>}
                    </div>

                    <div className="flex flex-row justify-between items-end mt-2">
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-2.5 items-baseline">
                                <h4>{discountedPrice?.toLocaleString('en-US')}đ</h4>
                                <p className="body2 line-through text-[var(--primary-blue-50)]">{originPrice?.toLocaleString('en-US')}đ</p>
                            </div>

                            <p className="body5 text-[var(--primary-blue-50)]">Tổng {totalPrice?.toLocaleString('en-US')}đ bao gồm thuế và phí</p>
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
