'use client'
import React, { useEffect, useState } from "react"
import { Slider, Input } from "@heroui/react"
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function PriceSlider({ minValue, maxValue, defaultMinValue, defaultMaxValue, step }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSliderChange = (newValue) => {
        const [min, max] = newValue;
        const params = new URLSearchParams(searchParams);

        if (min !== undefined)
            params.set("minPrice", min);
        else
            params.delete("minPrice");

        if (max !== undefined)
            params.set("maxPrice", max);
        else
            params.delete("maxPrice");

        replace(`${pathname}?${params.toString()}`);
        setValue(newValue);
    }

    const [value, setValue] = useState([defaultMinValue, defaultMaxValue]);
    useEffect(() => {
        const minPrice = parseInt(searchParams.get("minPrice")) || defaultMinValue;
        const maxPrice = parseInt(searchParams.get("maxPrice")) || defaultMaxValue;
        setValue([minPrice, maxPrice]);
    }, [searchParams]);

    const [minValueInput, setMinValueInput] = useState(minValue);
    const [maxValueInput, setMaxValueInput] = useState(maxValue);

    const handleMinValueInputChange = (event) => {
        const newValue = parseInt(event.target.value);
        if (!isNaN(newValue)) {
            setMinValueInput(newValue);
            setValue([newValue, value[1]]);
        }
    };

    const handleMaxValueInputChange = (event) => {
        const newValue = parseInt(event.target.value);
        if (!isNaN(newValue)) {
            setMaxValueInput(newValue);
            setValue([value[0], newValue]);
        }
    };
    

    return (
        <div className="flex flex-col w-full gap-4">
            <Slider
                label={<h5>Giá mỗi đêm</h5>}
                formatOptions={{ style: "currency", currency: "VND" }}
                step={step}
                minValue={minValue}
                maxValue={maxValue}
                value={value}
                onChange={handleSliderChange}
                size="sm"
                showTooltip={true}
            ></Slider>

            <div className="flex gap-4">
                <Input
                    variant="bordered"
                    label="Giá tối thiểu"
                    defaultValue={minValue}
                    value={minValueInput}
                    onChange={handleMinValueInputChange}
                    isInvalid={minValueInput > maxValueInput}
                    errorMessage="Giá tối thiểu phải nhỏ hơn giá tối đa"
                    endContent="VND"
                ></Input>

                <Input
                    variant="bordered"
                    label="Giá tối đa"
                    defaultValue={maxValue}
                    value={maxValueInput}
                    onChange={handleMaxValueInputChange}
                    isInvalid={minValueInput > maxValueInput}
                    errorMessage="Giá tối đa phải nhỏ hơn giá tối thiểu"
                    endContent="VND"
                ></Input>
            </div>
        </div>
    );
}
