import React from "react";
import ModalLayout from "../Modal";
import CreateForm from "../CreateForm";
import HotelChainForm from "../HotelChainForm";

const CreateModal = ({
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
        title: `${type === "hotel" ? "Add Hotel " : "Add Hotel Chain"}`,
        // size: "medium",
      }}
      modalResult={() => {
        toggleModal(false);
      }}
    >
      <>
        {type === "hotel" && (
          <CreateForm onCloseModal={() => toggleModal(false)} />
        )}
        {type === "hotelchain" && (
          <HotelChainForm onCloseModal={() => toggleModal(false)} />
        )}
      </>
    </ModalLayout>
  );
};

export default CreateModal;
