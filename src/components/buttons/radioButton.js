'use client'
import React from "react"
import { Radio, RadioGroup } from "@nextui-org/react"

export default function RadioButton() {
    return (
        <RadioGroup 
            label={<h5 className="text-[#1F2C3F]">Đánh giá của khách</h5>}>
            <Radio value="All">Tất cả</Radio>
            <Radio value="Outstanding">Tuyệt vời 9+</Radio>
            <Radio value="Excellent">Xuất sắc 8+</Radio>
            <Radio value="Good">Tốt 7+</Radio>
        </RadioGroup>
    )
}