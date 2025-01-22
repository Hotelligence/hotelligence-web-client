'use client'
import { Input, Select, SelectItem, Autocomplete, AutocompleteItem } from "@heroui/react"
import { useEffect, useState } from "react"
import CustomButton from "../buttons/button"

export default function PartnerRegisterForm({ action }) {
    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [districts, setDistricts] = useState([])

    const [selectedCountry, setSelectedCountry] = useState("Việt Nam")
    const [selectedProvince, setSelectedProvince] = useState("")
    const [selectedCity, setSelectedCity] = useState("")
    const [selectedBusinessType, setSelectedBusinessType] = useState("Khách sạn")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
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
    }, [])

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

    return (
        <form action={action}>
            <div className="grid grid-cols-2 gap-x-[3.125rem] gap-y-[1.875rem] w-max mt-[2.5rem] mb-[2.5rem]" >
                <Input className="w-[22.5rem]" label="Tên khách sạn" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="hotelName"/>
                <Autocomplete
                    className="w-[22.5rem]"
                    label="Quốc gia"
                    labelPlacement="outside"
                    variant="bordered"
                    placeholder="Chọn quốc gia"
                    size="lg"
                    isRequired
                    name="country"
                    isLoading={loading}
                    onSelectionChange={(key) => handleCountryChange(key)}>
                        <AutocompleteItem key="Việt Nam" value="Việt Nam">Việt Nam</AutocompleteItem>
                </Autocomplete>
                <Autocomplete 
                    className="w-[22.5rem]"
                    label="Tỉnh"
                    labelPlacement="outside"
                    variant="bordered"
                    placeholder="Chọn tỉnh"
                    size="lg"
                    isRequired
                    name="province"
                    isDisabled={!selectedCountry}
                    onSelectionChange={(key) => handleProvinceChange(key)}
                >
                    {provinces.map((province) => (
                        <AutocompleteItem key={province.value} value={province.label}>
                            {province.label}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
                <Autocomplete 
                    className="w-[22.5rem]"
                    label="Thành phố"
                    labelPlacement="outside"
                    variant="bordered"
                    placeholder="Chọn thành phố"
                    size="lg"
                    isRequired
                    name="city"
                    isDisabled={!selectedProvince}
                    onSelectionChange={(key) => handleCityChange(key)}
                >
                    {cities.map((city) => (
                        <AutocompleteItem key={city.value} value={city.label}>
                            {city.label}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
                <Autocomplete 
                    className="w-[22.5rem]"
                    label="Quận huyện/Phường xã"
                    labelPlacement="outside"
                    variant="bordered"
                    placeholder="Chọn quận/huyện"
                    size="lg"
                    isRequired
                    name="district"
                    isDisabled={!selectedCity}
                >
                    {districts.map((district) => (
                        <AutocompleteItem key={district.value} value={district.label}>
                            {district.label}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
                <Input className="w-[22.5rem]" label="Địa chỉ" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="address"/>
                <Input className="w-[22.5rem]" label="Mã bưu điện" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="postalCode" pattern="[0-9]*"/>
                <Autocomplete
                    className="w-[22.5rem]"
                    label="Loại hình kinh doanh"
                    labelPlacement="outside"
                    variant="bordered"
                    placeholder="Chọn loại hình kinh doanh"
                    size="lg"
                    isRequired
                    name="businessType"
                    onSelectionChange={(key) => handleBusinessTypeChange(key)}
                    >                                                
                        <AutocompleteItem key="Khách sạn" value="Khách sạn">Khách sạn</AutocompleteItem>
                </Autocomplete>
                
            </div>
            
            <div className="flex justify-center">
                <CustomButton type="submit">Xác nhận</CustomButton>
            </div>
        </form>
    )
}