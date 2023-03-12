"use client"
import React from 'react'
import SigninModal from './SigninModal'
import SignupModal from './SignupModal'
import { AuthenticationContext } from "../context/AuthContext";
import { useContext, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';

const Navbar = () => {
    const { loading, data, error } = useContext(AuthenticationContext)
    const { handleSignout } = useAuth();

    return (
        <nav className="bg-white p-2 flex justify-between">
            <a href="/" className="font-bold text-gray-700 text-2xl mr-auto"> OpenTable </a>
            {!loading && (data ?

                // <button className='bg-blue-400 text-white border p-1 px-4 rounded mr-3' >SignOut</button > 
                <>
                    <Link href={`/account`}
                        className="bg-blue-500 hover:bg-blue-600 text-white border p-1 px-4 rounded"
                        onClick={() => { }}
                    >
                        Your Account
                    </Link>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white border p-1 px-4 rounded"
                        onClick={handleSignout}
                    >
                        Sign out
                    </button>
                </>
                :
                <div>
                    <div className="flex">
                        <SigninModal />
                        <SignupModal />

                    </div>
                </div>)
            }

        </nav>
    )
}

export default Navbar