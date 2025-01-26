import { CarFront, Coffee, Utensils, Waves, Wifi, Wine } from "lucide-react";
import ViewAllButton from "../buttons/viewAllButton";
import RoomDetailsModal from "./roomDetailsModal";
import { useDisclosure } from "@heroui/react";

export default function HotelAmenity({
    roomId,
    isVertical, 
    isRoomDetailModal, 
    roomName, 
    extraOptions,
    discountPercentage,
    originPrice,
    discountedPrice,
    taxPercentage
    }) {

    if (isVertical === "false") {
        return (
            <div className="grid grid-cols-2 gap-x-20 gap-y-0 w-96 grid-rows-[2rem_2rem_2rem_2rem]">
                <div className="flex gap-2 items-center">
                    <Coffee size={19}/>
                    <p className="body3">Bao gồm bữa sáng</p>
                </div>

                <div className="flex gap-2 items-center">
                    <Waves size={19}/>
                    <p className="body3">Hồ bơi</p>
                </div>

                <div className="flex gap-2 items-center">
                    <Wifi size={19}/>
                    <p className="body3">Wifi miễn phí</p>
                </div>

                <div className="flex gap-2 items-center">
                    <Utensils size={19}/>
                    <p className="body3">Nhà hàng</p>
                </div>

                <div className="flex gap-2 items-center">
                    <Wine size={19}/>
                    <p className="body3">Bar</p>
                </div>

                <div className="flex gap-2 items-center">
                    <CarFront size={19}/>
                    <p className="body3">Bao gồm đậu xe</p>
                </div>

                <div className="flex items-start">
                    <ViewAllButton />
                </div>
            </div>
        )
    }
    else if (isVertical === "true"){
        return (
            <div className="grid grid-cols-1 gap-x-20 gap-y-0 w-96 grid-rows-[2rem_2rem_2rem_2rem_2rem_2rem]">
            <div className="flex gap-2 items-center">
                <Coffee size={19}/>
                <p className="body3">Bao gồm bữa sáng</p>
            </div>

            <div className="flex gap-2 items-center">
                <Waves size={19}/>
                <p className="body3">Hồ bơi</p>
            </div>

            <div className="flex gap-2 items-center">
                <Wifi size={19}/>
                <p className="body3">Wifi miễn phí</p>
            </div>

            <div className="flex gap-2 items-center">
                <Utensils size={19}/>
                <p className="body3">Nhà hàng</p>
            </div>

            <div className="flex gap-2 items-center">
                <Wine size={19}/>
                <p className="body3">Bar</p>
            </div>

            <div className="flex gap-2 items-center">
                <CarFront size={19}/>
                <p className="body3">Bao gồm đậu xe</p>
            </div>

            {!isRoomDetailModal && (
                <div className="flex items-start">
                <RoomDetailsModal 
                    id={roomId}
                    roomName={roomName} 
                    extraOptions={extraOptions}
                    discountPercentage={discountPercentage}
                    originPrice={originPrice}
                    discountedPrice={discountedPrice}
                    taxPercentage={taxPercentage}
                />
                </div>
            )}
            </div>
        )
    }
}