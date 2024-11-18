'use client'
import React, {useState, useEffect} from "react"
import { Select, SelectItem } from "@nextui-org/react"
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

        if (selectedOption?.sortBy)
            params.set("sortBy", selectedOption.sortBy);
        else
            params.delete("sortBy");

        if (selectedOption?.sortOrder)
            params.set("sortOrder", selectedOption.sortOrder);
        else
            params.delete("sortOrder");

        replace(`${pathname}?${params.toString()}`);
    }

    const options = [
        { "key": "suggest", "sortBy": "", "sortOrder": "", "label": "Đề xuất" },
        { "key": "priceUp", "sortBy": "discountPrice", "sortOrder": "asc", "label": "Giá thấp đến cao" },
        { "key": "priceDown", "sortBy": "discountPrice", "sortOrder": "desc", "label": "Giá cao đến thấp" },
        { "key": "ratingDown", "sortBy": "ratingScore", "sortOrder": "desc", "label": "Đánh giá cao nhất" },
        { "key": "ratingUp", "sortBy": "ratingScore", "sortOrder": "asc",  "label": "Đánh giá thấp nhất" }
    ]

    const [value, setValue] = useState("suggest");
    
    useEffect(() => {
        const sortBy = searchParams.get("sortBy");
        const sortOrder = searchParams.get("sortOrder");
        const currentOption = options.find(
            opt => opt.sortBy === sortBy && opt.sortOrder === sortOrder
        );
        setValue(currentOption?.key || "suggest");
    }, [searchParams]);
    
    return (
        <Select 
            variant="bordered" 
            label="Sắp xếp theo"
            startContent={<ArrowDownUp size={20}/>}
            onChange={(e) => handleSort(e.target.value)}
            value={value}
            defaultSelectedKeys={["suggest"]}
        >
            {options.map((option) => (
                <SelectItem key={option.key} value={option.key}>{option.label}</SelectItem>
            ))}    
        </Select>
    )
}
