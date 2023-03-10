"use client"

import React from 'react'
import { AuthenticationContext } from "../context/AuthContext";
import { useContext } from 'react';


const page = () => {
    const { error, data } = useContext(AuthenticationContext)

    return (
        <div>
            <p>
                page
            </p>
            <p>
                {error}
            </p>
            <p>
                {JSON.stringify(data)}

            </p>
        </div>
    )
}

export default page