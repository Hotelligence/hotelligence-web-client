'use client'
import React, { useEffect, useState, useRef } from "react";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import secureLocalStorage from "react-secure-storage";

export default function Searchbar() {    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [value, setValue] = useState("");
    const debounceTimeout = useRef(null);

    const handleSearch = (term) => {
        const params = new URLSearchParams(searchParams);

        if (term)
            params.set("query", term);
        else
            params.delete("query");

        replace(`${pathname}?${params.toString()}`);
    }

    useEffect(() => {
        const query = searchParams.get("query")?.toString();
        setValue(query || "");
    }, [searchParams]);

    const handleChange = (e) => {
        const { value } = e.target;
        setValue(value);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            handleSearch(value);
        }, 300); // Adjust the delay as needed
    };

    return (
        <div className="flex w-full">
            <Input
                label="Tìm địa điểm, khách sạn, v.v."
                variant="bordered"
                onChange={handleChange}
                value={value}
                clearable
            >
            </Input>
        </div>
    );
}
