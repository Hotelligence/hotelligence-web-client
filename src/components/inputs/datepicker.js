'use client';
import React, { useState, useEffect } from "react";
import { DateRangePicker } from "@nextui-org/react";
import { getLocalTimeZone, today, parseDate } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

// Helper function to format dates as YYYY-MM-DD
const formatDate = (date) => {
    const year = date.year;
    const month = String(date.month).padStart(2, '0');
    const day = String(date.day).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function DatePicker() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [value, setValue] = useState({
        start: searchParams.get("from") ? parseDate(searchParams.get("from")) : today(getLocalTimeZone()),
        end: searchParams.get("to") ? parseDate(searchParams.get("to")) : today(getLocalTimeZone()).add({ days: 1 }),
    });

    useEffect(() => {
        setValue({
            start: searchParams.get("from") ? parseDate(searchParams.get("from")) : today(getLocalTimeZone()),
            end: searchParams.get("to") ? parseDate(searchParams.get("to")) : today(getLocalTimeZone()).add({ days: 1 }),
        });
    }, [searchParams]);

    const handleSearch = (newValue) => {
        const params = new URLSearchParams(searchParams);
        if (newValue.start && newValue.end) {
            params.set("from", formatDate(newValue.start));
            params.set("to", formatDate(newValue.end));
        } else {
            params.delete("from");
            params.delete("to");
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

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
                        setValue(newValue);
                        handleSearch(newValue);
                    }}
                />
            </I18nProvider>
        </div>
    );
}
