'use client'
import React, { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { MapPin } from "lucide-react";
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

    const [value, setValue] = React.useState(searchParams.get("query")?.toString() || "");

    const validateInput = (value) => value.match(/^[a-zA-Z\s]+$/);

    const isInvalid = React.useMemo(() => {
        if (value === "") return false;

        return validateInput(value) ? false : true;
    }, [value]);


    return (
        <div className="flex w-full">
            <Input
                label="Tìm địa điểm, khách sạn, v.v."
                variant="bordered"
                // selectorIcon={<MapPin size={20} color="var(--primary-blue-50)" />}
                // disableSelectorIconRotation={true}
                // value={query}
                onChange={(e) => { handleSearch(e.target.value);}}
                defaultValue={searchParams.get("query")?.toString()}
                isInvalid={isInvalid}
                value={value}
                onValueChange={setValue}                
            >
                {/* {provinces.map((p) => (
                    <AutocompleteItem key={p.id} textValue={p.province}>
                        {p.province}
                    </AutocompleteItem>
                ))} */}
            </Input>
        </div>
    );
}

