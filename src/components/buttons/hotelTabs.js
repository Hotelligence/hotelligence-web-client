'use client'
import React from "react";
import { Tab, Tabs } from "@heroui/react";
import Link from "next/link";

export default function HotelTabs({href1, href2, href3, href4, href5}) {

    return (        
        <Tabs 
            variant="underlined"
            aria-label="Options"
            classNames={{
                tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-[#C09860]",
                tab: "max-w-fit px-0 h-8",
                tabContent: "group-data-[selected=true]:text-[#C09860]"
            }}      
            
            >
            <Tab title={<Link href={href1}><h5>Tổng quan</h5></Link>}/>
            <Tab title={<Link href={href2}><h5>Tiện nghi, dịch vụ</h5></Link>}/>
            <Tab title={<Link href={href3}><h5>Phòng</h5></Link>}/>
            <Tab title={<Link href={href4}><h5>Phí & Chính sách</h5></Link>}/>
            <Tab title={<Link href={href5}> <h5>Đánh giá</h5></Link> }/>
        </Tabs>
    )
}
