'use client'
import React, {useState, useEffect} from "react"
import { Select, SelectItem } from "@heroui/react"
import { ArrowDownUp } from "lucide-react"
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";


export default function Sort() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSort = (value) => {
        const params = new URLSearchParams(searchParams);
        const selectedOption = options.find(opt => opt.key === value);

        if (selectedOption?.sortBy && selectedOption?.sortOrder) {
            params.set("sortBy", selectedOption.sortBy);
            params.set("sortOrder", selectedOption.sortOrder);
        } else {
            params.delete("sortBy");
            params.delete("sortOrder");
        }

        replace(`${pathname}?${params.toString()}`);
    }

    const options = [
        { "key": "suggest", "sortBy": null, "sortOrder": null, "label": "Đề xuất" },
        { "key": "priceUp", "sortBy": "discountPrice", "sortOrder": "asc", "label": "Giá thấp đến cao" },
        { "key": "priceDown", "sortBy": "discountPrice", "sortOrder": "desc", "label": "Giá cao đến thấp" },
        { "key": "ratingDown", "sortBy": "ratingScore", "sortOrder": "desc", "label": "Đánh giá cao nhất" },
        { "key": "ratingUp", "sortBy": "ratingScore", "sortOrder": "asc",  "label": "Đánh giá thấp nhất" }
    ]

    const [value, setValue] = useState(options[0].key);
    
    useEffect(() => {
        const sortBy = searchParams.get("sortBy");
        const sortOrder = searchParams.get("sortOrder");
        const currentOption = options.find(
            opt => opt.sortBy === sortBy && opt.sortOrder === sortOrder
        );
        setValue(currentOption?.key || options[0].key);
    }, [searchParams]);
    
    return (
        <Select 
            variant="bordered" 
            label="Sắp xếp theo"
            startContent={<ArrowDownUp size={20}/>}
            onChange={(e) => handleSort(e.target.value)}
            value={value}
            defaultSelectedKeys={[options[0].key]}
        >
            {options.map((option) => (
                <SelectItem key={option.key} value={option.key}>{option.label}</SelectItem>
            ))}    
        </Select>
    )
}
