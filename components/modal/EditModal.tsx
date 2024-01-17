import React from "react";
import ModalLayout from "../Modal";
import EditForm from "../Editform";

const EditModal = ({
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
        title: "Edit Hotel",
        // size: "medium",
      }}
      modalResult={() => {
        toggleModal(false);
      }}
    >
      <EditForm onCloseModal={() => toggleModal(false)} />
    </ModalLayout>
  );
};

export default EditModal;
