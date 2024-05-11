'use client'
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import ButtonOutline from "../buttons/buttonOutline"
import CustomButton from "../buttons/button";

export default function CancelBookingModal() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <ButtonOutline onPress={onOpen}>Hủy đặt phòng</ButtonOutline>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex justify-center mt-[1rem]"><h4>Xác nhận Hủy phòng?</h4></ModalHeader>

                            <ModalBody>
                                <h6 className="text-center">Quý khách chắn chắn muốn hủy phòng?</h6>
                                <text className="body3 text-center">Bằng việc bấm “Đồng ý”, Quý khách xác nhận cho phép hệ thống hủy đặt phòng của quý khách, các khoản đã thanh toán có thể không được hoàn nếu đã quá thời hạn trong điều khoản </text>
                            </ModalBody>
                            
                            <ModalFooter className="flex justify-between w-2/3 mx-auto mb-4">
                                <ButtonOutline onPress={onClose}>Thoát</ButtonOutline>
                                <CustomButton>Đồng ý</CustomButton>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}