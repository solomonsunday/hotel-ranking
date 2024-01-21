import { useHotelChainContext } from "@/context/HotelChainContext";
import { useHotelContext } from "@/context/HotelContext";
import React from "react";

const DeleteHotelChianItem = ({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) => {
  const { deleteHotelChain, selectedHotelChain } = useHotelChainContext();

  const handleDeleteHotelChain = () => {
    if (selectedHotelChain) {
      deleteHotelChain(selectedHotelChain.id);
      onCloseModal();
    }
  };
  return (
    <div>
      {" "}
      <div className="">
        <p>You are about to delete this item</p>
        <div className="flex items-center justify-between">
          <div></div>
          <div
            className="px-3 py-2 text-sm text-center text-white bg-red-600 rounded-md cursor-pointer hover:bg-red-500"
            onClick={handleDeleteHotelChain}
          >
            Continue
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteHotelChianItem;
