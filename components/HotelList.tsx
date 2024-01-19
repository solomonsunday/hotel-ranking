"use client";
import React, { Fragment, useEffect, useState } from "react";
import { useHotelContext } from "../context/HotelContext";
import { Menu, Transition } from "@headlessui/react";
import CreateModal from "./modal/CreateModal";
import { IHotel } from "@/utils/interface";
import SearchBar from "./Search";
import FilterDropdown from "./FilteredDropDown";

const HotelList = ({
  onEdit,
  onDelete,
  onView,
}: {
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}) => {
  const { hotelData, setSelectedHotel, getHotel, getHotels } =
    useHotelContext();
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const [filteredHotelData, setFilteredhotelData] =
    useState<IHotel[]>(hotelData);

  const options: number[] = [1, 2, 3, 4, 5];

  useEffect(() => {
    getHotels();
  }, []);
  useEffect(() => {
    if (hotelData) {
      setFilteredhotelData(hotelData);
    }
  }, [hotelData]);

  const handleViewHotel = (id: string) => {
    const hotel = getHotel(id);
    setSelectedHotel(hotel);
    onView();
  };

  const handleDeleteHotel = (id: string) => {
    const hotel = getHotel(id);
    setSelectedHotel(hotel!);
    onDelete();
  };

  const handleEditHotel = (id: string) => {
    const hotel = getHotel(id);
    setSelectedHotel(hotel);
    onEdit();
  };

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setFilteredhotelData(hotelData);
    } else {
      const filteredData =
        hotelData &&
        hotelData.filter((data) => {
          return data.name.toLowerCase().includes(query.toLowerCase());
        });
      setFilteredhotelData(filteredData);
      //   return filteredData;
    }
  };

  const handleFilterChange = (selectedValue: number) => {
    setFilteredhotelData(hotelData);
    if (!selectedValue || selectedValue === 0) {
      setFilteredhotelData(hotelData);
    } else {
      const filteredResults = hotelData.filter((item) => {
        return item.chainId === selectedValue;
      });
      console.log(filteredResults, "filteredResults");
      setFilteredhotelData(filteredResults);
    }
  };

  return (
    <div className="mx-auto mt-8 md:max-w-2xl xs:px-2 sm:px-4">
      <div className="flex items-center justify-between gap-6 py-3 pr-3 mb-3 bg-white border rounded-lg">
        {/* <div className="flex items-center justify-center cursor-pointer"> */}
        <div className="flex w-full">
          <SearchBar onSearch={handleSearch} />
          {hotelData && (
            <FilterDropdown
              onFilterChange={(selectedValue) =>
                handleFilterChange(selectedValue)
              }
            />
          )}
        </div>
        <div
          className="p-2 text-sm text-white rounded-lg cursor-pointer bg-slate-600 hover:bg-slate-400"
          onClick={() => setOpenCreate(true)}
        >
          {" "}
          Create
        </div>
      </div>
      {/* </div> */}
      <ul className="divide-y divide-gray-300">
        {filteredHotelData.map((hotel) => (
          <li
            key={hotel.id}
            className="px-3 py-2 mb-2 bg-white border rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{hotel.name}</h3>
                <p className="text-sm text-gray-600">
                  {hotel.city}, {hotel.country} , {hotel.chainId}
                  <span> Star</span>
                </p>
              </div>
              {/* <button
                className="px-2 py-1 text-white bg-red-500 rounded"
                onClick={() => deleteHotel(hotel.id)}
              >
                Delete
              </button> */}
              <div>
                {/* <EllipsisHorizontalIcon width={20} /> */}
                <div className="">
                  <Menu as="div" className="relative inline-block text-center">
                    <div>
                      <Menu.Button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-50 w-40 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-gray-200 text-black"
                                    : "text-black-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                onClick={() => handleViewHotel(hotel.id)}
                              >
                                View
                              </button>
                            )}
                          </Menu.Item>
                        </div>

                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => {
                                  handleEditHotel(hotel.id);
                                }}
                                className={`${
                                  active
                                    ? "bg-gray-200 text-black"
                                    : "text-black-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                Edit
                              </button>
                            )}
                          </Menu.Item>
                        </div>

                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleDeleteHotel(hotel.id)}
                                className={`${
                                  active
                                    ? "bg-gray-200 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm  text-red-500`}
                              >
                                Delete
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <CreateModal isOpen={openCreate} toggleModal={setOpenCreate} />
    </div>
  );
};

export default HotelList;
