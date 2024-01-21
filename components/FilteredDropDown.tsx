import React, { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useHotelChainContext } from "@/context/HotelChainContext";

const FilterDropdown = ({
  onFilterChange,
}: {
  onFilterChange: (value: number) => void;
}) => {
  const { getHotelChains, hotelChains } = useHotelChainContext();
  useEffect(() => {
    getHotelChains();
  }, []);

  const handleFilterChange = (chainId: number) => {
    onFilterChange(chainId);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-sm font-medium">
        <Menu as="div" className="relative inline-block text-center">
          <div className="text-center">
            <Menu.Button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-black rounded-md bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-slate-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
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
            <Menu.Items className="absolute right-0 z-50 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <button
                  className={`group hover:bg-slate-100 w-full items-center rounded-md px-2 py-3 text-black text-sm`}
                  onClick={() => handleFilterChange(0)}
                >
                  All
                </button>
              </Menu.Item>

              {hotelChains.map((data) => {
                return (
                  <Menu.Item>
                    <button
                      className={`group hover:bg-slate-100  w-full items-center rounded-md px-2 py-3 text-sm text-black`}
                      onClick={() => handleFilterChange(data.name)}
                    >
                      {data.name + " Star"}
                    </button>
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
export default FilterDropdown;
