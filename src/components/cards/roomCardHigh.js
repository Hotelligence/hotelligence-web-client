import styles from './roomCardHigh.module.css';
import Image from 'next/image';
import HotelAmenity from '../views/hotelAmenity';
import { RadioGroup, Radio } from '@nextui-org/react';
import Discount from './discount';
import CustomButton from '../buttons/button';


export default function RoomCardHigh({ 
        img, 
        roomName, 
        amenity, 
        breakfastPrice, 
        breakfastFor2Price, 
        discountPercentage, 
        numOfRemainingRooms, 
        oldPrice,
        newPrice,
        totalPrice
    }) {
    return (
        <div className={styles.roomCardHighContainer}>
            <div className={styles.imgContainer}>
                <Image className={styles.imgWrapper} src={img}/>
            </div>

            <div className={styles.infoContainer}>
                <h4>{roomName}RoomBed 2 người</h4>
                <HotelAmenity isVertical="true"/>
            </div>

            <div className={styles.extraInfoContainer}>
                <div className={styles.breakfast}>
                    <div className={styles.row1}>
                        <h6>Bổ sung</h6>
                        <text className='body5'>Giá mỗi đêm</text>
                    </div>

                    <div className={styles.row2}>
                        <RadioGroup defaultValue="breakfast" className="w-full">
                            <div className="flex justify-between">
                                <Radio value="breakfast">                                    
                                    <text className='body3'>Bữa sáng</text>                                                                          
                                </Radio>
                                <h6 className='text-right'>+ {breakfastPrice}đ</h6>
                            </div>

                            <div className="flex justify-between">
                                <Radio value="breakfast-for2">
                                    <text className='body3'>Bữa sáng cho 2 người</text>
                                </Radio>
                                <h6>+ {breakfastFor2Price}đ</h6>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                <div className={styles.price}>
                    <div className={styles.row3}>
                        <Discount discountPercentage={discountPercentage}/>
                        <text className='h7 text-[var(--secondary-red-100)]'>Còn {numOfRemainingRooms} phòng</text>
                    </div>

                    <div className={styles.row4}>
                        <div className={styles.price}>
                            <div className={styles.priceDetails}>
                                <h4>{newPrice}123456đ</h4>
                                <text className='body2 line-through text-[var(--primary-blue-50)]'>{oldPrice}1245789đ</text>
                            </div>

                            <text className='body5 text-[var(--primary-blue-50)]'>Tổng {totalPrice}đ bao gồm thuế và phí</text>
                        </div>

                        <CustomButton>Đặt</CustomButton>
                    </div>
                </div>        
            </div>
        </div>
    )
}
