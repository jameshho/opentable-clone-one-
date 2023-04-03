"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { partySize, times } from '@/data'
import useAvailabilities from '@/hooks/useAvailabilities'
import { RestaurantProp } from '../page'
import { convertToDisplayTime, Time } from '@/utils/convertToDisplayTime'
const ReservationCard = (
    {
        slug,
        restaurant
    }:
        {
            slug: string,
            restaurant: RestaurantProp
        }) => {
    //this is the current choice
    const { loading, data, error, fetchAvailabilities } = useAvailabilities()

    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    //this is the output
    const [day, setDay] = useState(new Date().toISOString().split("T")[0] || "2023-03-05")
    const [selectedPartySize, setSelectedPartySize] = useState("2")
    const [selectedTime, setSelectedTime] = useState("20:00:00.000Z")

    const handleChangeDate = (date: Date) => {
        if (date instanceof Date && !isNaN(date.getTime())) {
            setDay(date.toISOString().split('T')[0]);
            setSelectedDate(date);
        }
    };

    const { open_time, close_time } = restaurant

    const filterTimebyRestaurantOpenWindow = () => {
        const timesWithinWindow: typeof times = [];

        let isWithinWindow = false;

        times.forEach(time => {
            if (!isWithinWindow && time.time === open_time) {
                isWithinWindow = true
            }
            if (isWithinWindow) {
                timesWithinWindow.push(time)
            }
            if (time.time === close_time) {
                isWithinWindow = false
            }
        })
        return timesWithinWindow
    }

    return (
        <div className=" sticky top-0 w-[27%]  text-reg">
            <div className=" bg-white rounded p-3 shadow" >
                <div className="text-center border-b pb-2 font-bold">
                    <h4 className="mr-7 text-lg">Make a Reservation</h4>
                </div>
                <div className="my-3 flex flex-col">
                    <label htmlFor="PartySize">Party size</label>
                    <select name="PartySize"
                        className="py-3 border-b font-light"
                        value={selectedPartySize}
                        onChange={e => setSelectedPartySize(e.target.value)}
                        id="PartySize"
                    >
                        {partySize.map((i) =>
                            <option value={i.value}>{i.label}</option>
                        )
                        }

                    </select>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col w-[48%]">
                        <label htmlFor="">Date</label>
                        <input
                            type="date"
                            value={selectedDate.toISOString().slice(0, 10)}
                            onChange={(e) => handleChangeDate(new Date(e.target.value))}
                            className="py-3 borber-b font-light text-reg w-[100%]"
                        />
                        {/* <input type="text" className="py-3 border-b font-light w-28" /> */}
                    </div>
                    <div className="flex flex-col w-[48%]">
                        <label htmlFor="">Time</label>
                        <select
                            name=""
                            id=""
                            className="py-3 border-b font-light"
                            value={selectedTime}
                            onChange={e => setSelectedTime(e.target.value)}
                        >
                            {filterTimebyRestaurantOpenWindow().map(i =>
                                <option value={i.time}>{i.displayTime}</option>
                            )}

                        </select>
                    </div>
                </div>
                <div className="mt-5">


                </div>
                <button
                    onClick={() => fetchAvailabilities(
                        {
                            slug,
                            partySize: selectedPartySize,
                            day,
                            time: selectedTime
                        })}
                    className="bg-red-600 hover:bg-red-500 rounded w-full px-4 text-white font-bold h-16">
                    Find a Time
                </button>
                {data && data.length ? (
                    <div className="mt-4">
                        <p className="text-reg font-bold">Select a Time</p>
                        <div className="flex flex-wrap mt-2 justify-between">
                            {data.map((time) => {
                                return time.available ? (
                                    <Link href={{
                                        pathname: `/restaurant/${slug}/reserve`,

                                        query:
                                        {
                                            slug: slug,
                                            partySize: selectedPartySize,
                                            date: day,
                                            time: time.time,
                                            restaurantName: restaurant.name,
                                            restaurantImage: restaurant.main_image,

                                        }
                                    }}
                                        className="bg-red-600 hover:bg-red-500 cursor-pointer p-2 w-[47%] text-center text-white mb-3 rounded "
                                    >

                                        <p className="text-sm font-bold">
                                            {convertToDisplayTime(time.time as Time)}
                                        </p>
                                    </Link>

                                ) : (
                                    <p className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3"></p>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
                {error ? <p>{error}</p> : ""}


            </div>
        </div>
    )
}

export default ReservationCard