'use client'
import React from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Slider, Textarea} from "@nextui-org/react";
import CustomButton from "../buttons/button";
import ButtonOutlineGold from "../buttons/buttonOutlineGold"

export default function ReviewModal({
    action,
    cleanPointName, servicePointName, staffPointName, facilityPointName, ecoPointName, commentName,
    roomId, roomIdName,
    bookingId, bookingIdName
    }) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    // const { isOpen, onOpen, onClose, onOpenChange } = useSSRDisclosure();


    const [cleanPoint, setCleanPoint] = React.useState(5);
    const [servicePoint, setServicePoint] = React.useState(5);
    const [staffPoint, setStaffPoint] = React.useState(5);
    const [facilityPoint, setFacilityPoint] = React.useState(5);
    const [ecoPoint, setEcoPoint] = React.useState(5);
    const [comment, setComment] = React.useState('');

    
    return (
        <>
            <ButtonOutlineGold onPress={onOpen}>Đánh giá</ButtonOutlineGold>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => <form action={action}>
                        <ModalHeader className="flex justify-center mt-[1rem]"><h4>Đánh giá phòng</h4></ModalHeader>

                        <ModalBody>
                            <input type="hidden" name={roomIdName} value={roomId}/>
                            <input type="hidden" name={bookingIdName} value={bookingId}/>

                            <Slider label="Sạch sẽ" step={1} showSteps={true} minValue={1} maxValue={10} value={cleanPoint} onChange={setCleanPoint} getValue={(cleanPoint) => `${cleanPoint}/10`}
                                name={cleanPointName}/>
                            <Slider label="Tiện nghi và dịch vụ" step={1} showSteps={true} minValue={1} maxValue={10} value={servicePoint} onChange={setServicePoint} getValue={(servicePoint) => `${servicePoint}/10`}
                                name={servicePointName}/>
                            <Slider label="Nhân viên" step={1} showSteps={true} minValue={1} maxValue={10} value={staffPoint} onChange={setStaffPoint} getValue={(staffPoint) => `${staffPoint}/10`}
                                name={staffPointName}/>
                            <Slider label="Cơ sở vật chất" step={1} showSteps={true} minValue={1} maxValue={10} value={facilityPoint} onChange={setFacilityPoint} getValue={(facilityPoint) => `${facilityPoint}/10`}
                                name={facilityPointName}/>
                            <Slider label="Thân thiện với môi trường" step={1} showSteps={true} minValue={1} maxValue={10} value={ecoPoint} onChange={setEcoPoint} getValue={(ecoPoint) => `${ecoPoint}/10`}
                                name={ecoPointName}/>
                            <Textarea label="Bình luận" labelPlacement="outside" variant="bordered" size="lg"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                name={commentName}/>
                        </ModalBody>
                        
                        <ModalFooter className="flex justify-center mb-4">
                            <CustomButton type="submit" onPress={onClose}>Gửi đánh giá</CustomButton>
                        </ModalFooter>
                    </form>}
                </ModalContent>
            </Modal>
        </>
    )
}