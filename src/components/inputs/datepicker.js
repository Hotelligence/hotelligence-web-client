'use client'
import React from "react";
import { DateRangePicker } from "@nextui-org/react";
import { getLocalTimeZone, today, parseDate} from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";


export default function DatePicker() {
    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [value, setValue] = useState({
        start: searchParams.get("from") ? parseDate(searchParams.get("from")) : today(getLocalTimeZone()) || "",
        end: searchParams.get("to") ? parseDate(searchParams.get("to")) : today(getLocalTimeZone()).add({days: 1}) || "",
    });

    console.log(searchParams.get("from"));
    console.log(searchParams.get("to"));
    
    const handleSearch = (value) => {
        const params = new URLSearchParams(searchParams);
        
        if (value.start && value.end) {
            params.set("from", value.start);
            params.set("to", value.end);
        }
        else {
            params.delete("from");
            params.delete("to");
        }
        
        replace(`${pathname}?${params.toString()}`);
    }
    
    useEffect(() => {
        setValue({
            start: searchParams.get("from") ? parseDate(searchParams.get("from")) : today(getLocalTimeZone()),
            end: searchParams.get("to") ? parseDate(searchParams.get("to")) : today(getLocalTimeZone()).add({days: 1}),
        });
    }, [searchParams]);
    
    return (
        <div className="flex w-full">
            <I18nProvider locale="vi-VI">
                <DateRangePicker 
                    label="Chọn ngày"
                    variant="bordered"
                    visibleMonths={2}
                    pageBehavior="single"
                    minValue={today(getLocalTimeZone())}
                    value={value}
                    onChange={(newValue) => {
                        
                        handleSearch(newValue);
                    }}
                />
            </I18nProvider>
        </div>
    )
}
