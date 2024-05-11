'use client'
import React from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Slider, Textarea} from "@nextui-org/react";
import CustomButton from "../buttons/button";
import ButtonOutlineGold from "../buttons/buttonOutlineGold"

export default function ReviewModal() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [cleanPoint, setCleanPoint] = React.useState(5);
    const [servicePoint, setServicePoint] = React.useState(5);
    const [staffPoint, setStaffPoint] = React.useState(5);
    const [facilityPoint, setFacilityPoint] = React.useState(5);
    const [ecoFriendlyPoint, setEcoFriendlyPoint] = React.useState(5);
    
    return (
        <>
            <ButtonOutlineGold onPress={onOpen}>Đánh giá</ButtonOutlineGold>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <>
                        <ModalHeader className="flex justify-center mt-[1rem]"><h4>Đánh giá phòng</h4></ModalHeader>

                        <ModalBody>
                            <Slider label="Sạch sẽ" step={1} showSteps={true} minValue={1} maxValue={10} value={cleanPoint} onChange={setCleanPoint} getValue={(cleanPoint) => `${cleanPoint}/10`}/>
                            <Slider label="Tiện nghi và dịch vụ" step={1} showSteps={true} minValue={1} maxValue={10} value={servicePoint} onChange={setServicePoint} getValue={(servicePoint) => `${servicePoint}/10`}/>
                            <Slider label="Nhân viên" step={1} showSteps={true} minValue={1} maxValue={10} value={staffPoint} onChange={setStaffPoint} getValue={(staffPoint) => `${staffPoint}/10`}/>
                            <Slider label="Cơ sở vật chất" step={1} showSteps={true} minValue={1} maxValue={10} value={facilityPoint} onChange={setFacilityPoint} getValue={(facilityPoint) => `${facilityPoint}/10`}/>
                            <Slider label="Thân thiện với môi trường" step={1} showSteps={true} minValue={1} maxValue={10} value={ecoFriendlyPoint} onChange={setEcoFriendlyPoint} getValue={(ecoFriendlyPoint) => `${ecoFriendlyPoint}/10`}/>
                            <Textarea label="Bình luận" labelPlacement="outside" variant="bordered" size="lg"/>
                        </ModalBody>
                        
                        <ModalFooter className="flex justify-center mb-4">
                            <CustomButton>Gửi đánh giá</CustomButton>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </>
    )
}