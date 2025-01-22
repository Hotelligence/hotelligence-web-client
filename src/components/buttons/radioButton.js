'use client'
import React, { useEffect, useState } from "react"
import { Radio, RadioGroup } from "@heroui/react"
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function RadioButton() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleRating = (value) => {
        const params = new URLSearchParams(searchParams);
        const selectedOption = options.find(opt => opt.key === value);

        if (selectedOption?.minRatingScore)
            params.set("minRatingScore", selectedOption.minRatingScore);
        else
            params.delete("minRatingScore");

        replace(`${pathname}?${params.toString()}`);
    }

    const options = [
        { "key": "All", "minRatingScore": "", "label": "Tất cả" },
        { "key": "Outstanding", "minRatingScore": "9", "label": "Tuyệt vời 9+" },
        { "key": "Excellent", "minRatingScore": "8", "label": "Xuất sắc 8+" },
        { "key": "Good", "minRatingScore": "7", "label": "Tốt 7+" }
    ]

    const [value, setValue] = useState("All");
    useEffect(() => {
        const minRatingScore = searchParams.get("minRatingScore");
        const currentOption = options.find(
            opt => opt.minRatingScore === minRatingScore
        );
        setValue(currentOption?.key || "All");
    }, [searchParams]);

    return (
        <RadioGroup 
            label={<h5 className="text-[#1F2C3F]">Đánh giá của khách</h5>}
            value={value}
            onChange={(e) => handleRating(e.target.value)}
        >
            {options.map((option) => (
                <Radio 
                    key={option.key} 
                    value={option.key}
                >
                    {option.label}
                </Radio>
            ))}
        </RadioGroup>
    )
}