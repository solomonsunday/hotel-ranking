import { useHotelContext } from "@/context/HotelContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Map from "./GoogleMap";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const View = () => {
  const { selectedHotel } = useHotelContext();
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  console.log(selectedHotel, "selectedHotel");

  useEffect(() => {
    getLatAndLog();
  }, [selectedHotel]);

  const getLatAndLog = async () => {
    const results = await geocodeByAddress(selectedHotel?.address!);
    const ll: google.maps.LatLngLiteral = await getLatLng(results[0]);
    setCenter(ll);
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
