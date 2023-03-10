"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const SearchBar = () => {
    const [searchWord, SetSearchWord] = useState("")
    return (
        <div className="text-left text-lg py-3 m-auto flex justify-center">
            <input
                className="rounded  mr-3 p-2 w-[450px]"
                type="text"
                placeholder="State, city or town"
                value={searchWord}
                onChange={(e) => { SetSearchWord(e.target.value) }}
            />
            <button >
                <Link href={`/search/${searchWord}`}
                    className="rounded bg-red-600 px-9 py-2 text-white">

                    Let's go
                </Link>
            </button>
        </div>
    )
}

export default SearchBar