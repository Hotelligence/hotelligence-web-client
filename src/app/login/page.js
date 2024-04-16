import styles from "./login.module.css";
import googleLogo from "../../images/google_logo.png";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import CustomButton from "../../components/buttons/button";

export default function Login() {
    return (
        <>
            <h2 className={styles.title}>Đăng nhập hoặc Tạo tài khoản</h2>
            <div className={styles.fieldsContainer}>
                <div className={styles.buttonContainer}>
                    <div className={styles.buttonWrapper}>
                        <Button 
                            color="white" 
                            variant="bordered" 
                            fullWidth="true" 
                            size="lg">
                            <Image src={googleLogo} alt="Google Logo" width={24} height={24} />
                            <h5>Đăng nhập bằng Google</h5>
                        </Button>
                    </div>
                </div>

                <div className={styles.or}>
                    <h5>hoặc</h5>
                </div>
                
                <div className={styles.buttonContainer}>
                    <div className={styles.buttonWrapper}>
                        <Input 
                            color="white" 
                            variant="bordered" 
                            fullWidth="true" 
                            size="lg" 
                            type="email" 
                            placeholder="Email"                            
                            isClearable="true">
                            <h5>Đăng nhập bằng Google</h5>
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
                    <CustomButton>Tiếp tục</CustomButton>
                </div>

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