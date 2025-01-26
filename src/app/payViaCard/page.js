import { ArrowLeft } from "lucide-react";
import { Button } from "@heroui/react";
import CustomButton from '../../components/buttons/button';
import ButtonOutline from '../../components/buttons/buttonOutline';

export default function PayViaCard() {
    return (
        <>
            <div className="flex items-center mb-[0.94rem]">
                <Button className="flex justify-start mr-auto" isIconOnly color="transparent" disableAnimation="true">
                    <ArrowLeft size={24}/>
                </Button>
                <h2 className="flex text-center justify-center items-center mr-auto pr-10">Thanh toán bằng Thẻ tín dụng</h2>
            </div>

            <div className="flex flex-col mt-5 w-1/3 items-center mx-auto gap-5">
                <h6 className='text-center'>Quý khách chắc chắn bằng việc thanh toán bằng thẻ tín dụng?</h6>

                <p className='body3 text-center'>Bằng việc bấm "Đồng ý", số tiền thanh toán của Quý khách sẽ được thanh toán trực tiếp thông qua thẻ tín dụng Quý khách đã nhập trước đó.</p>

                <div className='mt-[1.25rem]'>
                    <CustomButton href="/paymentStatus">Đồng ý</CustomButton>
                </div>

                <ButtonOutline>Quay về Trang chủ</ButtonOutline>
            </div>            
        </>
    )
}