'use client'
import React, {useState, useEffect} from "react"
import { Select, SelectItem } from "@nextui-org/react"
import { ArrowDownUp } from "lucide-react"

export default function Sort() {
    const options = [
        { "key": "suggest", "label": "Đề xuất" },
        { "key": "fromLowToHigh", "label": "Giá thấp đến cao" },
        { "key": "fromHighToLow", "label": "Giá cao đến thấp" },
        { "key": "fromHighestRating", "label": "Đánh giá cao nhất" },
        { "key": "fromLowestRating", "label": "Đánh giá thấp nhất" }
    ]

    const [value, setValue] = useState([options[0].key]);
    

    return (
        <Select 
            variant="bordered" 
            label="Sắp xếp theo"
            startContent={<ArrowDownUp size={20}/>}
            onSelectionChange={setValue}
            selectedKeys={value}
            
        >
            {options.map((option) => (
                <SelectItem key={option.key} value={option.key}>{option.label}</SelectItem>
            ))}    
        </Select>
    )
}
