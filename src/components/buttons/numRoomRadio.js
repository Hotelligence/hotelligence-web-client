'use client'
import { RadioGroup } from "@heroui/react";
import React from 'react';
import { CustomRoomRadio } from './customRoomRadio';

export default function NumRoomRadio() {
    const [selected, setSelected] = React.useState("all");
  
    return (
        <RadioGroup
          orientation="horizontal"
          value={selected}
          onValueChange={setSelected}
        >
          <CustomRoomRadio value="all">Tất cả phòng</CustomRoomRadio>
          <CustomRoomRadio value="oneBed">1 giường</CustomRoomRadio>
          <CustomRoomRadio value="twoBeds">2 giường</CustomRoomRadio>
          <CustomRoomRadio value="moreBeds">3+ giường</CustomRoomRadio>          
        </RadioGroup>
    );
  }
  