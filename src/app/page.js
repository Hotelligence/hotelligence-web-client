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

  const keys = Object.keys(searchParams)
  const values = Object.values(searchParams)
  // Update date parameter names to match across pages
  const dateParams = searchParams.from && searchParams.to ? 
    `&from=${searchParams.from}&to=${searchParams.to}` : '';
  const paramsStr = keys.map((key, index) => `${key}=${values[index]}`).join('&') + dateParams;

  console.log("searchparam: ", Object.keys(searchParams));

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
        <CustomButton isDisabled={!searchParams.query || searchParams.query === ""} >
          <Link href={`/searchResult?${paramsStr}`}>Tìm</Link>
        </CustomButton>
      </div>

      <h2 className="mt-10 text-center mb-8">Hãy để Hotelligence dẫn lối!</h2>
      <div className="flex justify-center w-full"> 
        <iframe 
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/UJEUwEJ6gH4?si=8LxHc86Owcw8AkCq&amp;controls=0&amp;start=5&amp;autoplay=1&amp;mute=1&amp;modestbranding=1&amp;rel=0" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" 
          allowfullscreen
        ></iframe>
      </div>
      
      {/* <h2 className={styles.heading2}>Tìm kiếm gần đây</h2>
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
      </div> */}
    
    </main>
  );
}
