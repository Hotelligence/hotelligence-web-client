'use client'
import React from "react"
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import styles from "./popover.module.css"
import { User } from "lucide-react"

export default function PopOver() {
    const [adultCount, setAdultCount] = React.useState(1);
    const [childCount, setChildCount] = React.useState(0);

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
                        value={`${adultCount + childCount} khách`}
                        classNames={{input: ["text-left"]}}
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
                                <text>{adultCount}</text>
                                <Button 
                                    radius="full"
                                    isIconOnly 
                                    variant="bordered"
                                    onClick={handleAdultIncrement}>
                                    +
                                </Button>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.txt}>
                                <h6>Trẻ em (dưới 13 tuổi)</h6>
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
                                <text>{childCount}</text>
                                <Button 
                                    radius="full"
                                    isIconOnly 
                                    variant="bordered"
                                    onClick={handleChildIncrement}>
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
