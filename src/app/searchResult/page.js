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

async function getSearchQuery(query) {
    const response = await fetch(`http://localhost:8080/api/hotels/searchResult?query=${query}`, {
        method: "GET"
    });

    return response.json();
}

export default async function SearchResult({searchParams}) {
    const query = searchParams?.query || "";

    const results = await getSearchQuery(query);

    

    return (
        <>
            <div className={styleHome.searchContainer}>
                <Searchbar />
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
                        {(query) && <h5>{results.length} kết quả trả về cho tìm kiếm <span className="text-[var(--primary-gold-120)]">{query}</span> của bạn</h5>}
                        {(!query) && <h5>0 kết quả trả về cho tìm kiếm <span className="text-[var(--primary-gold-120)]">{query}</span> của bạn</h5>}
                        <div className={styles.sort}>
                            <Sort />
                        </div>                    
                    </div>
                    
                    {(query) &&
                     results.map((hotel) => (
                        <div className={styles.cardContainer} key={hotel.id}>
                            <HotelCardLong 
                                key={hotel.id}
                                id={hotel.id}
                                img={hotel.image}
                                hotelName={hotel.hotelName}
                                city={hotel.city}
                                ratingScore={hotel.ratingScore}
                                stars={hotel.star}
                                numOfReviews={hotel.numOfReviews}
                                discount={hotel.discount}
                                oldPrice={hotel.oldPrice}
                                newPrice={hotel.newPrice}
                                totalPrice={hotel.totalPrice}
                                />
                        </div>
                    ))}

                </div>

            </div>
        </>
    )
}