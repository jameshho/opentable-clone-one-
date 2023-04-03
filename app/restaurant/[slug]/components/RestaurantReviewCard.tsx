import React from 'react'

const RestaurantReviewCard = ({
    comment,
    first_name,
    last_name,
    rating }:
    {
        comment: string,
        first_name: string,
        last_name: string,
        rating: number,
    }) => {
    // const comment = "Laurie was on top of everything! Slow night due to the snow storm so it worked in our favor to have more one on one with the staff. Delicious and well worth the money."
    // const firstName = "Michael"
    // const lastName = "Jordan"
    const starRating = () => {
        let result = ""
        for (let i = 0; i < rating; i++) {
            result = result + "⭐"
        }
        return result
    }
    return (
        <div>

            <div className="border-b pb-7 mb-7">
                <div className="flex">
                    <div className="w-1/6 flex flex-col items-center">
                        <div
                            className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center"
                        >
                            <h2 className="text-white text-2xl">{first_name.charAt(0) + last_name.charAt(0)}</h2>
                        </div>
                        <p className="text-center">{first_name + " " + last_name}</p>

                    </div>
                    <div className="ml-10 w-5/6">
                        <div className="flex items-center">
                            <div className="flex mr-5">{starRating()}</div>
                        </div>
                        <div className="mt-5">
                            <p className="text-lg font-light">
                                {comment}
                            </p>
                        </div>
                    </div>
                </div>

                {/* REVIEW CARD */}
            </div>
        </div>
    )
}

export default RestaurantReviewCard