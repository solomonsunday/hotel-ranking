import HotelChainForm from "@/components/HotelChainForm";
import HotelChainList from "@/components/HotelChainList";
import { HotelProvider } from "@/context/HotelContext";
import React from "react";

const Chains: React.FC = () => {
  return (
    <HotelProvider>
      <div>
        <HotelChainList />
        <HotelChainForm />
      </div>
    </HotelProvider>
  );
};

export default Chains;
