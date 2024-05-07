'use client'
import React from "react";
import { Tab, Tabs } from "@nextui-org/react";

export default function HotelTabs({id1, id2, id3, id4, id5}) {

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
            <Tab title={<h5>Tổng quan</h5>}/>
            <Tab title={<h5>Tiện nghi, dịch vụ</h5>}/>
            <Tab title={<h5>Phòng</h5>}/>
            <Tab title={<h5>Phí & Chính sách</h5>}/>
            <Tab title={<h5>Đánh giá</h5>}/>
        </Tabs>
    )
}
