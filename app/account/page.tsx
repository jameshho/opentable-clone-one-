"use client"

import { AuthenticationContext } from '@/app/context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { prisma } from '@/lib/prisma';
import React from 'react'
import ReviewCard from './components/ReviewCard';
import BookingCard from './components/BookingCard';

const page = () => {

    const { error, data } = useContext(AuthenticationContext)
    if (!data) {
        return (<div>
            Sign in to review your account
        </div>)
    }



    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">My Account</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">My Information</h2>
                <p className="mb-2"><strong>Name:</strong> {data.firstName + " " + data.lastName}</p>
                <p className="mb-2"><strong>Email:</strong> {data.email}</p>
                <p className="mb-2"><strong>City:</strong> {data.city}</p>
                <p className="mb-2"><strong>Phone:</strong> {data.phone}</p>
                {/* <Comments id={data.id}> */}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-lg font-semibold mb-4">Upcoming Bookings</h2>
                {data.booking.map((i, index) => {
                    return <BookingCard
                        key={i.id}
                        bookingNumber={index + 1}
                        bookings={i} />

                })}
             
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-lg font-semibold mb-4">My Comments</h2>


                {data.reviews.map(i => {
                    return <ReviewCard key={i.id} {...i} />
                })}

            </div>

        </div>
    )
}


export default page

{/*                 
                                {data.reviews.map(i => {
                                    return <ReviewCard {
                                        ...i
                                      }/>
                                })} */}
{/* <Comments id={data.id}> */ }


