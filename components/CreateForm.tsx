"use client";
import React, { useState } from "react";
import { useHotelContext } from "../context/HotelContext";
import { uuid } from "uuidv4";
import { useForm } from "react-hook-form";
import { IHotel } from "@/utils/interface";

const CreateForm = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const { createHotel } = useHotelContext();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({ mode: "onChange" });

  const [newHotel, setNewHotel] = useState<IHotel>({
    id: "",
    name: "",
    city: "",
    country: "",
    address: "",
    chainId: 1,
  });

  const onSubmit = (data: any) => {
    data.id = uuid();
    data.chainId = +data.chainId;
    console.log(data, "data to save");
    createHotel(data);
    reset();
    onCloseModal();
  };

  return (
    <div className="max-w-2xl m-8 mx-auto">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Hotel Name
          </label>
          <div>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: 2,
              })}
              type="text"
              name="name"
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>
          {errors.name?.type === "required" && (
            <p className="mt-1 text-xs italic text-red-600">
              {errors.name?.message?.toString()}
            </p>
          )}
          {errors.name?.type === "minLength" && (
            <p className="mt-1 text-xs italic text-red-600">
              Minimum input length of 2
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Address
          </label>
          <div>
            <input
              {...register("address", {
                required: "Address is required",
                minLength: 2,
              })}
              type="text"
              name="address"
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>
          {errors.name?.type === "required" && (
            <p className="mt-1 text-xs italic text-red-600">
              {errors.address?.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            City
          </label>
          <div>
            <input
              {...register("city", {
                required: "City is required",
                minLength: 2,
              })}
              type="text"
              name="city"
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>
          {errors.name?.type === "required" && (
            <p className="mt-1 text-xs italic text-red-600">
              {errors.city?.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Country
          </label>
          <div>
            <input
              {...register("country", {
                required: "Country is required",
                minLength: 2,
              })}
              type="text"
              name="country"
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>
          {errors.country?.type === "required" && (
            <p className="mt-1 text-xs italic text-red-600">
              {errors.country?.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            ChainID
          </label>
          <div>
            <input
              {...register("chainId", {
                required: "ChainId is required",
                minLength: 1,
                maxLength: 5,
                max: 5,
              })}
              type="number"
              name="chainId"
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>
          {errors.name?.type === "required" && (
            <p className="mt-1 text-xs italic text-red-600">
              {errors.chainId?.message?.toString()}
            </p>
          )}
          {errors.chainId?.type === "max" && (
            <p className="mt-1 text-xs italic text-red-600">
              Max input length of 5
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white rounded-lg bg-slate-600 hover:bg-slate-400"
        >
          Create Hotel
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
