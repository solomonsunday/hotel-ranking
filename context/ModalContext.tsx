"use client";
import { ReactNode, createContext, useContext, useState } from "react";

const ModalStatusContext = createContext<{
  isOpen: boolean;
  setIsOpen?: (isOpened: boolean) => void;
  toggleModal: (value: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
  toggleModal: () => {},
});

export const ModalStatusProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const value = {
    toggleModal,
    isOpen,
  };
  return (
    <ModalStatusContext.Provider value={value}>
      {children}
    </ModalStatusContext.Provider>
  );
};
export const useModalStatusContext = () => useContext(ModalStatusContext);
