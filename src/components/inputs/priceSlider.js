'use client'
import React from "react"
import { Slider, Input } from "@nextui-org/react"

export default function PriceSlider({ minValue, maxValue, defaultMinValue, defaultMaxValue, step }) {
    const [value, setValue] = React.useState([defaultMinValue, defaultMaxValue]);

    const [minValueInput, setMinValueInput] = React.useState(minValue);
    const [maxValueInput, setMaxValueInput] = React.useState(maxValue);

    const handleSliderChange = (newValue) => {
        setValue(newValue);
        setMinValueInput(newValue[0]);
        setMaxValueInput(newValue[1]);
    };

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
    }
    

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
