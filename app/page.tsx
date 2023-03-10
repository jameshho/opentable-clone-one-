import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
// import { PrismaClient } from '@prisma/client'
import Card from './components/RestaurantCard'
import { PrismaClient } from "@prisma/client";
import { useState } from 'react';
import Link from 'next/link';
import SearchBar from './components/SearchBar';
import { prisma } from '@/lib/prisma';
export type CuisineType = {
  id: Number;
  name: String;
  // created_at: any;
  // updated_at: any;
}
export type LocationType = {
  id: Number;
  name: String;
  created_at: any;
  updated_at: any;
}
export interface RestaurantCardType {
  id: number;
  main_image: string;
  name: string;
  slug: string;
  // images: string[];
  // description: string[];
  // open_time: string;
  // close_time: string;

  // price: string;
  // location: LocationType;
  // cuisine: CuisineType;
}



const fetchCuisine = async (): Promise<CuisineType[]> => {
  const cuisines = await prisma.cuisine.findMany({
    select: {
      id: true,
      name: true
    }
  })
  return cuisines
}

const fetchRestaurant = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      slug: true

    }
  })
  return restaurants
}


const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const cuisines = await fetchCuisine()
  const restaurants = await fetchRestaurant()

  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
  
        <main>
          {/* HEADER */}
          <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
            <div className="text-center mt-10">
              <h1 className="text-white text-5xl font-bold mb-2">
                Find your table for any occasion
              </h1>
              {/* SEARCH BAR */}
              <SearchBar/>
              {/* SEARCH BAR */}
            </div>
          </div>
          {/* HEADER */} {/* CARDS */}
          <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
            {/* CARD */}
            {/* <Card/> */}
            {/* {cuisines.length > 1 && cuisines.map(i => <Card card={i}/>)} */}

            {restaurants.length > 1 && restaurants.map(i => <Card card={i} />)}

            {/* CARD */}
          </div>
          {/* CARDS */}
        </main>
      </main>
    </main>
  )
}
