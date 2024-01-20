"use client";
import React, { Fragment, useEffect, useState } from "react";
import { useHotelContext } from "../context/HotelContext";
import CreateModal from "./modal/CreateModal";
import { IHotel } from "@/utils/interface";
import SearchBar from "./Search";
import FilterDropdown from "./FilteredDropDown";
import Link from "next/link";
import { useHotelChainContext } from "@/context/HotelChainContext";
import HotelListItem from "./HotelListItem";

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
  const { getHotelChains, hotelChains } = useHotelChainContext();
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [filteredHotelData, setFilteredhotelData] =
    useState<IHotel[]>(hotelData);

  useEffect(() => {
    getHotels();
    getHotelChains;
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
          Create
        </div>
        <Link href="/chains">
          <div className="w-auto p-2 text-sm text-black bg-transparent rounded-lg cursor-pointer">
            Chains
          </div>
        </Link>
      </div>
      <ul className="divide-y divide-gray-300">
        {filteredHotelData.length > 0 ? (
          filteredHotelData.map((hotel) => (
            <HotelListItem
              key={hotel.id}
              hotel={hotel}
              handleViewHotel={handleViewHotel}
              handleEditHotel={handleEditHotel}
              handleDeleteHotel={handleDeleteHotel}
            />
          ))
        ) : (
          <div className="flex items-center justify-center">
            No hotel found!
          </div>
        )}
      </ul>
      <CreateModal isOpen={openCreate} toggleModal={setOpenCreate} />
    </div>
  );
};

export default HotelList;
