import { useHotelContext } from "@/context/HotelContext";
import React from "react";
import { useForm } from "react-hook-form";

const EditForm = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<any>({ mode: "onChange" });

  const { selectedHotel, updateHotel, getHotels } = useHotelContext();

  const onSubmit = (data: any) => {
    data.id = selectedHotel?.id;
    updateHotel(data);
    getHotels();
    onCloseModal();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div className="flex items-center ">
            <input
              {...register("name", {
                required: "Name is required",
                minLength: 2,
              })}
              defaultValue={selectedHotel?.name}
              type="text"
              autoComplete="false"
              className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
              placeholder="Name..."
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
        <div className="mb-4">
          <div className="flex items-center ">
            <input
              {...register("address", {
                required: "Address is required",
              })}
              defaultValue={selectedHotel?.address}
              type="address"
              autoComplete="false"
              className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
              placeholder="Address..."
            />
          </div>

          {errors.email?.type === "required" && (
            <p className="mt-1 text-xs italic text-red-600">
              {errors.address?.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <div className="flex items-center ">
            <input
              {...register("city", {
                required: "City is required",
              })}
              defaultValue={selectedHotel?.city}
              type="text"
              autoComplete="false"
              className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
              placeholder="City..."
            />
          </div>

          {errors.city?.type === "required" && (
            <p className="mt-1 text-xs italic text-red-600">
              {errors.city?.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <div className="flex items-center ">
            <input
              {...register("country", {
                required: "Country is required",
                minLength: 5,
              })}
              defaultValue={selectedHotel?.country}
              type="text"
              autoComplete="false"
              className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
              placeholder="Country..."
            />
          </div>

          {errors.country?.type === "required" && (
            <p className="mt-1 text-xs italic text-red-600">
              {errors.country?.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <div className="flex items-center ">
            <input
              {...register("chainId", {
                required: "ChainID is required",
                minLength: 1,
                maxLength: 5,
                max: 5,
              })}
              defaultValue={selectedHotel?.chainId}
              type="number"
              autoComplete="false"
              className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
              placeholder="ChainID..."
            />
          </div>

          {errors.chainId?.type === "required" && (
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
        <div>
          <button
            className="w-full py-3 text-sm text-center text-white rounded-lg cursor-pointer bg-slate-600 hover:bg-slate-400"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
