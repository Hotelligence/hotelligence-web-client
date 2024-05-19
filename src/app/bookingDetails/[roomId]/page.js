import BackButton from "../../../components/buttons/backButton";
import styles from "./bookingDetails.module.css";
import BookingForm from "../../../components/views/bookingForm";
import { Input, RadioGroup, Radio } from "@nextui-org/react";
import Image from "next/image";
import VisaLogo from "../../../images/Visa_Logo.png"
import MasterCardLogo from "../../../images/MasterCard_Logo.png"
import MomoLogo from "../../../images/Momo_Logo.png"
import VNPayLogo from "../../../images/VNPay_Logo.png"
import CustomButton from "../../../components/buttons/button";
import Receipt from "../../../components/views/receipt";
import CancelPolicy from "../../../components/views/cancelPolicy";

export default async function BookingDetails({ params }) {

    

    const response = await fetch('http://localhost:8080/api/rooms/getAll', {
        method: "GET"   
    });
    const rooms = await response.json();
    const roomDetails = rooms.find(r => r.id === params.roomId);  

    const res = await fetch('http://localhost:8080/api/hotels/getAll', {
        method: "GET"   
    });
    const hotels = await res.json();
    const hotelDetails = hotels.find(h => h.id === roomDetails.hotelId);

    return (
        <>
            <BackButton label="Xem tất cả phòng"/>

            <h2 className="mt-[1.875rem]">Chi tiết đặt phòng</h2>

            <div className={styles.pageContainer}>
                <div className={styles.forms}>            
                    <BookingForm step={1} title="Thông tin cá nhân">
                        <p className="body4 text-justify">Vui lòng cho chúng tôi biết tên khách sẽ lưu trú tại phòng này chính xác như trên giấy tờ tùy thân sẽ sử dụng khi nhận phòng. Vui lòng nhập đầy đủ nếu khách mang họ kép (như Nguyễn Phước, Tôn Nữ, Lê Đoàn, v.v.).</p>

                        <div className="flex flex-col gap-[1.25rem] w-[45%]">
                            <Input label="Họ và tên" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isClearable isRequired/>
                            <Input label="Email" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isClearable isRequired/>
                            <Input label="Số điện thoại" labelPlacement="outside" variant="bordered" placeholder=" " size="lg" isClearable isRequired/>
                        </div>
                    </BookingForm>

                    <BookingForm step={2} title="Kiểm tra thông tin phòng">
                        <h5>◆ &nbsp; {roomDetails.roomName}</h5>
                        <h6 className="text-[var(--secondary-green-100)]">✓ Bao gồm bữa sáng cho 2 người</h6>
                    </BookingForm>

                    <BookingForm step={3} title="Phương thức thanh toán">
                        <RadioGroup defaultValue="offline">
                            <Radio value="offline"><h6>Thanh toán tại khách sạn</h6></Radio>
                            <Radio value="online"><h6>Thanh toán trực tuyến</h6></Radio>
                        </RadioGroup>

                        <div className="mt-[-0.5rem] pl-[1.75rem]">
                            <text className="body3 opacity-80">Chấp nhận thanh toán thông qua các thẻ tín dụng và ví điện tử hiện hành:</text>
                            <div className="flex flex-row gap-[1rem] mt-[0.5rem]">
                                <Image src={VisaLogo}/>
                                <Image src={MasterCardLogo}/>
                                <Image src={MomoLogo}/>
                                <Image src={VNPayLogo}/>
                            </div>
                        </div>

                        <hr/>

                        <p className="body3 text-justify opacity-80">Để đảm bảo quyền lợi giữa Quý khách và khách sạn, chúng tôi yêu cầu thêm thông tin về thẻ tín dụng. Chúng tôi cam kết sử dụng phương thức truyền tải an toàn để bảo vệ thông tin cá nhân của Quý khách.</p>
                        <div className="flex flex-row justify-between gap-[1rem]">
                            <Input label="Số thẻ" labelPlacement="outside" variant="bordered" placeholder="XXXX XXXX XXXX XXXX" size="lg" isClearable isRequired/>
                            <Input label="Ngày hết hạn" labelPlacement="outside" variant="bordered" placeholder="MM/YY" size="lg" isClearable isRequired/>
                            <Input label="Mã số CVV" labelPlacement="outside" variant="bordered" placeholder="XXX" size="lg" isClearable isRequired/>
                        </div>
                    </BookingForm>

                    <p className="body3 text-justify">Bằng việc bấm "Đặt phòng", chúng tôi mặc định Quý khách xác nhận đã đọc và đồng ý Điều khoản & Điều kiện, Chính sách bảo mật và Hướng dẫn du lịch của chính phủ của Hotelligence.</p>

                    <div className="flex justify-end">
                        <CustomButton>Đặt phòng</CustomButton>
                    </div>
                </div>

                <div className={styles.receipt}>
                    <Receipt 
                        hotelName={hotelDetails.hotelName} 
                        roomName={roomDetails.roomName}
                        originPrice={roomDetails.oldPrice}
                        taxPercentage={roomDetails.taxPercentage}
                        tax={roomDetails.oldPrice}
                        extraFee={roomDetails.oldPrice}
                        totalPrice={roomDetails.newPrice}/>
                    <CancelPolicy/>
                </div>
            </div>
        </>
    )
}