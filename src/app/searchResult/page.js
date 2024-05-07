import Searchbar from "../../components/inputs/searchbar"
import CustomButton from "../../components/buttons/button"
import DatePicker from "../../components/inputs/datepicker"
import PopOver from "../../components/inputs/popover"
import { MapPin, Radio, User } from "lucide-react"
import styleHome from "../page.module.css"
import styles from "./searchResult.module.css"
import Sort from "../../components/inputs/sort"
import PriceSlider from "../../components/inputs/priceSlider"
import RadioButton from "../../components/buttons/radioButton"
import CheckBox from "../../components/buttons/starCheckbox"
import HotelCardLong from "../../components/cards/hotelCardLong"
import vt from "../../images/vt.jpg"

export default function SearchResult() {
    return (
        <>
            <div className={styleHome.searchContainer}>
                <Searchbar icon={<MapPin size={20} color="var(--primary-blue-50)"/>} label="Tìm địa điểm, khách sạn, v.v." placeholder="Vũng Tàu"/>
                <DatePicker/>
                <PopOver icon={<User size={20} color="var(--primary-blue-50)"/>} label="Chọn số lượng khách"/>
                <CustomButton>Tìm</CustomButton>
            </div>

            <div className={styles.pageContainer}>
                <div className={styles.leftSide}>
                    <h3>Lọc theo</h3>

                    <div className={styles.filterOptions}>
                        <div className={styles.nightlyPrice}>
                            <PriceSlider minValue={100000} maxValue={20000000} defaultMinValue={100000} defaultMaxValue={10000000} step={10000}/>
                        </div>

                        <RadioButton/>
                        <CheckBox/>
                    </div>
                </div>

                <div className={styles.rightSide}>
                    <div className={styles.topHeading}>
                        <h5>123 kết quả trả về cho tìm kiếm của bạn</h5>
                        <div className={styles.sort}>
                            <Sort/>
                        </div>                    
                    </div>

                    <div className={styles.cardContainer}>
                        <HotelCardLong 
                            img={vt} 
                            hotelName="Fusion Suites Vũng Tàu"
                            city="Vũng Tàu"
                            stars="4"/>
                    </div>

                </div>

            </div>
        </>
    )
}