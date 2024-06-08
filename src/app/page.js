import styles from "./page.module.css";
import Searchbar from "../components/inputs/searchbar";
import CustomButton from "../components/buttons/button";
import RecentSearchCard from "../components/cards/recentsearchCard";
import CityCard from "../components/cards/cityCard";
import HotelCard from "../components/cards/hotelCard";
import vt from "../images/vt.jpg"
import DatePicker from "../components/inputs/datepicker";
import PopOver from "../components/inputs/popover";
import Link from "next/link";
import getAllHotels from "../api/hotel/getAllHotels";

export default async function Home({searchParams}) {

  const query = searchParams?.query || "";

  const hotels = await getAllHotels();
  
  const sortedHotels = hotels.sort((a, b) => {
    if (a.discount === b.discount) {
      return a.discountPrice - b.discountPrice;
    }
    return b.discount - a.discount;
  });

  const top10Hotels = sortedHotels.slice(0, 10);

  return (
    <main>
      <h1 className={styles.heading1}>Bạn muốn đi đâu?</h1>
      <div className={styles.searchContainer}>
        <Searchbar isRequired/>        
        <DatePicker/>
        <PopOver/>
        <CustomButton isDisabled={query === ""}><Link href={`/searchResult?query=${query}`}>Tìm </Link></CustomButton>
      </div>

      <h2 className={styles.heading2}>Tìm kiếm gần đây</h2>
      <div className={styles.cardContainer}>
        <RecentSearchCard cityName="Hà Nội" />
        <RecentSearchCard cityName="Đà Nẵng" />
        <RecentSearchCard cityName="Hồ Chí Minh" />
        <RecentSearchCard cityName="Hà Nội" />
        <RecentSearchCard cityName="Đà Nẵng" />
        <RecentSearchCard cityName="Hồ Chí Minh" />
        <RecentSearchCard cityName="Hà Nội" />
        <RecentSearchCard cityName="Đà Nẵng" />
        <RecentSearchCard cityName="Hồ Chí Minh" />
      </div>

      <h2 className={styles.heading2}>Các địa điểm nổi bật</h2>
      <div className={styles.cardContainer}>
        <CityCard img={vt}/>
        <CityCard img={vt}/>
        <CityCard img={vt}/>
        <CityCard img={vt}/>
        <CityCard img={vt}/>
        <CityCard img={vt}/>
        <CityCard img={vt}/>
        <CityCard img={vt}/>
      </div>

      <h2 className={styles.heading2}>Ưu đãi</h2>
      <div className={styles.cardContainer}>
        {top10Hotels.map(hotel => (
          <HotelCard
            key={hotel.id}
            id={hotel.id}
            image={hotel.images && hotel.images.length > 0 ? hotel.images[0] : ""}
            ratingScore={hotel.ratingScore}
            numOfReviews={hotel.numOfReviews}
            hotelName={hotel.hotelName}
            city={hotel.city}
            originPrice={hotel.originPrice}
            discount={hotel.discount}
            discountPrice={hotel.discountPrice}
            totalPrice={hotel.totalPrice}
          />
        ))}
      </div>
    
    </main>
  );
}
