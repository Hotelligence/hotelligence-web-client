import CustomButton from '../../components/buttons/button'
import Link from 'next/link'
import ButtonOutline from '../../components/buttons/buttonOutline'
import { auth } from '@clerk/nextjs/server';
import PartnerRegisterForm from '../../components/forms/partnerRegisterForm'
import createHotel from '../../api/hotel/createHotel'
import { redirect } from 'next/navigation'

export default async function PartnerRegister() {
    const {userId} = auth();
    console.log(userId);

    async function handleRegisterHotel(formData){
        'use server'

        const hotelData = {
            createdBy: userId,
            hotelName: formData.get("hotelName"),
            country: formData.get("country"),
            province: formData.get("province"),
            city: formData.get("city"),
            district: formData.get("district"),
            address: formData.get("address"),
            postalCode: formData.get("postalCode"),
            businessType: formData.get("businessType"),
        }

        console.log(hotelData);

        await createHotel(hotelData);

        if (hotelData) {
            redirect('/partnerRegisterSuccess');
        }
    }

    return (
        <div className="flex flex-col w-1/3 mx-auto mt-7 items-center gap-5">
            <h2>Đăng ký trở thành Đối tác</h2>
            { !userId ? (
            <>
                <h6 className='text-center'>
                    Quý khách vui lòng Đăng nhập hoặc Đăng ký để có thể <br />
                    Đăng ký trở thành đối tác của Hotelligence!
                </h6>

                <div className='flex mt-5 gap-10'>
                    <CustomButton><Link href="/loginOrSignUp">Đăng ký</Link></CustomButton>
                    <CustomButton><Link href="/loginOrSignUp">Đăng nhập</Link></CustomButton>
                </div>

                <div className='mt-5'>
                    <ButtonOutline><Link href="/">Quay về trang chủ</Link></ButtonOutline>
                </div>
            </>
            ) : (
                <>
                    <PartnerRegisterForm action={handleRegisterHotel}/>
                </>
            ) }
        </div>
    )
}
