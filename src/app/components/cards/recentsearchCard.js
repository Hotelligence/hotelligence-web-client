import styles from "./recentsearchCard.module.css";
import { Building } from "lucide-react";

export default function recentsearchSearchCard({cityName}) {
    return (
        <div className={styles.recentsearchCardWrapper}>
            <div className={styles.leftSide}>
                <Building size={24} />
            </div>

            <div className={styles.rightSide}>
                <h5> Khách sạn tại {cityName}</h5>
                <text>T2, 25/03/24 - T6, 29/03/24 </text>
                <text>2 khách | 1 phòng</text>
            </div>
        </div>
    )
}
