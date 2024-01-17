import React from "react";
import ModalLayout from "../Modal";
import View from "../View";

const ViewModal = ({
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
        title: "View Hotel",
        position: "right",
      }}
      modalResult={() => {
        toggleModal(false);
      }}
    >
      <View />
    </ModalLayout>
  );
};

export default ViewModal;
