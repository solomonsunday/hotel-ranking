"use client";
import React, { useState } from "react";
import { useHotelContext } from "../context/HotelContext";
import { IHotelChain } from "@/utils/interface";

const HotelChainForm: React.FC = () => {
  const { addHotelChain } = useHotelContext();
  const [newChain, setNewChain] = useState<IHotelChain>({ id: "", name: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChain({ ...newChain, [e.target.name]: e.target.value });
  };

  const handleAddChain = () => {
    addHotelChain(newChain);
    setNewChain({ id: "", name: "" });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="mb-4 text-2xl font-bold">Add Hotel Chain</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Chain Name
          </label>
          <input
            type="text"
            name="name"
            value={newChain.name}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
          />
        </div>
        <button
          type="button"
          onClick={handleAddChain}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Add Hotel Chain
        </button>
      </form>
    </div>
  );
};

export default HotelChainForm;
