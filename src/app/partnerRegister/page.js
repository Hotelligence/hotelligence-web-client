import CustomButton from '../../components/buttons/button'
import styles from './partnerRegister.module.css'
import Link from 'next/link'
import ButtonOutline from '../../components/buttons/buttonOutline'
import { auth } from '@clerk/nextjs/server';
import PartnerRegisterForm from '../../components/forms/partnerRegisterForm'

export default function PartnerRegister() {
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
    }

    // await

    return (
        <div className={styles.pageContainer}>
            <h2>Đăng ký trở thành Đối tác</h2>
            { userId ? (
            <>
                <h6 className='text-center'>
                    Quý khách vui lòng Đăng nhập hoặc Đăng ký để có thể <br />
                    Đăng ký trở thành đối tác của Hotelligence!
                </h6>

                <div className='flex mt-[1.25rem] gap-[2.5rem]'>
                    <CustomButton><Link href="/loginOrSignUp">Đăng ký</Link></CustomButton>
                    <CustomButton><Link href="/loginOrSignUp">Đăng nhập</Link></CustomButton>
                </div>

                <div className='mt-[1.25rem]'>
                    <ButtonOutline><Link href="/">Quay về trang chủ</Link></ButtonOutline>
                </div>
            </>
            ) : (
                <>
                    <PartnerRegisterForm />
                    <CustomButton type="submit">Xác nhận</CustomButton>
                </>
            ) }
        </div>
    )
}
