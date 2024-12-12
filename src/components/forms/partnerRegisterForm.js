'use client'
import { Input, Select, SelectItem } from "@nextui-org/react"
import { useEffect, useState } from "react"

export default function PartnerRegisterForm() {
    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [districts, setDistricts] = useState([])
    const [selectedProvince, setSelectedProvince] = useState("")
    const [selectedCity, setSelectedCity] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://provinces.open-api.vn/api/")
            .then(res => res.json())
            .then(data => {
                setProvinces(data.map(p => ({ label: p.name, value: p.code })))
                setLoading(false)
            })
    }, [])

    const handleProvinceChange = (code) => {
        setSelectedProvince(code)
        setSelectedCity("")
        setDistricts([])
        fetch(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
            .then(res => res.json())
            .then(data => {
                setCities(data.districts.map(d => ({ label: d.name, value: d.code })))
            })
    }

    const handleCityChange = (code) => {
        setSelectedCity(code)
        fetch(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
            .then(res => res.json())
            .then(data => {
                setDistricts(data.wards.map(w => ({ label: w.name, value: w.code })))
            })
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-x-[3.125rem] gap-y-[1.875rem] w-max mt-[2.5rem] mb-[2.5rem]">
                <Input className="w-[22.5rem]" label="Tên khách sạn" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="hotelName"/>
                <Input className="w-[22.5rem]" label="Quốc gia" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="country" isReadOnly value={"Việt Nam"} isDisabled/>
                <Select 
                    className="w-[22.5rem]"
                    label="Tỉnh"
                    labelPlacement="outside"
                    variant="bordered"
                    placeholder="Chọn tỉnh"
                    size="lg"
                    isRequired
                    name="province"
                    isLoading={loading}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                >
                    {provinces.map((province) => (
                        <SelectItem key={province.value} value={province.value}>
                            {province.label}
                        </SelectItem>
                    ))}
                </Select>
                <Select 
                    className="w-[22.5rem]"
                    label="Thành phố"
                    labelPlacement="outside"
                    variant="bordered"
                    placeholder="Chọn thành phố"
                    size="lg"
                    isRequired
                    name="city"
                    isDisabled={!selectedProvince}
                    onChange={(e) => handleCityChange(e.target.value)}
                >
                    {cities.map((city) => (
                        <SelectItem key={city.value} value={city.value}>
                            {city.label}
                        </SelectItem>
                    ))}
                </Select>
                <Select 
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
                        <SelectItem key={district.value} value={district.value}>
                            {district.label}
                        </SelectItem>
                    ))}
                </Select>
                <Input className="w-[22.5rem]" label="Địa chỉ" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="address"/>
                <Input className="w-[22.5rem]" label="Mã bưu điện" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="postalCode"/>
                <Input className="w-[22.5rem]" label="Loại hình kinh doanh" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isRequired name="businessType" isReadOnly value={"Khách sạn"} isDisabled/>
            </div>
        </>
    )
}