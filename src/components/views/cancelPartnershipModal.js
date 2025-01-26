'use client'
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@heroui/react";
import ButtonOutline from "../buttons/buttonOutline"
import CustomButton from "../buttons/button";
import RectangleButton2 from "../buttons/rectangleButton2";


export default function CancelPartnershipModal() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <ButtonOutline onPress={onOpen}>Hủy Đối tác</ButtonOutline>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
                <ModalContent>
                    {(onClose) => (
                        <form>
                        
                            <ModalHeader className="flex justify-center mt-[1rem]"><h4>Hủy đối tác</h4></ModalHeader>

                            <ModalBody>                                
                                <h6 className="text-center">Quý Đối tác chắn chắn muốn hủy đối tác?</h6>
                                <p className="body3 text-center">Quý Đối tác vui lòng liên hệ với bộ phận CSKH để được hỗ trợ các thủ tục Hủy đối tác</p>
                            </ModalBody>
                            
                            <ModalFooter className="flex w-full mx-auto mb-4 items-center justify-center">
                                <ButtonOutline onPress={onClose}>Thoát</ButtonOutline>                                
                            </ModalFooter>
                    
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}