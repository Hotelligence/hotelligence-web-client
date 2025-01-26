'use client'
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@heroui/react";
import ButtonOutline from "../buttons/buttonOutline"
import CustomButton from "../buttons/button";
import DangerButton from "../buttons/dangerButton"

export default function DeleteRoomModal({action, roomId, roomIdName}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <DangerButton onPress={onOpen}>Xóa phòng</DangerButton>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton className="z-[100000]">
                <ModalContent className="z-[100000]">
                    {(onClose) => (
                        <form action={action}>
                        
                            <ModalHeader className="flex justify-center mt-[1rem]"><h4>Xác nhận Xoá phòng?</h4></ModalHeader>

                            <ModalBody>
                                <input type="hidden" name={roomIdName} value={roomId}/>
                                <h6 className="text-center">Quý khách chắn chắn muốn xóa phòng?</h6>
                                {/* <p className="body3 text-center">Bằng việc bấm “Đồng ý”, Quý khách xác nhận cho phép hệ thống hủy đặt phòng của quý khách, các khoản đã thanh toán có thể không được hoàn nếu đã quá thời hạn trong điều khoản </p> */}
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