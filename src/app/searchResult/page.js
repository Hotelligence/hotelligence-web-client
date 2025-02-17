import Searchbar from "../../components/inputs/searchbar"
import CustomButton from "../../components/buttons/button"
import DatePicker from "../../components/inputs/datepicker"
import PopOver from "../../components/inputs/popover"
import Sort from "../../components/inputs/sort"
import PriceSlider from "../../components/inputs/priceSlider"
import RadioButton from "../../components/buttons/radioButton"
import CheckBox from "../../components/buttons/starCheckbox"
import HotelCardLong from "../../components/cards/hotelCardLong"
import getSearchResult from "../../api/getSearchResult"
import getRoomsInHotel from "../../api/room/getRoomsInHotel"
import secureLocalStorage from "react-secure-storage"
import Link from "next/link"
import CustomPagination from "../../components/buttons/customPagination"

export default async function SearchResult({searchParams}) {
    const query = searchParams?.query || "";
    const from = searchParams?.from || "";
    const to = searchParams?.to || "";
    const guests = searchParams?.guests || "";
    console.log("query: ", query);
    console.log("from: ", from);
    console.log("to: ",to);
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
    const currentPage = parseInt(searchParams?.page) || 1;
    const itemsPerPage = 10;

    const keys = Object.keys(searchParams)
    const values = Object.values(searchParams)
    const paramsStr = keys.map((key, index) => `${key}=${values[index]}`).join('&');

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

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedResults = results ? results.slice(startIndex, endIndex) : [];
    const totalPages = results ? Math.ceil(results.length / itemsPerPage) : 0;

    return (
        <>
            <div className="flex justify-between mt-5 items-center gap-[1.875rem] w-full">
                <Searchbar defaultValue={query} isRequired/>
                <DatePicker 
                    defaultCheckinDate={from}
                    defaultCheckoutDate={to}
                />
                <PopOver defaultValue={guests}/>
                <CustomButton isDisabled={!searchParams.query || searchParams.query === ""} >
                    <Link href={`/searchResult?${paramsStr}`}>Tìm</Link>
                </CustomButton>
            </div>

            <div className="flex gap-[1.875rem] mt-[1.875rem]">
                <div className="w-96">
                    <h3>Lọc theo</h3>

                    <div className="flex flex-col gap-[1.875rem]">
                        <div className="flex mt-[1.875rem]">
                            <PriceSlider minValue={100000} maxValue={20000000} defaultMinValue={100000} defaultMaxValue={10000000} step={10000}/>
                        </div>

                        <RadioButton/>
                        <CheckBox/>
                    </div>
                </div>

                <div className="flex flex-col w-[calc(100%-26rem)]">
                    <div className="flex justify-between items-center">
                        {results && results.length > 0 && 
                            <h5>{results.length} kết quả trả về cho tìm kiếm <span className="text-[var(--primary-gold-120)]">{query}</span> của bạn</h5>
                        }
                        {(!results || results.length === 0) && 
                            <h5>0 kết quả trả về cho tìm kiếm <span className="text-[var(--primary-gold-120)]">{query}</span> của bạn</h5>
                        }
                        <div className="flex justify-end w-[21.875rem]">
                            <Sort />
                        </div>                    
                    </div>
                    
                    {paginatedResults && paginatedResults.length > 0 &&
                     paginatedResults.map((hotel) => (
                        <div className="flex flex-col mt-5 justify-between" key={hotel.id}>
                            <HotelCardLong 
                                key={hotel.id}
                                id={hotel.id}
                                img={hotel.images && hotel.images.length > 0 ? hotel.images[0] : ""}
                                hotelName={hotel.hotelName}
                                city={hotel.city}
                                star={hotel.star}
                                reviewCount={hotel.reviewCount}
                                roomLowestOriginPrice={hotel.roomLowestOriginPrice}
                                roomLowestDiscountPercentage={hotel.roomLowestDiscountPercentage}
                                roomLowestDiscountedPrice={hotel.roomLowestDiscountedPrice}
                                roomLowestTotalPrice={hotel.roomLowestTotalPrice}
                                reviewAverageOverallPoint={hotel.reviewAverageOverallPoint}
                                from={searchParams.from}
                                to={searchParams.to}
                            />
                        </div>
                    ))}

                    <div className="mt-4 justify-items-end">
                        <CustomPagination 
                            totalPages={totalPages}
                            currentPage={currentPage}
                            paramsStr={paramsStr}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}