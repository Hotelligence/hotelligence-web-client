import { Checkbox, CheckboxGroup } from "@nextui-org/react";

export default function StarCheckBox() {
    return (
        <CheckboxGroup label={<h5 className="text-[#1F2C3F]">Xếp hạng Sao</h5>}>
            <Checkbox value="oneStar">1★</Checkbox>   
            <Checkbox value="twoStar">2★</Checkbox>
            <Checkbox value="threeStar">3★</Checkbox>
            <Checkbox value="fourStar">4★</Checkbox>
            <Checkbox value="fiveStar">5★</Checkbox>         
        </CheckboxGroup>
    )
}