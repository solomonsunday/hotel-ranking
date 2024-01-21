"use client";
import HotelChainList from "@/components/HotelChainList";
import DeleteModal from "@/components/modal/DeleteModal";
import EditModal from "@/components/modal/EditModal";
import React, { useState } from "react";

const Chains: React.FC = () => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);

  return (
    <div>
      <HotelChainList
        onEdit={() => setOpenEdit(true)}
        onDelete={() => setOpenDelete(true)}
      />
      <EditModal
        isOpen={openEdit}
        toggleModal={setOpenEdit}
        type="hotelChain"
      />
      <DeleteModal
        isOpen={openDelete}
        toggleModal={setOpenDelete}
        type="hotelChain"
      />
    </div>
  );
};

export default Chains;
