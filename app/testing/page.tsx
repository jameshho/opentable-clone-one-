// "use client"

import React from 'react'
import { AuthenticationContext } from "../context/AuthContext";
// import { useContext } from 'react';
import { CuisineType } from '../page';
import { prisma } from '@/lib/prisma';



const page = async () => {
    const fetchCuisine = async (): Promise<CuisineType[]> => {
        const cuisines = await prisma.cuisine.findMany({
            select: {
                id: true,
                name: true
            }
        })
        return cuisines
    }
    const cuisines = await fetchCuisine()
    // const { error, data } = useContext(AuthenticationContext)

    return (
        <div>

            <p>

                {JSON.stringify(cuisines)}
            </p>


        </div>
    )
}

export default page
