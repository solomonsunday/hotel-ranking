"use client";
import React, { Fragment, useEffect, useState } from "react";
import { useHotelChainContext } from "@/context/HotelChainContext";
import { useRouter } from "next/navigation";
import HotelChainForm from "./HotelChainForm";
import CreateModal from "./modal/CreateModal";
import { Menu, Transition } from "@headlessui/react";
import EditModal from "./modal/EditModal";

const HotelChainList = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const {
    hotelChains,
    deleteHotelChain,
    getHotelChains,
    getHotelChain,
    setSelectedHotelChain,
  } = useHotelChainContext();

  const route = useRouter();

  const handleEditHotelChain = (chainId: string) => {
    const hotelChain = getHotelChain(chainId);
    setSelectedHotelChain(hotelChain);
    onEdit();
  };

  const handleDeleteHotelChainItem = (chainId: string) => {
    const hotelChain = getHotelChain(chainId);
    setSelectedHotelChain(hotelChain!);
    onDelete();
  };

  useEffect(() => {
    getHotelChains();
  }, []);

  return (
    <div className="mx-auto mt-8 md:max-w-2xl xs:px-2 sm:px-4">
      <div className="flex items-center justify-between gap-6 px-3 py-3 mb-3 bg-white border rounded-lg">
        <h2 className="mb-4 text-2xl font-bold">Hotel Chains</h2>

        <div className="flex items-baseline justify-between space-x-3">
          <div
            className="p-2 text-sm text-white rounded-lg cursor-pointer bg-slate-600"
            onClick={() => setOpenCreate(true)}
          >
            Create
          </div>
          <div
            className="p-2 text-xs text-black bg-transparent rounded-lg cursor-pointer"
            onClick={() => route.back()}
          >
            Back
          </div>
        </div>
      </div>
      <ul className="divide-y divide-gray-300">
        {hotelChains.length > 0 ? (
          hotelChains.map((chain) => (
            <li
              key={chain.id}
              className="px-3 py-2 mb-2 bg-white border rounded-lg"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {chain.name} <span className="text-sm">Star</span>
                </h3>
                {chain.id !== "0" && (
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
                                onClick={() => {
                                  handleEditHotelChain(chain.id);
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
                                onClick={() =>
                                  handleDeleteHotelChainItem(chain.id)
                                }
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
                )}
              </div>
            </li>
          ))
        ) : (
          <div className="flex items-center justify-center">
            No hotel chain found!
          </div>
        )}
      </ul>
      <CreateModal
        isOpen={openCreate}
        toggleModal={setOpenCreate}
        type="hotelchain"
      />
      <EditModal isOpen={openEdit} toggleModal={setOpenEdit} type="hotel" />
    </div>
  );
};

export default HotelChainList;
