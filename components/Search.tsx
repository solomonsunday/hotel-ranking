import { IKeywords } from "@/utils/interface";
import React, { ChangeEvent, useState } from "react";

const SearchBar = ({ onSearch }: IKeywords) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <>
      <div className="w-full ml-2 border rounded-md border-slate-400 md:w-96">
        <input
          type="text"
          value={searchQuery}
          className="px-2 py-2 text-xs bg-transparent focus:outline-none md:w-96 placeholder:px-1 placeholder:text-xs"
          placeholder={"Find a hotel"}
          key="search-bar"
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default SearchBar;
