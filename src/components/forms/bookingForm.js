import styles from "./bookingForm.module.css";

export default function BookingForm({step, title, children}) {
    return (
        <div className={styles.formContainer}>
            <div className={styles.title}>
                <h4>Bước {step}: {title}</h4>
            </div>

            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}