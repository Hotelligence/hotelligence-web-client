'use client'
import { Input, Textarea, Button, ScrollShadow, Image, Autocomplete, AutocompleteItem } from "@heroui/react"
import CustomButton from "../buttons/button"
import DangerButton from "../buttons/dangerButton"
import AmenityForm from "./amenityForm"
import { useEffect, useState, useRef } from "react"
import { ImagePlus, X } from "lucide-react";
import DeleteRoomModal from "../views/deleteRoomModal"

export default function RoomInfoForm({action, room, allRoomAmenitiesInHotel, deleteAction, roomIdName}) {
    const [isDirty, setIsDirty] = useState(false);
    const [lastSaveTime, setLastSaveTime] = useState(null);
    const [images, setImages] = useState([]);
    const [isClient, setIsClient] = useState(false);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const fileInputRef = useRef(null);
    const [selectedRoomType, setSelectedRoomType] = useState(room?.roomType || "");
    const [selectedBedType, setSelectedBedType] = useState(room?.bedType || "");

    const roomTypes = [
        { label: "Standard Room (Phòng tiêu chuẩn)", value: "Standard Room" },
        { label: "Superior Room (Phòng cao cấp)", value: "Superior Room" },
        { label: "Deluxe Room (Phòng sang trọng)", value: "Deluxe Room" },
        { label: "Executive Room (Phòng điều hành)", value: "Executive Room" },
        { label: "Family Room (Phòng gia đình)", value: "Family Room" },
        { label: "Connecting Rooms (Phòng thông nhau)", value: "Connecting Rooms" },
        { label: "Junior Suite (Phòng bán Suite)", value: "Junior Suite" },
        { label: "Suite (Phòng hạng sang)", value: "Suite" },
        { label: "Presidential Suite (Phòng tổng thống)", value: "Presidential Suite" },
        { label: "Penthouse", value: "Penthouse" },
        { label: "Villa", value: "Villa" },
        { label: "Cabana Room", value: "Cabana Room" }
    ];

    const bedTypes = [
        { label: "Single Bed (Giường đơn)", value: "Single Bed" },
        { label: "Twin Bed (Hai giường đơn)", value: "Twin Bed" },
        { label: "Double Bed (Giường đôi)", value: "Double Bed" },
        { label: "Queen Bed", value: "Queen Bed" },
        { label: "King Bed", value: "King Bed" },
        { label: "Sofa Bed (Giường sofa)", value: "Sofa Bed" }
    ];

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const maxSize = 1024 * 1024; // 1MB limit per image
        
        files.forEach(file => {
            if (file.size > maxSize) {
                alert(`File ${file.name} is too large. Max size is 1MB`);
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target.result;
                if (typeof result === 'string' && result.length < 1048500) { // Keep under 1MB
                    setImages(prev => [...prev, result]);
                } else {
                    alert(`File ${file.name} is too large after conversion`);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    useEffect(() => {
        setIsClient(true);
        if (room) {
            console.log('Room data in form:', room);
            setImages(room.images || []);
            setSelectedRoomType(room.roomType || "");
            setSelectedBedType(room.bedType || "");
            
            // Log existing amenities from room
            console.log('Room amenities:', room.amenities);
            
            // Correctly extract amenity names from room's amenities structure
            const flattenedAmenities = room.amenities?.flatMap(group => 
                group.amenityName || []
            ) || [];
            
            console.log('Flattened amenities:', flattenedAmenities);
            setSelectedAmenities(flattenedAmenities);
        }
    }, [room]);

    useEffect(() => {
        const hiddenInput = document.querySelector('input[name="imagesData"]');
        if (hiddenInput) {
            hiddenInput.value = JSON.stringify(images);
        }
    }, [images]);

    useEffect(() => {
        const hiddenInput = document.querySelector('input[name="amenitiesData"]');
        if (hiddenInput) {
            hiddenInput.value = JSON.stringify(selectedAmenities);
        }
    }, [selectedAmenities]);

    const handleFormChange = () => {
        setIsDirty(true);
    };

    const handleSubmit = async (formData) => {
        // Create a new FormData object to modify the values
        const updatedFormData = new FormData();
        
        // Copy all existing form data
        for (let [key, value] of formData.entries()) {
            if (key === 'roomType') {
                updatedFormData.append(key, selectedRoomType);
            } else if (key === 'bedType') {
                updatedFormData.append(key, selectedBedType);
            } else {
                updatedFormData.append(key, value);
            }
        }

        await action(updatedFormData);
        setIsDirty(false);
        setLastSaveTime(new Date());
    };

    const handleAmenitiesChange = (amenities) => {
        console.log('Updating selected amenities:', amenities);
        setSelectedAmenities(amenities);
        setIsDirty(true);
    };

    if (!isClient) {
        return <div>Loading...</div>; // Show a proper loading indicator
    }
    

    return (
        <div className="flex flex-col w-full">            
            <form action={handleSubmit} onChange={handleFormChange}>
                <div className="flex flex-row justify-between gap-10">
                    <div className="flex flex-col w-full gap-10">
                        <div className="flex flex-col w-full bg-[var(--primary-white-100)] border-1 border-[var(--primary-blue-50)] rounded-[0.625rem] h-auto">
                            <div className="flex bg-[var(--primary-blue-100)] text-[var(--primary-gold-100)] py-4 pl-4 w-full items-center justify-between rounded-t-[0.625rem]">
                                <h4>Thông tin cơ bản</h4>
                            </div>

                            {/* <div className="flex flex-col items-center gap-5 p-5"> */}
                            <div className="grid grid-cols-2 gap-x-[3.125rem] gap-y-[1.875rem] w-full mt-[1.25rem] px-4" >
                                <Input defaultValue={room?.roomName || ""} className="w-auto" label="Tên phòng" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="roomName"/>
                                <Autocomplete
                                    label="Loại phòng"
                                    defaultInputValue={roomTypes.find(t => t.value === room?.roomType)?.label || ""}
                                    defaultSelectedKey={room?.roomType}
                                    onSelectionChange={(key) => {
                                        setSelectedRoomType(key);
                                        setIsDirty(true);
                                    }}
                                    className="w-auto"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    size="lg"
                                    isRequired
                                    name="roomType"
                                >
                                    {roomTypes.map((type) => (
                                        <AutocompleteItem key={type.value} value={type.value}>
                                            {type.label}
                                        </AutocompleteItem>
                                    ))}
                                </Autocomplete>

                                <Input defaultValue={room?.roomNumber || ""} className="w-auto" label="Số phòng" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired pattern="[0-9]*" name="roomNumber"/>
                                <Input defaultValue={room?.originPrice || ""} className="w-auto" label="Giá phòng" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired pattern="[0-9]*" name="originPrice"/>
                                <Input defaultValue={room?.numOfBeds || ""} className="w-auto" label="Số lượng giường" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="numOfBeds"/>
                                <Autocomplete
                                    label="Loại giường"
                                    defaultInputValue={bedTypes.find(t => t.value === room?.bedType)?.label || ""}
                                    defaultSelectedKey={room?.bedType}
                                    onSelectionChange={(key) => {
                                        setSelectedBedType(key);
                                        setIsDirty(true);
                                    }}
                                    className="w-auto"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    size="lg"
                                    isRequired
                                    name="bedType"
                                >
                                    {bedTypes.map((type) => (
                                        <AutocompleteItem key={type.value} value={type.value}>
                                            {type.label}
                                        </AutocompleteItem>
                                    ))}
                                </Autocomplete>
                                <Input defaultValue={room?.maxAdults || ""} className="w-auto" label="Số lượng người lớn tối đa" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired pattern="[0-9]*" name="maxAdults"/>
                                <Input defaultValue={room?.maxChildren || ""} className="w-auto" label="Số lượng trẻ em tối đa" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired pattern="[0-9]*" name="maxChildren"/>
                                <Input defaultValue={room?.discountPercentage || ""} className="w-auto" label="Chiết khấu" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" name="discountPercentage"/>
                                <Input defaultValue={room?.taxPercentage || ""} className="w-auto" label="Thuế" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="taxPercentage"/>
                            </div>

                            {room ? <div className="p-4 text-[var(--secondary-green-100)]">
                                <h5>Giá phòng khi áp dụng thuế và chiết khấu = {((room?.originPrice - room?.originPrice*room?.discountPercentage/100) + (room?.originPrice - room?.originPrice*room?.discountPercentage/100)*room?.taxPercentage/100)?.toLocaleString('vi-VN') || ""}đ</h5>
                            </div> : null}

                            <div className="p-4">
                            <Textarea defaultValue={room?.description || ""} className="w-full"  label="Mô tả" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="description"
                                    classNames={{
                                        label: "text-base"
                                    }}
                                />
                            </div>
                                
                            <div className="grid grid-cols-1 w-full">
                                <div className="flex flex-col p-4">
                                    <h7>Ảnh phòng</h7>
                                    <div className="w-full">
                                        <input 
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            name="images"                                 
                                        />
                                        <Button 
                                            className="mb-[1.875rem]" 
                                            startContent={<ImagePlus size={20}/>}
                                            onClick={() => fileInputRef.current.click()}
                                        >
                                            Thêm ảnh
                                        </Button>
                                        <ScrollShadow 
                                            orientation="horizontal" 
                                            className="flex gap-2 w-full overflow-y-hidden"
                                            hideScrollBar
                                            >
                                            {images.map((image, index) => (
                                                <div key={index} className="relative h-max">
                                                    <div className="w-[150px] h-[100px] flex items-center justify-center p-1">
                                                        <Image 
                                                            src={image}
                                                            alt={`Upload ${index + 1}`}
                                                            className="w-full h-full rounded-lg object-contain"
                                                        />
                                                    </div>
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        className="absolute top-1 right-1 rounded-full hover:bg-danger-500 shadow-lg z-[100]"
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        <X size={14} />
                                                    </Button>
                                                
                                            </div>
                                                
                                            ))}
                                        </ScrollShadow>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-full bg-[var(--primary-white-100)] border-1 border-[var(--primary-blue-50)] rounded-[0.625rem] h-auto">
                            <div className="flex bg-[var(--primary-blue-100)] text-[var(--primary-gold-100)] py-4 pl-4 w-full items-center justify-between rounded-t-[0.625rem]">
                                <h4>Tùy chọn thêm</h4>
                            </div>
                    
                            <div className="grid grid-cols-2 gap-x-[3.125rem] gap-y-[1.875rem] w-full mt-[1.25rem] mb-[2.5rem] px-4" >
                                {room?.extraOptions?.map((option, index) => (
                                    <Input key={index} defaultValue={option?.optionPrice || ""} className="w-auto" label={option.optionName} labelPlacement="outside" variant="bordered" placeholder=" " size="lg" name="extraOptions"/>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full">
                        <div className="flex flex-col w-full bg-[var(--primary-white-100)] border-1 border-[var(--primary-blue-50)] rounded-[0.625rem] h-fit">
                            <div className="flex bg-[var(--primary-blue-100)] text-[var(--primary-gold-100)] py-4 pl-4 w-full items-center justify-between rounded-t-[0.625rem]">
                                <h4>Tiện nghi</h4>
                            </div>

                            <div>
                                <AmenityForm 
                                    allRoomAmenitiesInHotel={allRoomAmenitiesInHotel}
                                    selectedAmenities={selectedAmenities}
                                    onAmenitiesChange={handleAmenitiesChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 mt-10">
                    <div className="flex justify-start">
                        {room ? <DeleteRoomModal action={deleteAction} roomId={room.id} roomIdName={roomIdName}/> : null}
                    </div>

                    <div className="flex justify-center">
                        {room ? <CustomButton type="submit">Lưu thông tin</CustomButton> :
                                <CustomButton type="submit">Thêm phòng</CustomButton>}
                    </div>

                    <div className={isDirty ? "text-[--secondary-red-100] text-right" : "text-[--secondary-green-100] text-right"}>
                        {isDirty ? "Chưa lưu" : 
                        lastSaveTime ? room ? `Đã lưu chỉnh sửa vào ${lastSaveTime.toLocaleTimeString('vi-VN')} ${lastSaveTime.toLocaleDateString('vi-VN')}` : 
                         `Đã thêm phòng thành công vào ${lastSaveTime.toLocaleTimeString('vi-VN')} ${lastSaveTime.toLocaleDateString('vi-VN')}` : 
                        ""}
                    </div>

                    <input 
                        type="hidden"
                        name="imagesData"
                        value={images.length > 0 ? JSON.stringify(images.map(img => img.substring(0, 1048500))) : '[]'}
                    />
                    <input 
                        type="hidden"
                        name="amenitiesData"
                        value={JSON.stringify(selectedAmenities)}
                    />
                </div>
            </form>

            
        </div>
    )
}