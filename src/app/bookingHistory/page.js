import styles from "./bookingHistory.module.css"
import BookingHistoryCard from "../../components/cards/bookingHistoryCard"
import getBookingsByUserId from "../../api/booking/getBookingsByUserId"
import { auth } from '@clerk/nextjs/server';
import getRoomById from "../../api/room/getRoomById";
import getAllRooms from "../../api/room/getAllRooms";
import getAllHotels from "../../api/hotel/getAllHotels";
import cancelBooking from "../../api/booking/cancelBooking";
import writeReview from "../../api/review/writeReview"
import { clerkClient } from "@clerk/nextjs/server";
import next from "next";
import updateBookingStatus from "../../api/booking/updateBookingStatus";

export default async function BookingHistory() {
    
    const {userId} = auth();
    const user = await clerkClient.users.getUser(userId)
    const username = `${user.firstName || ''}${user.lastName ? ' ' + user.lastName : ''}`;
    

    const hotels = await getAllHotels();
    const rooms = await getAllRooms();
    const bookings = await getBookingsByUserId(userId);

    const joinedData = await Promise.all(bookings.map(async (booking) => {
        const room = await getRoomById(booking.roomId);
        const hotel = hotels.find(h => h.id === room.hotelId);
        return {
            booking,
            ...hotel,
            ...room
        };
    }));

    console.log(joinedData);
    // console.log(user)
    console.log(username)


    async function handleWriteReview(formData) {
        'use server'

        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localDate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

        const reviewData = {
            roomId: formData.get("dataRoomId"),
            userId: formData.get("userId"),
            userName: username,
            cleanPoint: formData.get("cleanPoint"),
            servicePoint: formData.get("servicePoint"),
            staffPoint: formData.get("staffPoint"),
            facilityPoint: formData.get("facilityPoint"),
            ecoPoint: formData.get("ecoPoint"),
            comment: formData.get("comment"),
            reviewDate: localDate
        }

        const bookingId = formData.get("dataBookingId");
        console.log('Booking ID:', bookingId); 

        console.log(reviewData);

        await writeReview(reviewData.roomId, reviewData);
        await updateBookingStatus(bookingId, "Đã đánh giá");
        
        console.log(reviewData.roomId);
    }

    async function handleCancelBooking(formData) {
        'use server'

        const cancelBookingData = {
            bookingId: formData.get("dataBookingId")
        }

        await cancelBooking(cancelBookingData.bookingId);
        console.log(cancelBookingData.bookingId);
    }

    return (
        <div className={styles.pageContainer}>
            <h2>Lịch sử đặt phòng</h2>
            
                {(joinedData.map(((data, index) => 
                <div className={styles.cards} key={data.booking[index]}>
                    <BookingHistoryCard 
                    key={data.booking.id}
                    roomId={data.booking.roomId}
                    roomName={data.roomName}
                    hotelId={data.hotelId}
                    image={data.image}
                    hotelName={data.hotelName}
                    city={data.city}
                    ratingScore={data.ratingScore}
                    star={data.star}
                    numOfReviews={data.numOfReviews}
                    discount={data.discount}
                    originPrice={data.originPrice}
                    discountPrice={data.discountPrice}
                    totalPrice={data.totalPrice}
                    bookingId={data.booking.id}
                    bookingDate={data.booking.bookingDate}
                    checkinDate={data.booking.checkinDate}
                    checkoutDate={data.booking.checkoutDate}
                    status={data.booking.bookingStatus}          
                    action={handleWriteReview}
                    cleanPointName="cleanPoint"
                    servicePointName="servicePoint"
                    staffPointName="staffPoint"
                    facilityPointName="facilityPoint"
                    ecoFriendlyPointName="ecoPoint"
                    commentName="comment"          
                    roomIdName="dataRoomId"
                    cancelAction={handleCancelBooking}
                    bookingIdName="dataBookingId"
                    />
                </div>)))}
        </div>
    )
}