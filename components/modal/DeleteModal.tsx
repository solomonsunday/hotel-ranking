import React from "react";
import DeleteItem from "../DeleteItem";
import ModalLayout from "../Modal";

const DeleteModal = ({
  isOpen,
  toggleModal,
}: {
  isOpen: boolean;
  toggleModal: (value: boolean) => void;
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
      <DeleteItem onCloseModal={() => toggleModal(false)} />
    </ModalLayout>
  );
};

export default DeleteModal;
