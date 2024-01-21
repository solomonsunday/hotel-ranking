"use client";
import HotelList from "@/components/HotelList";
import DeleteModal from "@/components/modal/DeleteModal";
import EditModal from "@/components/modal/EditModal";
import ViewModal from "@/components/modal/ViewModal";
import { useState } from "react";

export default function Home() {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);

  return (
    <div>
      <HotelList
        onDelete={() => setOpenDelete(true)}
        onEdit={() => setOpenEdit(true)}
        onView={() => setOpenView(true)}
      />

      <EditModal isOpen={openEdit} toggleModal={setOpenEdit} type="hotel" />
      <DeleteModal
        isOpen={openDelete}
        toggleModal={setOpenDelete}
        type="hotel"
      />
      <ViewModal isOpen={openView} toggleModal={setOpenView} />
    </div>
  );
}
