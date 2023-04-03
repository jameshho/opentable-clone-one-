import React from 'react'
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReservationCard from './components/ReservationCard';
import { prisma } from '@/lib/prisma';
import RestaurantComment from "./components/RestaurantComment"
// const prisma = new PrismaClient();

export interface RestaurantProp {
    id: number;
    name: string;
    images: string[];
    description: string;
    open_time: string;
    close_time: string;
    slug: string;
    main_image: string;
}

export const fetchRestaurantBySlug = async (slug: string): Promise<RestaurantProp> => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug,
        },
        select: {
            id: true,
            name: true,
            main_image: true,
            images: true,
            description: true,
            slug: true,
            reviews: true,
            open_time: true,
            close_time: true,
        },
    });

    if (!restaurant) {
        notFound();
    }

    return restaurant;
};


const RestaurantDetail = async ({
    params }: {
        params: { slug: string }
    }) => {


    const restaurant = await fetchRestaurantBySlug(params.slug)



    return (
        <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">

                <div className="h-96 overflow-hidden">
                    <div
                        className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center"
                    >
                        <h1 className="text-7xl text-white captitalize text-shadow text-center">
                            {restaurant.name}
                        </h1>
                    </div>
                </div>
                {/* HEADER */} {/* DESCRIPTION PORTION */}
                <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
                    <div className="bg-white w-[70%] rounded p-3 shadow">
                        {/* RESAURANT NAVBAR */}
                        <nav className="flex text-reg border-b pb-2">
                            {/* <a href="" className="mr-7"> Overview </a> */}
                            {/* <Link href={`/restaurant/${card.slug}`}>   Overview </Link> */}
                            <Link href={`/restaurant/${restaurant.slug}`} className="mr-7" replace={true}>   Overview </Link>
                            <Link href={`/restaurant/${restaurant.slug}/menu`} className="mr-7" >Menu </Link>

                            {/* <a href="" className="mr-7"> Menu </a> */}
                        </nav>
                        <div className="mt-4 border-b pb-6">




                            <h1 className="font-bold text-6xl">

                                {restaurant.name}

                            </h1>
                        </div>

                        <div className="flex items-end">
                            <div className="ratings mt-2 flex items-center">
                                <p>*****</p>
                                <p className="text-reg ml-3">4.9</p>
                            </div>
                            <div>
                                <p className="text-reg ml-4">600 Reviews</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-lg font-light">
                                {restaurant.description}

                            </p>

                        </div>

                        <div>
                            <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
                                5 photos
                            </h1>
                            <div className="flex flex-wrap">
                                {restaurant.images.length > 0 && restaurant.images.map(i => <img
                                    className="w-56 h-44 mr-1 mb-1"
                                    src={i}
                                    alt=""
                                />)
                                }

                            </div>
                        </div>
                        {/* Review Card */}
                        {/* @ts-expect-error Async Server Component */}
                        <RestaurantComment
                            restaurantId={restaurant.id}
                        />

                        {/* REVIEWS */}
                    </div>
                    <ReservationCard
                        slug={params.slug}
                        restaurant={restaurant}

                    />
                </div>

            </main>
        </main >
    )
}

export default RestaurantDetail