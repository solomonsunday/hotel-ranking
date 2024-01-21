import React from "react";
import ModalLayout from "../Modal";
import EditForm from "../Editform";
import EditHotelChain from "../EditHotelChain";

const EditModal = ({
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
        title: `${type === "hotel" ? "Edit Hotel " : "Edit Hotel Chain"}`,
      }}
      modalResult={() => {
        toggleModal(false);
      }}
    >
      <>
        {type === "hotel" && (
          <EditForm onCloseModal={() => toggleModal(false)} />
        )}
        {type === "hotelChain" && (
          <EditHotelChain onCloseModal={() => toggleModal(false)} />
        )}
      </>
    </ModalLayout>
  );
};

export default EditModal;
