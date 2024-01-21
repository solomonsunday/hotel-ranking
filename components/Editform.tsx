import { useHotelChainContext } from "@/context/HotelChainContext";
import { useHotelContext } from "@/context/HotelContext";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import EditModal from "./modal/EditModal";

const EditForm = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<any>({ mode: "onChange" });

  const { selectedHotel, updateHotel, getHotels } = useHotelContext();

  const [address, setAddress] = useState("");
  const { hotelChains, getHotelChains, selectedHotelChain } =
    useHotelChainContext();
  const [coordinates, setCoordinates] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (!selectedHotel) return;
    setValue("name", selectedHotel?.name, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("city", selectedHotel.city, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("country", selectedHotel.country, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("chainId", selectedHotel.chainId, {
      shouldDirty: true,
      shouldValidate: true,
    });
    // setValue("address", selectedHotel.address, {
    //   shouldDirty: true,
    //   shouldValidate: true,
    // });
  }, [selectedHotel]);

  useEffect(() => {
    getHotelChains();
  }, []);

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
    data.id = selectedHotel?.id;
    data.chainId = +data.chainId;
    data.address = address;
    updateHotel(data);
    getHotels();
    onCloseModal();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Hotel Name
          </label>
          <div className="flex items-center ">
            <input
              {...register("name", {
                required: "Name is required",
                minLength: 2,
              })}
              type="text"
              autoComplete="false"
              className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
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
          <label className="block text-sm font-medium text-gray-600">
            Address
          </label>
          <div>
            <PlacesAutocomplete
              value={address === "" ? selectedHotel?.address : address}
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

          {errors.email?.type === "required" && (
            <p className="mt-1 text-xs italic text-red-600">
              {errors.address?.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            City
          </label>
          <div className="flex items-center ">
            <input
              {...register("city", {
                required: "City is required",
              })}
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
          <label className="block text-sm font-medium text-gray-600">
            Country
          </label>
          <div className="flex items-center ">
            <input
              {...register("country", {
                required: "Country is required",
                minLength: 5,
              })}
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
          <label className="block text-sm font-medium text-gray-600">
            ChainID
          </label>
          <div className="flex items-center ">
            <select
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              {...register("chainId", {
                required: "chainId is required",
                minLength: 1,
                max: 5,
              })}
            >
              {hotelChains &&
                hotelChains.map((item) => {
                  return (
                    <option value={item.name} key={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
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
            className="w-full py-3 text-sm text-center text-white rounded-lg cursor-pointer bg-slate-600"
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
