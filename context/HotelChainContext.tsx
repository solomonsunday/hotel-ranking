"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import { ErrorResponse, IHotelChain } from "@/utils/interface";
import { HOTEL_CHAIN_KEY } from "@/utils/constants";

interface HotelChainContextProps {
  children: ReactNode;
}

interface HotelChainContextType {
  hotelChains: IHotelChain[];
  addHotelChain: (hotelChain: IHotelChain) => void;
  updateHotelChain: (hotelChain: IHotelChain) => void;
  getHotelChains: () => void;
  getHotelChain: (hotelChainId: string) => IHotelChain | null;
  deleteHotelChain: (hotelChainId: string) => void;
  setSelectedHotelChain: Dispatch<SetStateAction<IHotelChain | null>>;
  selectedHotelChain: IHotelChain | null;
}

const HotelChainContext = createContext<HotelChainContextType | undefined>(
  undefined
);

export const HotelChainProvider: React.FC<HotelChainContextProps> = ({
  children,
}) => {
  const [hotelChains, setHotelChains] = useState<IHotelChain[]>([]);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedHotelChain, setSelectedHotelChain] =
    useState<IHotelChain | null>(null);

  const addHotelChain = (hotelChain: IHotelChain): void => {
    if (!hotelChain) {
      setError({
        message: "Validation failed: Invalid chain input",
        status: 400,
        url: "",
      });
      return;
    }
    if (!hotelChain.id) {
      setError({
        message: "Validation failed: Please provide a valid id",
        status: 400,
        url: "",
      });
      return;
    }

    const storage = localStorage.getItem(HOTEL_CHAIN_KEY);
    let chainData: IHotelChain[] = [];
    if (storage?.length) {
      chainData = JSON.parse(storage);
    }
    localStorage.setItem(
      HOTEL_CHAIN_KEY,
      JSON.stringify([...chainData, hotelChain])
    );
    getHotelChains();
  };

  const updateHotelChain = (hotelChain: IHotelChain) => {
    const storage = localStorage.getItem(HOTEL_CHAIN_KEY);
    const data =
      storage && storage.length ? (JSON.parse(storage) as IHotelChain[]) : [];

    const foundIndex = data.findIndex((d) => d.id === hotelChain.id);
    if (foundIndex !== -1) {
      data[foundIndex].name = hotelChain.name;
      data[foundIndex].id = hotelChain.id;

      localStorage.setItem(HOTEL_CHAIN_KEY, JSON.stringify(data));
      console.log("LOCAL STORAGE UPDATE");
    } else {
      console.log("NOT UPDATED TO LOCAL STORAGE");
    }
  };

  const getHotelChains = () => {
    setLoading(true);
    const chainData = localStorage.getItem(HOTEL_CHAIN_KEY);
    setHotelChains(chainData ? JSON.parse(chainData) : []);
    setLoading(false);
  };

  const getHotelChain = (id: string): IHotelChain | null => {
    const storage = localStorage.getItem(HOTEL_CHAIN_KEY);
    const data =
      storage && storage.length ? (JSON.parse(storage) as IHotelChain[]) : [];
    const foundData = data.find((d) => d.id === id) ?? null;
    return foundData;
  };

  const deleteHotelChain = (id: string) => {
    const storage = localStorage.getItem(HOTEL_CHAIN_KEY);
    const data =
      storage && storage.length ? (JSON.parse(storage) as IHotelChain[]) : [];

    localStorage.setItem(
      HOTEL_CHAIN_KEY,
      JSON.stringify(data.filter((hotelChain) => hotelChain.id !== id))
    );

    getHotelChains();
  };

  const contextValue: HotelChainContextType = {
    hotelChains,
    addHotelChain,
    updateHotelChain,
    deleteHotelChain,
    getHotelChain,
    getHotelChains,
    selectedHotelChain,
    setSelectedHotelChain,
  };

  return (
    <HotelChainContext.Provider value={contextValue}>
      {children}
    </HotelChainContext.Provider>
  );
};

export const useHotelChainContext = () => {
  const context = useContext(HotelChainContext);
  if (!context) {
    throw new Error(
      "useHotelChainContext must be used within a HotelChainData Provider"
    );
  }
  return context;
};
