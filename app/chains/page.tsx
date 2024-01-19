import HotelChainForm from "@/components/HotelChainForm";
import HotelChainList from "@/components/HotelChainList";
import { HotelChainProvider } from "@/context/HotelChainContext";
import React from "react";

const Chains: React.FC = () => {
  return (
    <HotelChainProvider>
      <div>
        <HotelChainList />
        <HotelChainForm />
      </div>
    </HotelChainProvider>
  );
};

export default Chains;
