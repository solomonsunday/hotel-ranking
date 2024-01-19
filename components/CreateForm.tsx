"use client";
import React, { useState } from "react";
import { useHotelContext } from "../context/HotelContext";
import { uuid } from "uuidv4";
import { useForm } from "react-hook-form";
import { IHotel } from "@/utils/interface";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const CreateForm = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const { createHotel } = useHotelContext();
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({ mode: "onChange" });

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const handleSelectAddress = async (address: string) => {
    const results = await geocodeByAddress(address);
    const ll: google.maps.LatLngLiteral = await getLatLng(results[0]);
    setAddress(address);
    setValue("address", address, { shouldValidate: true });
    setCoordinates(ll);
  };

  const handleChange = (address: string) => {
    setAddress(address);
  };

  const onSubmit = (data: any) => {
    data.id = uuid();
    data.chainId = +data.chainId;
    data.address = address;
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
            <PlacesAutocomplete
              value={address}
              onChange={handleChange}
              onSelect={(address) => handleSelectAddress(address)}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className:
                        "w-full p-2 mt-1 border border-gray-300 rounded location-search-input",
                    })}
                  />
                  {address && (
                    <div className="px-2 py-2 bg-white autocomplete-dropdown-container ">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </PlacesAutocomplete>
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
