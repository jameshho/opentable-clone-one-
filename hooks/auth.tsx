// "use client"

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
        // if (response.status !== 200) {
        //     throw new Error('Password:Incorrect email or password')
        // }


    } catch (error) {

        throw new Error('Password:Incorrect email or password')
    }
}



export const signup = async ({
    firstName,
    lastName,
    email,
    phone,
    city,
    password,

}: {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    city: string,
    password: string,

}) => {
    try {
        const response = await axios.post("http://localhost:3000/api/auth/signup", {
            firstName,
            lastName,
            email,
            phone,
            city,
            password
        })
        if (response.status === 400) {
            console.log('hello')
        }
        console.log('data got posted to signup API')
        if (response.status === 200) {
            console.log('hello')
            console.log('Server success', response)
        } else {
            console.log('goodbye')

            console.log('Server Error', response)

        }
        return null


    } catch (error: any) {

        if (error.response && error.response.data && error.response.data.errorMessage) {
            const errorMessage = error.response.data.errorMessage;
            console.log('Server Error', errorMessage);
            throw new Error(errorMessage)

        }

        console.log('hello from error side')

        throw new Error('Fetch Error')
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




