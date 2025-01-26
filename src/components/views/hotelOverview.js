import OverallRatingScore from "../../components/views/overallRatingScore"
import { MapPin } from 'lucide-react'
import ViewAllButton from '../../components/buttons/viewAllButton'

export default function HotelOverview({hotelName, stars, address, city, district, province, description, reviewAverageOverallPoint, reviewAveragePointCategory}) {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-[0.31rem]">
                <div className="flex flex-row gap-[0.62rem] items-baseline">
                    <h1>{hotelName}</h1>
                    <p className='body2 text-[var(--primary-gold-120)]'>
                        {Array.from({ length: stars }, (_, index) => (
                            <span key={index}>★</span>
                        ))}
                    </p>
                </div>

                <div className="flex flex-row gap-[0.31rem] items-center">
                    <MapPin size={19}/>
                    <p className='body3'>{address}, {(city !== province) && city && "," } {district}, {province} </p>
                </div>
            </div>

            <div className="italic">
                <p className='body3'>{description}</p>
            </div>

            <div className="flex flex-col items-start">
                <div className="flex gap-[0.62rem]">
                    <OverallRatingScore 
                        reviewAverageOverallPoint={reviewAverageOverallPoint}
                    />
                    <h4>{reviewAveragePointCategory}</h4>
                </div>

                <ViewAllButton category="Đánh giá"/>
            </div>
        </div>
    )
}