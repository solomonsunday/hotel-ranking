"use client";
import React, { useState } from "react";
import { IHotelChain } from "@/utils/interface";
import { useHotelChainContext } from "@/context/HotelChainContext";
import { useForm } from "react-hook-form";
import { uuid } from "uuidv4";

const HotelChainForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({ mode: "onChange" });

  const { addHotelChain } = useHotelChainContext();

  const onSubmit = (data: any) => {
    data.id = uuid();
    data.name = +data.name;
    addHotelChain(data);
    reset();
    // onCloseModal();
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="mb-4 text-2xl font-bold">Add Hotel Chain</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Chain <span className="text-sm text-yellow-700">(from 0 - 5)</span>
          </label>
          <input
            {...register("name", {
              required: "Chain is required",
              min: 1,
              max: 5,
            })}
            type="number"
            name="name"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
          />
        </div>
        {errors.name?.type === "required" && (
          <p className="mt-1 text-xs italic text-red-600">
            {errors.name?.message?.toString()}
          </p>
        )}
        {errors.name?.type === "max" && (
          <p className="mt-1 text-xs italic text-red-600">
            Maximum input length of 5
          </p>
        )}
        {errors.name?.type === "min" && (
          <p className="mt-1 text-xs italic text-red-600">
            Minimum input length of 1
          </p>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Add Hotel Chain
        </button>
      </form>
    </div>
  );
};

export default HotelChainForm;
