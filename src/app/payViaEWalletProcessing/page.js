import { ArrowLeft } from "lucide-react";
import { Button } from "@heroui/react";
import { CircularProgress } from "@heroui/react";

export default function PayViaEWalletProcessing() {
    return (
        <>
            <div className="flex items-center mb-3.5">
                <Button className="flex justify-start mr-auto" isIconOnly color="transparent" disableAnimation="true">
                    <ArrowLeft size={24}/>
                </Button>
                <h2 className="flex text-center justify-center items-center m-0 ml-auto pr-10">Thanh toán bằng Ví điện tử</h2>
            </div>

            <div className="flex flex-col mt-5 w-1/3 items-center mx-auto gap-5">
                <h6 className='text-center'>Yêu cầu thanh toán bằng ví điện tử của Quý khách đang được xử lý. Quý khách vui lòng thực hiện các bước thanh toán tiếp theo trên trang hướng dẫn của ví điện tử .</h6>

                <CircularProgress size="lg"/>
            </div>
        </>
    )
}