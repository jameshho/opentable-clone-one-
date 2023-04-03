import React from "react";
import { Restaurant, Booking } from "@prisma/client";


//any type is used

// type Booking = {
//     id: number;
//     number_of_people: number;
//     booking_time: string;
//     booker_email: string;
//     booker_first_name: string;
//     booker_last_name: string;
//     booker_occasion: string;
//     booker_request: string;
//     restaurant_id: number;
//     user_id: number;
//     created_at: string;
//     updated_at: string;
//     restaurant: {
//         id: number;
//         name: string;
//         main_image: string;
//         images: string[];
//         description: string;
//         open_time: string;
//         close_time: string;
//         slug: string;
//         price: string;
//         location_id: number;
//         cuisine_id: number;
//         created_at: string;
//         updated_at: string;
//     };

// }

// type Booking = {
//     id: number;
//     number_of_people: number;
//     booking_time: string;
//     booker_email: string;
//     booker_first_name: string;
//     booker_last_name: string;
//     booker_occasion: string;
//     booker_request: string;
//     restaurant_id: number;
//     user_id: number;
//     created_at: string;
//     updated_at: string;
//     restaurant:Restaurant;
//     // restaurantName: string;
// };

// type Props = {
//     bookings: Booking;
// };

type Props = {
    bookings: any;
    bookingNumber:number;
};


const BookingCard: React.FC<Props> = ({ bookings ,bookingNumber }) => {
    if (!bookings) { return null }
    const {
        number_of_people,
        booking_time,
        booker_first_name,
        booker_last_name,
        booker_email,
        booker_occasion,
        booker_request,
        restaurantName,
        restaurant: { main_image, slug },
    } = bookings;

    const formattedBookingTime = new Date(booking_time).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    return (
        <>
            <p className="mb-2 my-4"><strong>{`Booking #${bookingNumber}:`}</strong> {formattedBookingTime}</p>

            <div className="bg-gray-100 rounded-sm p-4 w-[100%] flex items-center">
                <img className="w-40 h-40 object-cover rounded-lg mr-12" src={main_image} alt={restaurantName} />
                <div className="w-[100%]" >
                    <h2 className="w-[100%] text-lg font-medium">{restaurantName}</h2>
                    <div className="mt-4">
                        <h3 className="text-lg font-medium">Booking Information</h3>
                        <p className="text-gray-600">
                            {formattedBookingTime} for {number_of_people} people
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Occasion: </span> {booker_occasion} - Request: {booker_request}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Booker:</span> {booker_first_name} {booker_last_name} ({booker_email})
                        </p>
                    </div>
                </div>
            </div>
        </>


    );
};

export default BookingCard;
