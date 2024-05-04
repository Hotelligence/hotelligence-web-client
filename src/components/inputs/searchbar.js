'use client'
import React from "react";
import { Input } from "@nextui-org/react"
import {Autocomplete, AutocompleteItem, Avatar, Button} from "@nextui-org/react";

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

            <Autocomplete label={label}
                placeholder={placeholder}
                variant="bordered"
                selectorIcon={icon}
                disableSelectorIconRotation="true"
            >

            </Autocomplete>
        </div>
    )
}
