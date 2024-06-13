'use client'
import styles from "./loginOrSignUp.module.css";
import googleLogo from "../../images/google_logo.png";
import { Button, Input } from "@nextui-org/react";
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
            <h2 className={styles.title}>Đăng nhập hoặc đăng ký</h2>
            <div className={styles.fieldsContainer}>

                <div className={styles.buttonContainer}>
                    <div className={styles.buttonWrapper}>
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

                {/* <div className={styles.or}>
                    <h5>hoặc</h5>
                </div>
                
                <div className={styles.buttonContainer}>
                    <div className={styles.buttonWrapper}>
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

                <div className={styles.buttonContainer}>
                    <div className={styles.buttonWrapper2}>
                        <Button color="transparent" disableAnimation="true" size="sm">
                            <text className="body4" style={{textDecoration: 'underline'}}>Quên mật khẩu?</text>
                        </Button>
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <CustomButton onPress={handleSubmit}>Tiếp tục</CustomButton>
                </div> */}

                <div className={styles.buttonContainer}>
                    <div className="body4">
                        <p className={styles.txtWrapper}>
                        Bằng việc tiếp tục, Quý khách đã đọc và đồng ý với Điều khoản & Điều kiện, Tuyên bố bảo mật của Hotelligence.
                        </p>
                    </div>
                </div>
            </div>            
        </>
    );
}