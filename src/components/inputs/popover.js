'use client'
import React, { useState, useEffect } from "react"
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import styles from "./popover.module.css"
import { User } from "lucide-react"
import { useSearchParams, usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

export default function PopOver() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (number) => {
        const params = new URLSearchParams(searchParams);

        if (number > 1)
            params.set("guests", number);
        else
            params.delete("guests");

        replace(`${pathname}?${params.toString()}`);
    };

    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [totalGuests, setTotalGuests] = useState(searchParams.get("guests"));

    useEffect(() => {
        const newTotalGuests = adultCount + childCount;
        setTotalGuests(newTotalGuests.toString());
        handleSearch(newTotalGuests);
    }, [adultCount, childCount]);
    

    const handleAdultIncrement = () => {
        setAdultCount(adultCount + 1);
    };

    const handleAdultDecrement = () => {
        if (adultCount > 1) {
            setAdultCount(adultCount - 1);
        }
    };

    const handleChildIncrement = () => {
        setChildCount(childCount + 1);
    };

    const handleChildDecrement = () => {
        if (childCount > 0) {
            setChildCount(childCount - 1);
        }
    };


    return (
        <>
            <Popover placement="bottom-start" offset={20} >
                <PopoverTrigger className="flex w-full">
                    <Input 
                        label="Chọn số lượng khách"                       
                        endContent={<User size={20} color="var(--primary-blue-50)"/>}
                        variant="bordered"
                        value={`${totalGuests} khách`}
                        onValueChange={setTotalGuests}
                        onChange={(e) => handleSearch(e.target.value) }
                        classNames={{input: ["text: text-left"]}}
                    />
                </PopoverTrigger>

                <PopoverContent>
                    <div className={styles.popoverContainer}>
                        <div className={styles.row}>
                            <div className={styles.txt}>
                                <h6>Người lớn</h6>
                            </div> 

                            <div className={styles.btnContainer}>
                                <Button 
                                    radius="full"
                                    isIconOnly
                                    variant="bordered"
                                    onClick={handleAdultDecrement}
                                    isDisabled={adultCount === 1}>
                                    -
                                </Button>
                                <span>{adultCount}</span>
                                <Button 
                                    radius="full"
                                    isIconOnly 
                                    variant="bordered"
                                    onClick={handleAdultIncrement}
                                    isDisabled={totalGuests >= 10}>
                                    +
                                </Button>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.txt}>
                                <h6>Trẻ em (dưới 12 tuổi)</h6>
                            </div> 

                            <div className={styles.btnContainer}>
                                <Button 
                                    radius="full"
                                    isIconOnly
                                    variant="bordered"
                                    onClick={handleChildDecrement}
                                    isDisabled={childCount === 0}>
                                    -
                                </Button>
                                <span>{childCount}</span>
                                <Button 
                                    radius="full"
                                    isIconOnly 
                                    variant="bordered"
                                    onClick={handleChildIncrement}
                                    isDisabled={totalGuests >= 10 || childCount >= 5}>
                                    +
                                </Button>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
}
