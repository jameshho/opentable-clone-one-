"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { StringMappingType } from 'typescript'
// const router = useRouter()
const page = ({ searchParams }: {
    searchParams: {
        time: string,
        partySize: StringMappingType,
        date: string
    }
}) => {
    const { time, partySize, date } = searchParams
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const [disabled, setDisabled] = useState(true)

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        occasion: "",
        request: ""
    });
    const hasRequiredFields = () => {
        return inputs.firstName &&
            inputs.lastName &&
            inputs.phoneNumber &&
            inputs.email

    };
    React.useEffect(() => {
        setDisabled(!hasRequiredFields());
    },
        [inputs]
    )
    return (
        <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">

                <div className="border-t h-screen">
                    <div className="py-9 w-3/5 m-auto">
                        {/* HEADER */}
                        <div>
                            {/* <button type="button" onClick={() => router.back()}>
                                Click here to go back
                            </button> */}
                            <h3 className="font-bold">You're almost done!</h3>
                            <div className="mt-5 flex">
                                <img
                                    src="https://images.otstatic.com/prod1/49153814/2/medium.jpg"
                                    alt=""
                                    className="w-32 h-18 rounded"
                                />
                                <div className="ml-4">
                                    <h1 className="text-3xl font-bold">
                                        Aiāna Restaurant Collective
                                    </h1>
                                    <div className="flex mt-3">
                                        <p className="mr-6">{date}</p>
                                        <p className="mr-6">{time}</p>
                                        <p className="mr-6">{`${partySize} people`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="mt-10 flex flex-wrap justify-between w-[660px]">
                            <div className="flex flex-col mb-4 w-80">
                                <label htmlFor="first-name" className="text-gray-600 font-semibold mb-2">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="border rounded p-3"
                                    placeholder="Enter your first name"
                                />
                            </div>
                            <div className="flex flex-col mb-4 w-80">
                                <label htmlFor="last-name" className="text-gray-600 font-semibold mb-2">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="border rounded p-3"
                                    placeholder="Enter your last name"
                                />
                            </div>
                            <div className="flex flex-col mb-4 w-80">
                                <label htmlFor="phone-number" className="text-gray-600 font-semibold mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className="border rounded p-3"
                                    placeholder="(xxx)-xxx-xxxx"
                                />
                            </div>
                            <div className="flex flex-col mb-4 w-80">
                                <label htmlFor="email" className="text-gray-600 font-semibold mb-2">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    className="border rounded p-3"
                                    placeholder="johndoe@email.com"
                                />
                            </div>
                            <div className="flex flex-col mb-4 w-80">
                                <label htmlFor="occasion" className="text-gray-600 font-semibold mb-2">Occasion (optional)</label>
                                <input
                                    type="text"
                                    id="occasion"
                                    name="occasion"
                                    className="border rounded p-3"
                                    placeholder="---"
                                />
                            </div>
                            <div className="flex flex-col mb-4 w-80">
                                <label htmlFor="requests" className="text-gray-600 font-semibold mb-2">Requests (optional)</label>
                                <input
                                    type="text"
                                    id="requests"
                                    name="requests"
                                    className="border rounded p-3"
                                    placeholder="special requests"
                                />
                            </div>
                            <button
                                className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
                                disabled={disabled}
                            >
                                Complete reservation
                            </button>
                            <p className="mt-4 text-sm">
                                By clicking “Complete reservation” you agree to the OpenTable Terms
                                of Use and Privacy Policy. Standard text message rates may apply.
                                You may opt out of receiving text messages at any time.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </main>

    )
}

export default page