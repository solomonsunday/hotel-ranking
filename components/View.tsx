import { useHotelContext } from "@/context/HotelContext";
import Image from "next/image";
import React from "react";
import Map from "./GoogleMap";

const View = () => {
  const { selectedHotel } = useHotelContext();
  const center = {
    lat: 7.2905715, // default latitude
    lng: 80.6337262, // default longitude
  };

  return (
    <div className="flex-col items-center justify-center">
      <div className="pb-10 rounded-3xl">
        <Map center={center} />
      </div>
      <div className="px-5">
        <p>
          <span className="font-semibold">Name</span> : {selectedHotel?.name}
        </p>
        <p>
          <span className="font-semibold">Address</span> :{" "}
          {selectedHotel?.address}
        </p>
        <p>
          <span className="font-semibold">City</span> : {selectedHotel?.city}
        </p>
        <p>
          <span className="font-semibold">Country</span> :{" "}
          {selectedHotel?.country}
        </p>
      </div>
    </div>
  );
};

export default View;
