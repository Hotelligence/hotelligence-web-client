'use client'
import React from "react";
import { Input } from "@nextui-org/react"
import {Autocomplete, AutocompleteItem, Avatar, Button} from "@nextui-org/react";
import { MapPin} from "lucide-react"

export default function Searchbar({label, placeholder, icon}) {
    return (
        <div className="flex w-full">
            {/* <Input 
            // labelPlacement="inside"
            // label={label}
            label={label}
            placeholder={placeholder}
            variant="bordered"
            endContent={icon}
            size="md"
            ></Input> */}

            <Autocomplete label="Tìm địa điểm, khách sạn, v.v."
                variant="bordered"
                selectorIcon={<MapPin size={20} color="var(--primary-blue-50)"/>}
                disableSelectorIconRotation="true"
            >

            </Autocomplete>
        </div>
    )
}
