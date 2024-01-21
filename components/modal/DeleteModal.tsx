import React from "react";
import DeleteItem from "../DeleteItem";
import ModalLayout from "../Modal";
import DeleteHotelChianItem from "../DeleteHotelChainItem";

const DeleteModal = ({
  isOpen,
  toggleModal,
  type,
}: {
  isOpen: boolean;
  toggleModal: (value: boolean) => void;
  type: string;
}) => {
  return (
    <ModalLayout
      parameters={{
        isOpened: isOpen,
        title: "Delete Hotel",
        // size: "medium",
      }}
      modalResult={() => {
        toggleModal(false);
      }}
    >
      <>
        {type === "hotel" && (
          <DeleteItem onCloseModal={() => toggleModal(false)} />
        )}
        {type === "hotelChain" && (
          <DeleteHotelChianItem onCloseModal={() => toggleModal(false)} />
        )}
      </>
    </ModalLayout>
  );
};

export default DeleteModal;
