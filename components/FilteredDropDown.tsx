import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

const FilterDropdown = ({
  onFilterChange,
}: {
  //   options: number[];
  onFilterChange: (value: number) => void;
}) => {
  const options = [0, 1, 2, 3, 4, 5];
  const handleFilterChange = (chainId: number) => {
    console.log(chainId, "chainID");
    onFilterChange(chainId);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-sm font-medium">
        <Menu as="div" className="relative inline-block text-center">
          <div className="text-center">
            <Menu.Button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
              {options.map((data) => {
                return (
                  <div className="px-1 py-1 text-center">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "text-gray-200" : "text-black-900"
                          } group  w-full items-center rounded-md px-2 py-2 text-sm text-black`}
                          onClick={() => handleFilterChange(data)}
                        >
                          {data === 0 ? "All" : data + " Star"}
                        </button>
                      )}
                    </Menu.Item>
                  </div>
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
