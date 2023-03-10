"use client"

import Link from 'next/link'
import React, { useState } from 'react'

const ReservationCard = ({slug}:any) => {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [day, setDay] = useState(new Date().toISOString().split("T")[0] || "2023-03-05")

    const handleChangeDate = (date: Date) => {
        if (date instanceof Date && !isNaN(date.getTime())) {
            setDay(date.toISOString().split('T')[0]);
            setSelectedDate(date);
        }
    };

    return (
        <div className=" sticky top-0 w-[27%]  text-reg">
            <div className=" bg-white rounded p-3 shadow" >


                <div className="text-center border-b pb-2 font-bold">
                    <h4 className="mr-7 text-lg">Make a Reservation</h4>
                </div>
                <div className="my-3 flex flex-col">
                    <label htmlFor="">Party size</label>
                    <select name="" className="py-3 border-b font-light" id="">
                        <option value="">1 person</option>
                        <option value="">2 people</option>
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
                        <select name="" id="" className="py-3 border-b font-light">

                            <option value="">7:30 PM</option>
                            <option value="">8:00 PM</option>
                            <option value="">8:30 PM</option>
                            <option value="">9:00 PM</option>
                        </select>
                    </div>
                </div>
                <div className="mt-5">
      
        
                </div>
                <Link href={{
                    pathname: `/restaurant/${slug}/reserve`,
                    query:
                    {
                        time: '8pm',
                        partySize: 2,
                        date: day
                    }
                }}
                    className="bg-red-600 rounded w-full px-4 text-white font-bold h-16 "> Find a Time
                </Link>
            </div>
        </div>
    )
}

export default ReservationCard