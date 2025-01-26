'use client'
import { useEffect, useState } from "react";
import CustomButton from "../buttons/button"
import { Textarea } from "@heroui/react";

export default function PolicyForm({title, action, hotel}) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null; // or a loading spinner
    }

    return (
        <div className="flex flex-col w-full bg-white rounded-[0.625rem] border border-[var(--primary-blue-50)]">
            <div className="flex justify-between items-center bg-[var(--primary-blue-100)] text-[var(--primary-gold-100)] px-5 py-[1.06rem] w-full rounded-t-[0.625rem]">
                <h4>{title}</h4>
            </div>

            <div className="p-5 flex flex-col items-start gap-5">
                <form action={action}>
                    <div className="grid grid-cols-2 gap-x-[3.125rem] gap-y-[1.875rem] w-max mb-[2.5rem]" >
                        <Textarea 
                            defaultValue={hotel?.optionalFees || ""}
                            className="w-[28rem]"  
                            label="Phí tùy chọn" 
                            labelPlacement="outside" 
                            variant="bordered" 
                            placeholder=" " 
                            size="lg" 
                            name="optionalFees"
                            classNames={{
                                label: "text-base"
                            }}
                        />
                        <Textarea 
                            defaultValue={hotel?.amenities || ""}
                            className="w-[28rem]"  
                            label="Hồ bơi, Spa & Gym (nếu có)" 
                            labelPlacement="outside" 
                            variant="bordered" 
                            placeholder=" " 
                            size="lg" 
                            name="amenities"
                            classNames={{
                                label: "text-base"
                            }}
                        />
                        <Textarea 
                            defaultValue={hotel?.policies || ""}
                            className="w-[28rem]"  
                            label="Chính sách" 
                            labelPlacement="outside" 
                            variant="bordered" 
                            placeholder=" " 
                            size="lg" 
                            name="policies"
                            classNames={{
                                label: "text-base"
                            }}
                        />
                        <Textarea 
                            defaultValue={hotel?.otherNames || ""}
                            className="w-[28rem]"  
                            label="Tên khác" 
                            labelPlacement="outside" 
                            variant="bordered" 
                            placeholder=" " 
                            size="lg" 
                            name="otherNames"
                            classNames={{
                                label: "text-base"
                            }}
                        />
                    </div>
                    
                    <div className="flex justify-center mt-4">
                        <CustomButton type="submit">Lưu</CustomButton>
                    </div>
                </form>
            </div>
        </div>
    )
}