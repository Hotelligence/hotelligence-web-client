import Image from "next/image";
import styles from "./page.module.css";
import Searchbar from "../components/inputs/searchbar";
import CustomButton from "../components/buttons/button";
import RecentSearchCard from "../components/cards/recentsearchCard";
import CityCard from "../components/cards/cityCard";
import HotelCard from "../components/cards/hotelCard";
import vt from "../images/vt.jpg"
import fusion from "../images/fusion.jpg"
import DatePicker from "../components/inputs/datepicker";
import PopOver from "../components/inputs/popover";
import { Calendar, MapPin, User } from "lucide-react"

export default function Home() {
  return (
    <main>
      <h1 className={styles.heading1}>Bạn muốn đi đâu?</h1>
      <div className={styles.searchContainer}>
        <Searchbar icon={<MapPin size={20} color="var(--primary-blue-50)"/>} label="Tìm địa điểm, khách sạn, v.v." placeholder="Vũng Tàu"/>
        {/* <Searchbar icon={<Calendar/>} label="Chọn ngày"/> */}
        <DatePicker/>
        <PopOver icon={<User size={20} color="var(--primary-blue-50)"/>} label="Chọn số lượng khách"/>
        <CustomButton>Tìm</CustomButton>
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
        <HotelCard img={fusion}/>
        <HotelCard img={fusion}/>
        <HotelCard img={fusion}/>
        <HotelCard img={fusion}/>
        <HotelCard img={fusion}/>
        <HotelCard img={fusion}/>
        <HotelCard img={fusion}/>
        <HotelCard img={fusion}/>
      </div>
    
    </main>
  );
}
