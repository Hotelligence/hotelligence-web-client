import Searchbar from "../../components/inputs/searchbar"
import CustomButton from "../../components/buttons/button"
import DatePicker from "../../components/inputs/datepicker"
import PopOver from "../../components/inputs/popover"
import styleHome from "../page.module.css"
import styles from "./searchResult.module.css"
import Sort from "../../components/inputs/sort"
import PriceSlider from "../../components/inputs/priceSlider"
import RadioButton from "../../components/buttons/radioButton"
import CheckBox from "../../components/buttons/starCheckbox"
import HotelCardLong from "../../components/cards/hotelCardLong"
import getSearchResult from "../../api/getSearchResult"
import getRoomsInHotel from "../../api/room/getRoomsInHotel"
import secureLocalStorage from "react-secure-storage"

export default async function SearchResult({searchParams}) {
    const query = searchParams?.query || "";
    console.log("query: ", query);
    const from = searchParams?.from || "";
    console.log("from: ", from);
    const to = searchParams?.to || "";
    console.log("to: ",to);
    const guests = searchParams?.guests || "";
    console.log("guests: ", guests);
    const sortBy = searchParams?.sortBy;
    console.log("sortBy: ", sortBy);
    const sortOrder = searchParams?.sortOrder;
    console.log("sortOrder: ", sortOrder);
    const minPrice = searchParams?.minPrice || "";
    console.log("minPrice: ", minPrice);
    const maxPrice = searchParams?.maxPrice || "";
    console.log("maxPrice: ", maxPrice);
    const minRatingScore = searchParams?.minRatingScore || "";
    console.log("minRatingScore: ", minRatingScore);
    const stars = searchParams?.stars || "";
    console.log("stars: ", stars);

    // Create params object excluding undefined/empty values
    const apiParams = {
        query,
        from,
        to,
        guests,
        minPrice,
        maxPrice,
        minRatingScore,
        stars
    };
    
    // Only add sort params if they exist
    if (searchParams?.sortBy && searchParams?.sortOrder) {
        apiParams.sortBy = searchParams.sortBy;
        apiParams.sortOrder = searchParams.sortOrder;
    }

    const results = await getSearchResult(
        query,
        from,
        to,
        guests,
        searchParams.sortBy || undefined,  // Pass undefined instead of empty string
        searchParams.sortOrder || undefined,
        minPrice,
        maxPrice,
        minRatingScore,
        stars
    );  
    console.log("results: ", results);

    return (
        <>
            <div className={styleHome.searchContainer}>
                <Searchbar />
                <DatePicker />
                <PopOver />
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
                        {results && results.length > 0 && 
                            <h5>{results.length} kết quả trả về cho tìm kiếm <span className="text-[var(--primary-gold-120)]">{query}</span> của bạn</h5>
                        }
                        {(!results || results.length === 0) && 
                            <h5>0 kết quả trả về cho tìm kiếm <span className="text-[var(--primary-gold-120)]">{query}</span> của bạn</h5>
                        }
                        <div className={styles.sort}>
                            <Sort />
                        </div>                    
                    </div>
                    
                    {results && results.length > 0 &&
                     results.map((hotel) => (
                        <div className={styles.cardContainer} key={hotel.id}>
                            <HotelCardLong 
                                key={hotel.id}
                                id={hotel.id}
                                img={hotel.images && hotel.images.length > 0 ? hotel.images[0] : ""}
                                hotelName={hotel.hotelName}
                                city={hotel.city}
                                ratingScore={hotel.ratingScore}
                                stars={hotel.star}
                                numOfReviews={hotel.numOfReviews}
                                originPrice={hotel.originPrice}
                                discount={hotel.discount}
                                discountPrice={hotel.discountPrice}
                                totalPrice={hotel.totalPrice}
                                />
                        </div>
                    ))}

                </div>

            </div>
        </>
    )
}