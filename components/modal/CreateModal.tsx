import React from "react";
import DeleteItem from "../DeleteItem";
import ModalLayout from "../Modal";
import CreateForm from "../CreateForm";

const CreateModal = ({
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
        title: "Add Hotel",
        // size: "medium",
      }}
      modalResult={() => {
        toggleModal(false);
      }}
    >
      <CreateForm onCloseModal={() => toggleModal(false)} />
    </ModalLayout>
  );
};

export default CreateModal;
