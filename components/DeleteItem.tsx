import { useHotelContext } from "@/context/HotelContext";
import React from "react";

const DeleteItem = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const { deleteHotel, selectedHotel } = useHotelContext();

  const handleDeleteHotel = () => {
    if (selectedHotel) {
      deleteHotel(selectedHotel.id);
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
            onClick={handleDeleteHotel}
          >
            Continue
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteItem;
