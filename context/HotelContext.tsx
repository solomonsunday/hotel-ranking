"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

import { ErrorResponse, IHotel, IHotelChain } from "@/utils/interface";
import { HOTEL_KEY } from "@/utils/constants";

interface HotelContextProps {
  children: ReactNode;
}

interface HotelContextType {
  hotelData: IHotel[];
  hotelChains: IHotelChain[];
  getHotels: () => void;
  createHotel: (hotel: IHotel) => void;
  updateHotel: (hotel: IHotel) => void;
  deleteHotel: (hotelId: string) => void;
  addHotelChain: (chain: IHotelChain) => void;
  editHotelChain: (chain: IHotelChain) => void;
  deleteHotelChain: (chainId: string) => void;
  getHotel: (id: string) => IHotel | null;
  setSelectedHotel: Dispatch<SetStateAction<IHotel | null>>;
  selectedHotel: IHotel | null;

  //   searchHotels: (hotel:IHotel) => void
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<HotelContextProps> = ({ children }) => {
  const [hotelData, setHotelData] = useState<IHotel[]>([]);
  const [hotelChains, setHotelChains] = useState<IHotelChain[]>([]);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<IHotel | null>(null);

  const createHotel = (hotel: IHotel): void => {
    if (!hotel) {
      setError({
        message: "Validation failed: Invalid hotel input",
        status: 400,
        url: "",
      });
      return;
    }

    if (!hotel.id) {
      setError({
        message: "Validation failed: Please provide a valid id",
        status: 400,
        url: "",
      });
      return;
    }

    const storage = localStorage.getItem(HOTEL_KEY);
    let data: IHotel[] = [];
    if (storage?.length) {
      data = JSON.parse(storage);
    }

    localStorage.setItem(HOTEL_KEY, JSON.stringify([...data, hotel]));
    getHotels();
  };

  const getHotels = () => {
    setLoading(true);
    const data = localStorage.getItem(HOTEL_KEY);
    console.log(data, "data");
    setHotelData(data ? JSON.parse(data) : []);
    setLoading(false);
  };

  const getHotel = (id: string): IHotel | null => {
    const storage = localStorage.getItem(HOTEL_KEY);
    const data =
      storage && storage.length ? (JSON.parse(storage) as IHotel[]) : [];
    console.log("stage data", data);
    const foundData = data.find((d) => d.id === id) ?? null;
    console.log("found data", foundData);
    return foundData;
  };

  //   const editHotel = (updatedHotel: IHotel) => {
  //     setHotelData((prevHotels) =>
  //       prevHotels.map((hotel) =>
  //         hotel.id === updatedHotel.id ? updatedHotel : hotel
  //       )
  //     );
  //   };
  const updateHotel = (hotel: IHotel) => {
    const storage = localStorage.getItem(HOTEL_KEY);
    const data =
      storage && storage.length ? (JSON.parse(storage) as IHotel[]) : [];

    const foundIndex = data.findIndex((d) => d.id === hotel.id);
    if (foundIndex !== -1) {
      data[foundIndex].name = hotel.name;
      data[foundIndex].address = hotel.address;
      data[foundIndex].city = hotel.city;
      data[foundIndex].country = hotel.country;
      data[foundIndex].chainId = hotel.chainId;
      localStorage.setItem(HOTEL_KEY, JSON.stringify(data));
      console.log("LOCAL STORAGE UPDATE");
    } else {
      console.log("NOT UPDATED TO LOCAL STORAGE");
    }
  };

  const deleteHotel = (id: string) => {
    const storage = localStorage.getItem(HOTEL_KEY);
    const data =
      storage && storage.length ? (JSON.parse(storage) as IHotel[]) : [];

    localStorage.setItem(
      HOTEL_KEY,
      JSON.stringify(data.filter((hotel) => hotel.id !== id))
    );

    getHotels();
  };

  const searchHotels = (value: string): IHotel[] => {
    const storage = localStorage.getItem(HOTEL_KEY);
    const data =
      storage && storage.length ? (JSON.parse(storage) as IHotel[]) : [];

    return data.filter((hotel) =>
      hotel.name.toLowerCase().includes(value.toLowerCase())
    );
  };

  const addHotelChain = (chain: IHotelChain) => {
    setHotelChains((prevChains) => [...prevChains, chain]);
  };

  const editHotelChain = (updatedChain: IHotelChain) => {
    setHotelChains((prevChains) =>
      prevChains.map((chain) =>
        chain.id === updatedChain.id ? updatedChain : chain
      )
    );
  };
  const deleteHotelChain = (id: string) => {
    setHotelChains((prevChains) =>
      prevChains.filter((chain) => chain.id !== id)
    );
  };

  // Implement editHotel, deleteHotel, addHotelChain, editHotelChain, deleteHotelChain as needed

  const contextValue: HotelContextType = {
    hotelData,
    hotelChains,
    createHotel,
    getHotels,
    updateHotel,
    deleteHotel,
    addHotelChain,
    editHotelChain,
    deleteHotelChain,
    getHotel,
    setSelectedHotel,
    selectedHotel,
  };

  return (
    <HotelContext.Provider value={contextValue}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotelContext = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useHotelContext must be used within a HotelProvider");
  }
  return context;
};
