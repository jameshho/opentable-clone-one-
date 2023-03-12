"use client"

import React from 'react'
import { AuthenticationContext } from "../context/AuthContext";
import { useContext } from 'react';

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
                <p className="mb-2"><strong>Email:</strong> johndoe@example.com</p>
                <p className="mb-2"><strong>Phone:</strong> 555-555-5555</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-lg font-semibold mb-4">Upcoming Bookings</h2>
                <p className="mb-2"><strong>Booking #1:</strong> March 15th, 2023 at 2:00pm</p>
                <p className="mb-2"><strong>Booking #2:</strong> March 17th, 2023 at 10:00am</p>
                <p className="mb-2"><strong>Booking #3:</strong> March 21st, 2023 at 1:00pm</p>
            </div>
        </div>
    );
};

export default page

