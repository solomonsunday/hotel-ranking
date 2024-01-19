"use client";
import React, { useEffect } from "react";
import { useHotelChainContext } from "@/context/HotelChainContext";

const HotelChainList: React.FC = () => {
  const { hotelChains, deleteHotelChain, getHotelChains } =
    useHotelChainContext();
  console.log(hotelChains, "hotelChain");

  useEffect(() => {
    getHotelChains();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="mb-4 text-2xl font-bold">Hotel Chains</h2>
      <ul className="divide-y divide-gray-300">
        {hotelChains.map((chain) => (
          <li key={chain.id} className="py-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{chain.name}</h3>
              <button
                className="px-2 py-1 text-white bg-red-500 rounded"
                onClick={() => deleteHotelChain(chain.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelChainList;
