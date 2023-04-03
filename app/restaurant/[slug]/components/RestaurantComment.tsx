

import React, { ReactElement } from 'react'
import { prisma } from '@/lib/prisma';
import RestaurantReviewCard from './RestaurantReviewCard';
import { Review } from '@prisma/client';




// const prisma = new PrismaClient();

const RestaurantComment = async ({ restaurantId }: { restaurantId: number }) => {

    async function main() {
        try {
            const reviews = await prisma.review.findMany({
                where: {
                    restaurant_id: restaurantId
                }
            })
            // console.log(reviews)
            return reviews

        } catch (e: any) {
            console.error(e.message)
        } finally {
            await prisma.$disconnect()
        }

    }


    let reviews = await main()
    console.log(reviews)
    return (
        <>

            <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
                {`What ${reviews?.length} people are saying`}
            </h1>


            {
                reviews ? reviews.map((i: Review) => {
                    return <RestaurantReviewCard
                        comment={i.text}
                        first_name={i.first_name}
                        last_name={i.last_name}
                        rating = {i.rating}
                    />
                }) : null
            }


        </>

    )
}

export default RestaurantComment