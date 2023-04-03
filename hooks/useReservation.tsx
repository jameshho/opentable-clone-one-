import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";

export default function useReservation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createReservation = async ({
        slug,
        partySize,
        day,
        time,
        bookerFirstName,
        bookerLastName,
        bookerPhone,
        bookerEmail,
        bookerOccasion,
        bookerRequest,
        user_id
        // setDidBook,
    }: {
        slug: string;
        partySize: string;
        day: string;
        time: string;
        bookerFirstName: string;
        bookerLastName: string;
        bookerPhone: string;
        bookerEmail: string;
        bookerOccasion: string | null;
        bookerRequest: string | null;
        user_id: number | null

        // setDidBook: Dispatch<SetStateAction<boolean>>;
    }) => {
        setLoading(true);

        try {
            const response = await axios.post(
                `http://localhost:3000/api/restaurant/${slug}/reserve`,
                {
                    bookerFirstName,
                    bookerLastName,
                    bookerPhone,
                    bookerEmail,
                    bookerOccasion,
                    bookerRequest,
                    user_id

                },
                {
                    params: {
                        day,
                        time,
                        partySize,
                    },
                }
            );

            setLoading(false);
            // setDidBook(true);
            return response.data;
        } catch (error: any) {
            setLoading(false);
            setError(error.response.data.errorMessage);
        }
    };

    return { loading, error, createReservation };
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-02-03&time=15:00:00.000Z&partySize=8
