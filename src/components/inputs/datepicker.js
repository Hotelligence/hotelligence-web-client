'use client'
import React from "react";
import {DateRangePicker} from "@nextui-org/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import {I18nProvider} from "@react-aria/i18n";


export default function DatePicker() {
    return (
        <div className="flex w-full">
            <I18nProvider locale="vi-VI">
                <DateRangePicker 
                    label="Chọn ngày"
                    variant="bordered"
                    visibleMonths={2}
                    pageBehavior="single"
                    minValue={today(getLocalTimeZone())}
                    defaultValue={{
                        start: today(getLocalTimeZone()),
                        end: today(getLocalTimeZone()).add({days: 1}),
                    }}
                    
                />
            </I18nProvider>
        </div>
    )
}
