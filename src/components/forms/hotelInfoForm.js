'use client'
import styles from "./bookingForm.module.css";
import { Input, Autocomplete, AutocompleteItem, Select, SelectItem, Textarea, Button, ScrollShadow, Image } from "@heroui/react"
import { useEffect, useState, useRef } from "react"
import CustomButton from "../buttons/button"
import { ImagePlus, X } from "lucide-react";

export default function HotelInfoForm({title, action, hotel}) {
    const [isClient, setIsClient] = useState(false)
    const [loading, setLoading] = useState(true)
    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [districts, setDistricts] = useState([])
    const [selectedCountry, setSelectedCountry] = useState("Việt Nam")
    const [selectedProvince, setSelectedProvince] = useState("")
    const [selectedCity, setSelectedCity] = useState("")
    const [selectedBusinessType, setSelectedBusinessType] = useState("Khách sạn")
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);
    const [isDirty, setIsDirty] = useState(false);
    const [lastSaveTime, setLastSaveTime] = useState(null);
    
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

    // Initialize data
    useEffect(() => {
        setIsClient(true)
        if (hotel) {
            setSelectedCountry(hotel.country || "Việt Nam")
            setSelectedProvince(hotel.province || "")
            setSelectedCity(hotel.city || "")
            setSelectedBusinessType(hotel.businessType || "Khách sạn")
            setImages(hotel.images || [])
        }
    }, [hotel])

    // Fetch provinces
    useEffect(() => {
        if (!isClient) return;
        
        fetch("https://provinces.open-api.vn/api/")
            .then(res => res.json())
            .then(data => {
                setProvinces(data.map(p => ({ label: p.name, value: p.code })))
                setLoading(false)
            })
            .catch(error => {
                console.error("Error fetching provinces:", error)
                setLoading(false)
            })
    }, [isClient])

    useEffect(() => {
        if (!selectedProvince) return;
        
        fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
            .then(res => res.json())
            .then(data => {
                setCities(data.districts.map(d => ({ label: d.name, value: d.code })))
            })
            .catch(error => console.error("Error fetching cities:", error))
    }, [selectedProvince])

    useEffect(() => {
        if (!selectedCity) return;

        fetch(`https://provinces.open-api.vn/api/d/${selectedCity}?depth=2`)
            .then(res => res.json())
            .then(data => {
                setDistricts(data.wards.map(w => ({ label: w.name, value: w.code })))
            })
            .catch(error => console.error("Error fetching districts:", error))
    }, [selectedCity])

    const handleCountryChange = (key) => {
        if (!key || key === selectedCountry) return;
        setSelectedCountry(key)
        setSelectedProvince("")
        setSelectedCity("")
        setDistricts([])
        setCities([])
    }

    const handleProvinceChange = (code) => {
        if (!code || code === selectedProvince) return;
        setSelectedProvince(code)
        setSelectedCity("")
        setDistricts([])
    }
    
    const handleCityChange = (code) => {
        if (!code || code === selectedCity) return;
        setSelectedCity(code)
    }

    const handleBusinessTypeChange = (key) => {
        if (!key || key === selectedBusinessType) return;
        setSelectedBusinessType(key)
    }

    // Add this useEffect to update hidden input when images change
    useEffect(() => {
        const hiddenInput = document.querySelector('input[name="imagesData"]');
        if (hiddenInput) {
            hiddenInput.value = JSON.stringify(images);
        }
    }, [images]);

    const handleFormChange = () => {
        setIsDirty(true);
    };

    const handleSubmit = async (formData) => {
        await action(formData);
        setIsDirty(false);
        setLastSaveTime(new Date());
    };

    // Render loading state or form
    if (!isClient) {
        return <div>Loading...</div>; // Show a proper loading indicator
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.title}>
                <h4>{title}</h4>
                
            </div>

            <div className={styles.content}>
                <form action={handleSubmit} onChange={handleFormChange}>
                    <div className="grid grid-cols-2 gap-x-[3.125rem] gap-y-[1.875rem] w-max mt-[1.25rem] mb-[2.5rem]" >
                        <Input defaultValue={hotel?.hotelName || ""} className="w-auto" label="Tên khách sạn" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="hotelName"/>
                        <Autocomplete
                            className="w-[28rem]"
                            label="Quốc gia"
                            labelPlacement="outside"
                            variant="bordered"
                            placeholder="Chọn quốc gia"
                            size="lg"
                            isRequired
                            name="country"
                            isLoading={loading}
                            defaultInputValue="Việt Nam"
                            onSelectionChange={(key) => handleCountryChange(key)}>
                                <AutocompleteItem key="Việt Nam" value="Việt Nam">Việt Nam</AutocompleteItem>
                        </Autocomplete>
                        <Autocomplete 
                            className="w-[28rem]"
                            label="Tỉnh"
                            labelPlacement="outside"
                            variant="bordered"
                            placeholder="Chọn tỉnh"
                            size="lg"
                            isRequired
                            name="province"
                            isDisabled={!selectedCountry}
                            defaultInputValue={hotel?.province || ""}
                            onSelectionChange={(key) => handleProvinceChange(key)}
                        >
                            {provinces.map((province) => (
                                <AutocompleteItem key={province.value} value={province.label}>
                                    {province.label}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                        <Autocomplete 
                            className="w-[28rem]"
                            label="Thành phố"
                            labelPlacement="outside"
                            variant="bordered"
                            placeholder="Chọn thành phố"
                            size="lg"
                            isRequired
                            name="city"
                            isDisabled={!selectedProvince}
                            defaultInputValue={hotel?.city || ""}
                            onSelectionChange={(key) => handleCityChange(key)}
                        >
                            {cities.map((city) => (
                                <AutocompleteItem key={city.value} value={city.label}>
                                    {city.label}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                        <Autocomplete 
                            className="w-[28rem]"
                            label="Quận huyện/Phường xã"
                            labelPlacement="outside"
                            variant="bordered"
                            placeholder="Chọn quận/huyện"
                            size="lg"
                            isRequired
                            name="district"
                            isDisabled={!selectedCity}
                            defaultInputValue={hotel?.district || ""}
                        >
                            {districts.map((district) => (
                                <AutocompleteItem key={district.value} value={district.label}>
                                    {district.label}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                        <Input defaultValue={hotel?.address || ""} className="w-[28rem]" label="Địa chỉ" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="address"/>
                        <Input defaultValue={hotel?.postalCode || ""} className="w-[28rem]" label="Mã bưu điện" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="postalCode" pattern="[0-9]*"/>
                        <Autocomplete
                            className="w-[28rem]"
                            label="Loại hình kinh doanh"
                            labelPlacement="outside"
                            variant="bordered"
                            placeholder="Chọn loại hình kinh doanh"
                            size="lg"
                            isRequired
                            name="businessType"
                            defaultInputValue={hotel?.businessType || "Khách sạn"}
                            onSelectionChange={(key) => handleBusinessTypeChange(key)}
                            >                                                
                                <AutocompleteItem key="Khách sạn" value="Khách sạn">Khách sạn</AutocompleteItem>
                        </Autocomplete>
                        <Input defaultValue={hotel?.phoneNumber || ""} className="w-[28rem]" label="Số điện thoại" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="phoneNumber" pattern="[0-9]*"/>
                        <Input defaultValue={hotel?.emailAddress || ""} className="w-[28rem]" label="Email" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="emailAddress" type="email"/>
                        
                        <div className="flex flex-row">
                            <div>
                                <Select defaultSelectedKeys={[`${hotel?.star}`]} className="w-[28rem] mb-[1.875rem]" label="Số sao khách sạn" labelPlacement="outside" variant="bordered" placeholder="Chọn số sao" size="lg" isRequired name="star">
                                    <SelectItem key="1" value={1}>1</SelectItem>
                                    <SelectItem key="2" value={2}>2</SelectItem>
                                    <SelectItem key="3" value={3}>3</SelectItem>
                                    <SelectItem key="4" value={4}>4</SelectItem>
                                    <SelectItem key="5" value={5}>5</SelectItem>
                                </Select>
                                
                                <Textarea defaultValue={hotel?.description || ""} className="w-[28rem]"  label="Mô tả" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="description"
                                    classNames={{
                                        label: "text-base"
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h7>Ảnh khách sạn</h7>
                            <div className="w-[28rem]">
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
                                    className="flex gap-2 w-full pt-4 pb-6 max-h-max"
                                    hideScrollBar
                                    >
                                    {images.map((image, index) => (
                                        <div key={index} className="relative h-max">
                                            <div className="w-[150px] h-[100px] flex items-center justify-center">
                                                <Image 
                                                    src={image}
                                                    alt={`Upload ${index + 1}`}
                                                    className="w-full h-full rounded-lg object-contain"
                                                />
                                            </div>
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                className="absolute -top-1 right-1 rounded-full hover:bg-danger-500 shadow-lg z-[100]"
                                                onClick={() => removeImage(index)}
                                            >
                                                <X size={14} />
                                            </Button>
                                        
                                      </div>
                                        
                                    ))}
                                </ScrollShadow>
                            </div>
                        </div>

                        <Textarea 
                            defaultValue={hotel?.optionalFees || ""}
                            className="w-[28rem]"  
                            label="Phí tùy chọn" 
                            labelPlacement="outside" 
                            variant="bordered" 
                            placeholder=" " 
                            size="lg" 
                            name="optionalFees"
                            classNames={{
                                label: "text-base"
                            }}
                        />
                        <Textarea 
                            defaultValue={hotel?.amenities || ""}
                            className="w-[28rem]"  
                            label="Hồ bơi, Spa & Gym (nếu có)" 
                            labelPlacement="outside" 
                            variant="bordered" 
                            placeholder=" " 
                            size="lg" 
                            name="amenities"
                            classNames={{
                                label: "text-base"
                            }}
                        />
                        <Textarea 
                            defaultValue={hotel?.policies || ""}
                            className="w-[28rem]"  
                            label="Chính sách" 
                            labelPlacement="outside" 
                            variant="bordered" 
                            placeholder=" " 
                            size="lg" 
                            name="policies"
                            classNames={{
                                label: "text-base"
                            }}
                        />
                        <Textarea 
                            defaultValue={hotel?.otherNames || ""}
                            className="w-[28rem]"  
                            label="Tên khác" 
                            labelPlacement="outside" 
                            variant="bordered" 
                            placeholder=" " 
                            size="lg" 
                            name="otherNames"
                            classNames={{
                                label: "text-base"
                            }}
                        />
                        
                        <div>

                        </div>

                        <div className={isDirty ? "text-[--secondary-red-100] text-right" : "text-[--secondary-green-100] text-right"}>
                            {isDirty ? "Chưa lưu" : 
                            lastSaveTime ? `Đã lưu chỉnh sửa vào ${lastSaveTime.toLocaleTimeString('vi-VN')} ${lastSaveTime.toLocaleDateString('vi-VN')}` : 
                            ""}
                        </div>

                    </div>
                    
                    <input 
                        type="hidden"
                        name="imagesData"
                        value={images.length > 0 ? JSON.stringify(images.map(img => img.substring(0, 1048500))) : '[]'}
                    />

                    <div>
                        
                    </div>
                    <div className="flex justify-center">
                        <CustomButton type="submit">Lưu</CustomButton>
                    </div>

                    
                </form>
            </div>
        </div>
    )
}