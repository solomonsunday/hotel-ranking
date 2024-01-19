"use client";
import HotelList from "@/components/HotelList";
import CreateModal from "@/components/modal/CreateModal";
import DeleteModal from "@/components/modal/DeleteModal";
import EditModal from "@/components/modal/EditModal";
import ViewModal from "@/components/modal/ViewModal";
import { HotelChainProvider } from "@/context/HotelChainContext";
import { HotelProvider } from "@/context/HotelContext";
import { useState } from "react";

export default function Home() {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);

  return (
    <HotelProvider>
      <HotelChainProvider>
        <div>
          <HotelList
            onDelete={() => setOpenDelete(true)}
            onEdit={() => setOpenEdit(true)}
            onView={() => setOpenView(true)}
          />
          <CreateModal isOpen={openCreate} toggleModal={setOpenCreate} />
          <DeleteModal isOpen={openDelete} toggleModal={setOpenDelete} />
          <EditModal isOpen={openEdit} toggleModal={setOpenEdit} />
          <ViewModal isOpen={openView} toggleModal={setOpenView} />
        </div>
      </HotelChainProvider>
    </HotelProvider>
  );
}
