"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StringMappingType } from 'typescript'
import { convertToDisplayTime, Time } from '@/utils/convertToDisplayTime'
import { AuthenticationContext } from '@/app/context/AuthContext'
import { useContext, useEffect } from 'react';
import useReservation from '@/hooks/useReservation'

// const router = useRouter()
const page = ({ searchParams }: {

    searchParams: {
        slug: string,
        restaurantName: string,
        time: string,
        partySize: string,
        date: string,
        restaurantImage: string
    }
}) => {
    const { slug, time, partySize, date, restaurantName, restaurantImage } = searchParams
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({
            ...inputs,
            [e.target.name]: e.target.value,
        }));
    };
    const { loading, data, error } = useContext(AuthenticationContext)

    const [disabled, setDisabled] = useState(true)


    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        occasion: "",
        requests: ""
    })
    const [userIdState, setUserIdState] = useState( data?data.id:null)
    useEffect(() => {
        if (data) {
            setInputs({
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phone,
                email: data.email,
                occasion: "",
                requests: ""
            });
            setUserIdState(data.id)
        }
    }, [data]);
    const hasRequiredFields = () => {
        return inputs.firstName &&
            inputs.lastName &&
            inputs.phoneNumber &&
            inputs.email

    };

    const router = useRouter();


    useEffect(() => {
        setDisabled(!hasRequiredFields());
    },
        [inputs]
    )

    const [isGuest, setIsGuest] = useState(true);

    const { createReservation } = useReservation()

    const handleSubmit = async () => {
        if (isGuest){
            const booking = await createReservation(
                {
                    slug,
                    partySize,
                    day: date,
                    time,
                    bookerFirstName: inputs.firstName,
                    bookerLastName: inputs.lastName,
                    bookerPhone: inputs.phoneNumber,
                    bookerEmail: inputs.email,
                    bookerOccasion: inputs.occasion,
                    bookerRequest: inputs.requests,
                    user_id:null,
                })
        }else{
            const booking = await createReservation(
                {
                    slug,
                    partySize,
                    day: date,
                    time,
                    bookerFirstName: inputs.firstName,
                    bookerLastName: inputs.lastName,
                    bookerPhone: inputs.phoneNumber,
                    bookerEmail: inputs.email,
                    bookerOccasion: inputs.occasion,
                    bookerRequest: inputs.requests,
                    user_id:userIdState,

                })
            // const userId = userIdState
        }
        
    }



    return (
        <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">

                <div className="border-t h-screen">
                    <div className="py-9 w-3/5 m-auto">
                        <div>
                            {userIdState ? <p>{userIdState}</p> : <p></p>}
                            <button
                                onClick={() => router.back()}
                                className="bg-blue-500 hover:bg-blue-400 cursor-pointer p-2 w-44 text-center text-white text-sm mb-3 rounded mr-3"

                            >
                                {"< Click here to go back"}
                            </button>
                            <h3 className="font-bold">You're almost done!</h3>
                            <div className="mt-5 flex">
                                <img
                                    src={restaurantImage}
                                    alt=""
                                    className="w-32 h-32 rounded object-cover object-position: center"
                                />
                                <div className="ml-4">
                                    <h1 className="text-3xl font-bold">
                                        {restaurantName}
                                    </h1>

                                    <div className="flex mt-3">
                                        <p className="mr-6">{date}</p>
                                        <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
                                        <p className="mr-6">{`${partySize} people`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {data &&
                            <div className="mt-5 flex ">
                                <button
                                    className={`w-22 bg-gray-200 py-2 px-4 ${isGuest ? "bg-gray-200" : "bg-gray-400 font-bold"}`}
                                    onClick={() => {
                                        setIsGuest(false)
                                        setInputs({
                                            firstName: data.firstName,
                                            lastName: data.lastName,
                                            phoneNumber: data.phone,
                                            email: data.email,
                                            occasion: "",
                                            requests: ""
                                        })
                                    }}
                                >  {"Book As "}
                                    <span className="underline">{data.firstName}</span></button>
                                <button
                                    className={`w-22 bg-gray-200 py-2 px-4  ${isGuest ? "bg-gray-400 font-bold" : "bg-gray-200"}`}
                                    onClick={() => {
                                        setIsGuest(true)
                                        setInputs({
                                            firstName: "",
                                            lastName: "",
                                            phoneNumber: "",
                                            email: "",
                                            occasion: "",
                                            requests: ""
                                        })
                                    }}
                                >Book As Guest</button>
                            </div>
                        }




                        <div className="mt-5 flex flex-wrap justify-between w-[660px]">
                            <div className="flex flex-col mb-4 w-80">
                                <label htmlFor="first-name" className="text-gray-600 font-semibold mb-2">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="border rounded p-3"
                                    placeholder="Enter your first name"
                                    value={inputs.firstName}
                                    onChange={handleChangeInput}
                                    disabled={!isGuest}

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
                                    value={inputs.lastName}
                                    onChange={handleChangeInput}
                                    disabled={!isGuest}



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
                                    value={inputs.phoneNumber}
                                    onChange={handleChangeInput}
                                    disabled={!isGuest}
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
                                    value={inputs.email}
                                    onChange={handleChangeInput}
                                    disabled={!isGuest}



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
                                    value={inputs.occasion}
                                    onChange={handleChangeInput}


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
                                    value={inputs.requests}
                                    onChange={handleChangeInput}


                                />
                            </div>

                            <button
                                className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
                                disabled={disabled}
                                onClick={handleSubmit}
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