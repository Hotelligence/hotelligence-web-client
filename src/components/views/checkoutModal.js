'use client'
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@heroui/react";
import ButtonOutline from "../buttons/buttonOutline"
import CustomButton from "../buttons/button";

export default function CheckoutModal({action, bookingId, bookingIdName}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <CustomButton onPress={onOpen}>Trả phòng</CustomButton>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
                <ModalContent>
                    {(onClose) => (
                        <form action={action}>
                        
                            <ModalHeader className="flex justify-center mt-[1rem]"><h4>Xác nhận Trả phòng?</h4></ModalHeader>

                            <ModalBody>
                                <input type="hidden" name={bookingIdName} value={bookingId}/>
                                <h6 className="text-center">Xác nhận trả phòng cho đơn đặt phòng #{bookingId}?</h6>                                
                            </ModalBody>
                            
                            <ModalFooter className="flex justify-between w-2/3 mx-auto mb-4">
                                <ButtonOutline onPress={onClose}>Thoát</ButtonOutline>
                                <CustomButton type="submit" onPress={onClose}>Đồng ý</CustomButton>
                            </ModalFooter>
                    
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}