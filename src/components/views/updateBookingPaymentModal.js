'use client'
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@heroui/react";
import ButtonOutline from "../buttons/buttonOutline"
import CustomButton from "../buttons/button";

export default function UpdateBookingPaymentModal({action, bookingId, bookingIdName}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <CustomButton onPress={onOpen}>Cập nhật thanh toán</CustomButton>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
                <ModalContent>
                    {(onClose) => (
                        <form action={action}>
                        
                            <ModalHeader className="flex justify-center mt-[1rem]"><h4>Xác nhận Đã thanh toán?</h4></ModalHeader>

                            <ModalBody>
                                <input type="hidden" name={bookingIdName} value={bookingId}/>
                                <h6 className="text-center">Xác nhận đã thanh toán cho đơn đặt phòng #{bookingId}?</h6>                                
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