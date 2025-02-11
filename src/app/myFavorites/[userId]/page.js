import getFavoriteListByUserId from "../../../api/hotel/getFavoriteListByUserId";
import HotelCard from "../../../components/cards/hotelCard";
import AddToButton from "../../../components/buttons/addToButton";

export default async function MyFavorites({params}) {
    const favoriteList = await getFavoriteListByUserId(params.userId);
    console.log("params.userId", params.userId);
    console.log("favoriteList", favoriteList);
    const favoriteHotels = favoriteList.favoriteHotels;
    console.log("favoriteHotels", favoriteHotels);
    return (
        <>
        <div className="flex flex-col mb-[2.5rem]">                
            <h2 className="text-center">Danh sách yêu thích</h2>
        </div>

        <div className="grid grid-cols-1 gap-[1.25rem] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteHotels && favoriteHotels.length > 0 ? (
            favoriteHotels.map((hotel, index) => (
                <HotelCard
                key={hotel.id || index}
                id={hotel.id}
                initialFavorite={true}
                images={Array.isArray(hotel.images) ? hotel.images[0] : hotel.images}
                hotelName={hotel.hotelName}
                city={hotel.city}
                reviewAverageOverallPoint={hotel.reviewAverageOverallPoint}
                star={hotel.star}
                reviewCount={hotel.reviewCount}
                roomLowestOriginPrice={hotel.roomLowestOriginPrice}
                roomLowestDiscountPercentage={hotel.roomLowestDiscountPercentage}
                roomLowestDiscountedPrice={hotel.roomLowestDiscountedPrice}
                roomLowestTotalPrice={hotel.roomLowestTotalPrice}
                />
            ))
            ) : (
            <div className="col-span-full flex justify-center items-center">
                <AddToButton label="Thêm vào yêu thích" href={`/`} />
            </div>
            )}
        </div>
        </>
    )
}