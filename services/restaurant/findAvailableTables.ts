import { RestaurantCardType } from "@/app/page";
import { prisma } from "@/lib/prisma";
import { times } from "../../data";
import { Table } from "@prisma/client";


export class FindAvailableTablesError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "FindAvailableTablesError";
    }
}

// interface Table {
//   id: number;
//   seats: number;
//   restaurant_id: number;
//   restaurant: RestaurantCardType;
//   bookings: BookingsOnTables[];
// }

interface BookingsOnTables {
    booking_id: number;
    booking_time: string;
}

export const findAvailableTables = async ({
    time,
    day,
    restaurant,
}: {
    time: string;
    day: string;
    restaurant: {
        tables: Table[];
        open_time: string;
        close_time: string;
    };
}) => {
    const searchTimes = times.find((t) => {
        return t.time === time;
    })?.searchTimes;

    if (!searchTimes) {
        throw new FindAvailableTablesError("Error with the searchTimes");

    }

    try {
        const bookings = await prisma.booking.findMany({
            where: {
                booking_time: {
                    gte: new Date(`${day}T${searchTimes[0]}`),
                    lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
                },
            },
            select: {
                number_of_people: true,
                booking_time: true,
                tables: true,
            },
        });

        const bookingTablesObj: { [key: string]: { [key: number]: true } } = {};

        bookings.forEach((booking) => {
            bookingTablesObj[booking.booking_time.toISOString()] =
                booking.tables.reduce((obj, table) => {
                    return {
                        ...obj,
                        [table.table_id]: true,
                    };
                }, {});
        });

        const tables = restaurant.tables;

        const searchTimesWithTables = searchTimes.map((searchTime) => {
            return {
                date: new Date(`${day}T${searchTime}`),
                time: searchTime,
                tables,
            };
        });

        searchTimesWithTables.forEach((t) => {
            t.tables = t.tables.filter((table) => {
                if (bookingTablesObj[t.date.toISOString()]) {
                    if (bookingTablesObj[t.date.toISOString()][table.id]) return false;
                }
                return true;
            });
        });

        return searchTimesWithTables;
    } catch (error: any) {
        throw new FindAvailableTablesError(error.message);
    }
}






// import { NextApiResponse } from "next";
// import { times } from "../../data";

// import { prisma } from "@/lib/prisma";
// import { RestaurantCardType } from "@/app/page";
// import { Table } from "@prisma/client";

// // type Table = {
// //     id: number;
// //     seats: number;
// //     restaurant_id: number;
// //     restaurant: RestaurantCardType;
// //     bookings: BookingsOnTables[];

// // }

// type BookingsOnTables = {
//     booking_id: number;
//     booking: Booking;
//     table_id: number;
//     table: Table;
// }
// type Booking = {
//     number_of_people: number;
//     booking_time: String;
//     booker_email: String;
//     booker_phone: String;
//     booker_first_name: String;
//     booker_last_name: String;
//     booker_occasion?: String;
//     booker_request?: String;
//     restaurant_id: number;
//     tables: BookingsOnTables[];

// }



// export const findAvailabileTables = async ({
//     time,
//     day,
//     restaurant,
// }: {
//     time: string;
//     day: string;

//     restaurant: {
//         tables: Table[];
//         open_time: string;
//         close_time: string;
//     };
// }) => {
//     const searchTimes = times.find((t) => {
//         return t.time === time;
//     })?.searchTimes;

//     if (!searchTimes) {
//         return res.status(400).json({
//             errorMessage: "Invalid data provided",
//         });
//     }

//     try {
//         const bookings = await prisma.booking.findMany({
//             where: {
//                 booking_time: {
//                     gte: new Date(`${day}T${searchTimes[0]}`),
//                     lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
//                 },
//             },
//             select: {
//                 number_of_people: true,
//                 booking_time: true,
//                 tables: true,
//             },
//         });

//         const bookingTablesObj: { [key: string]: { [key: number]: true } } = {};

//         bookings.forEach((booking) => {
//             bookingTablesObj[booking.booking_time.toISOString()] =
//                 booking.tables.reduce((obj, table) => {
//                     return {
//                         ...obj,
//                         [table.table_id]: true,
//                     };
//                 }, {});
//         });

//         const tables = restaurant.tables;

//         const searchTimesWithTables = searchTimes.map((searchTime) => {
//             return {
//                 date: new Date(`${day}T${searchTime}`),
//                 time: searchTime,
//                 tables,
//             };
//         });

//         searchTimesWithTables.forEach((t) => {
//             t.tables = t.tables.filter((table) => {
//                 if (bookingTablesObj[t.date.toISOString()]) {
//                     if (bookingTablesObj[t.date.toISOString()][table.id]) return false;
//                 }
//                 return true;
//             });
//         });

//         return searchTimesWithTables;
//     } catch (error: any) {
//         console.error(error);
//         return res.status(500).json({
//             errorMessage: "Something went wrong while fetching available tables"
//         });
//     }
// };