'use client'
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";

export default function Searchbar() {    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (term) => {
        const params = new URLSearchParams(searchParams);

        if (term)
            params.set("query", term);
        else
            params.delete("query");

        replace(`${pathname}?${params.toString()}`);
    }

    const [value, setValue] = useState(searchParams.get("query")?.toString() || "");

    return (
        <div className="flex w-full">
            <Input
                label="Tìm địa điểm, khách sạn, v.v."
                variant="bordered"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()}
                value={value}
                onValueChange={setValue}                
            >
            </Input>
        </div>
    );
}

