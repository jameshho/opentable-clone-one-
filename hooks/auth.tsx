import React from 'react'
import axios from "axios";
import { getCookie } from "cookies-next";



export const signin = async ({ email, password,
}: {
    email: string;
    password: string;
}) => {
    try {
        const response = await axios.post("http://localhost:3000/api/auth/signin", {
            email,
            password
        })
        if (response.status !== 200) {
            throw new Error('Incorrect email or password')
        }


    } catch (error) {

        throw new Error('Incorrect email or password')
    }
}



export const fetchUser = async (setAuthState: any) => {
    setAuthState({
        data: null,
        error: null,
        loading: true,
    });
    try {
        const jwt = getCookie("jwt");

        if (!jwt) {
            return setAuthState({
                data: null,
                error: null,

                loading: false,
            });
        }

        const response = await axios.get("http://localhost:3000/api/auth/me", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        setAuthState({
            data: response.data,
            error: null,

            loading: false,
        });
    } catch (error: any) {
        setAuthState({
            data: null,
            error: error.response.data.errorMessage,

            loading: false,
        });
    }
};
