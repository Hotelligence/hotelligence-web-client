'use client'
import { Checkbox, CheckboxGroup } from "@heroui/react";
import React, {useState, useEffect} from "react"
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function StarCheckBox() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleStar = (values) => {
        const params = new URLSearchParams(searchParams.toString());
        
        const selectedStars = values
            .map(val => options.find(opt => opt.key === val)?.stars)
            .filter(Boolean)
            .sort();

        if (selectedStars.length > 0) {
            params.set("stars", selectedStars.join(','));
        } else {
            params.delete("stars");
        }

        replace(`${pathname}?${params.toString()}`);
    }

    const options = [
        { "key": "oneStar", "stars": "1", "label": "1★" },
        { "key": "twoStar", "stars": "2", "label": "2★" },
        { "key": "threeStar", "stars": "3", "label": "3★" },
        { "key": "fourStar", "stars": "4", "label": "4★" },
        { "key": "fiveStar", "stars": "5", "label": "5★" }
    ]

    const [selectedValues, setSelectedValues] = useState([]);
    
    useEffect(() => {
        const stars = searchParams.get("stars");
        if (!stars) {
            setSelectedValues([]);
            return;
        }
        
        const starArray = stars.split(',');
        const currentOptions = options
            .filter(opt => starArray.includes(opt.stars))
            .map(opt => opt.key);
        
        setSelectedValues(currentOptions);
    }, [searchParams]);

    return (
        <CheckboxGroup 
            label={<h5 className="text-[#1F2C3F]">Xếp hạng Sao</h5>}
            value={selectedValues}
            onChange={(values) => {
                setSelectedValues(values);
                handleStar(values);
            }}
        >
            {options.map((option) => (
                <Checkbox 
                    key={option.key} 
                    value={option.key}
                >
                    {option.label}
                </Checkbox>
            ))}       
        </CheckboxGroup>
    )
}