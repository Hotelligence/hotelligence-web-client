'use client'
import React from "react"
import { Select, SelectItem } from "@nextui-org/react"
import { ArrowDownUp } from "lucide-react"

export default function Sort() {
    const sortOptions = ["Đề xuất","Giá thấp đến cao", "Giá cao đến thấp", "Đánh giá cao nhất", "Đánh giá thấp nhất"];

    return (
        <Select 
            variant="bordered" 
            label="Sắp xếp theo"
            startContent={<ArrowDownUp size={20}/>}
            defaultSelectedKeys={["Đề xuất"]}
        >
            
            {sortOptions.map((sortOption, index) => (
                <SelectItem key={index} value={sortOption} >
                    {sortOption}
                </SelectItem>
            ))}
        </Select>
    )
}
