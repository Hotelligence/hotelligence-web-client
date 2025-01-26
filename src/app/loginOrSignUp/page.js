'use client'
import googleLogo from "../../images/google_logo.png";
import { Button, Input } from "@heroui/react";
import Image from "next/image";
import CustomButton from "../../components/buttons/button";
import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function LoginOrSignUp() {
    const {signIn} = useSignIn();
    const {signUp, setActive} = useSignUp();
    const [email, setEmail] = useState("");
    const router = useRouter();

    if (!signIn || !signUp) return null;

    const handleSubmit = async () => {
        try {

            if (signIn.verifications.status === 'verified') {
                const signInAttempt = await signIn.create({ 
                    identifier: email, 
                    strategy: "email_code",
                });
        
                // console.log(JSON.stringify(signInAttempt, null, 2));
                await signIn.prepareFirstFactor({ 
                    strategy: "email_code",
                    email_address_id: signInAttempt.verifications.email_address.id,
                });
                router.push("/loginByOTP");

                return;
            }
            else{
            await signUp.create({
                email_address: email,
            });
            
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            
            router.push("/signupByOTP");}
        } catch (error) {
            console.log(JSON.stringify(error, null, 2));
        }
    };

    const signInWithGoogle = () => {
        return signIn.authenticateWithRedirect({
            strategy: 'oauth_google',
            redirectUrl: '/sso-callback',
            redirectUrlComplete: '/',
        })
    };

    const handleSignInUpWithGoogle = async () => {
        if (!signIn || !signUp) return null;

        const userExistsButNeedsToSignIn =
            signUp.verifications.externalAccount.status === 'transferable' &&
            signUp.verifications.externalAccount.error?.code === 'external_account_exists';

        if (userExistsButNeedsToSignIn) {
            const res = await signIn.create({ transfer: true });

            if (res.status === 'complete') {
                setActive({ session: res.createdSessionId });
            }
        }

        const userNeedsToBeCreated = signIn.firstFactorVerification.status === 'transferable';

        if (userNeedsToBeCreated) {
            const res = await signUp.create({
                transfer: true,
        });

        if (res.status === 'complete') {
            setActive({ session: res.createdSessionId });
        }
        } else {
            signInWithGoogle();
        }
    }
    
    return (
        <>
            <h2 className="text-center mb-12">Đăng nhập hoặc đăng ký</h2>
            <div className="flex flex-col">
                <div className="flex justify-center">
                    <div className="w-[22.5rem] h-[3.13rem]">
                        <Button  
                            color="white" 
                            variant="bordered" 
                            fullWidth="true" 
                            size="lg"
                            onPress={handleSignInUpWithGoogle}>
                            <Image src={googleLogo} alt="Google Logo" width={24} height={24}/>
                            <h5>Đăng nhập bằng Google</h5>
                        </Button>
                    </div>
                </div>

                {/* <div className="flex justify-center text-center my-6">
                    <h5>hoặc</h5>
                </div>
                
                <div className="flex justify-center">
                    <div className="w-[22.5rem] h-[3.13rem]">
                        <Input 
                            color="white" 
                            variant="bordered" 
                            fullWidth="true" 
                            size="md" 
                            type="email"                         
                            label="Email"                            
                            isClearable="true"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        >                                
                        </Input>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="w-[22.5rem] h-[3.13rem] flex justify-end mt-2">
                        <Button color="transparent" disableAnimation="true" size="sm">
                            <p className="body4 underline">Quên mật khẩu?</p>
                        </Button>
                    </div>
                </div>

                <div className="flex justify-center">
                    <CustomButton onPress={handleSubmit}>Tiếp tục</CustomButton>
                </div> */}

                <div className="flex justify-center">
                    <div className="body4">
                        <p className="flex justify-center text-center mt-5 w-[22.5rem]">
                        Bằng việc tiếp tục, Quý khách đã đọc và đồng ý với Điều khoản & Điều kiện, Tuyên bố bảo mật của Hotelligence.
                        </p>
                    </div>
                </div>
            </div>            
        </>
    );
}