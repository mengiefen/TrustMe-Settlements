import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  return (
    <div className="my-2 md:mt-3 md:mb-5">
      <div className="relative h-10 md:h-12 my-2">
        <input
          type="text"
          className="w-full md:w-auto h-full pl-10 pr-4 border border-secondary-300 
        rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 
        focus:border-transparent"
        />
        <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-secondary-200" />
      </div>
    </div>
  );
};

export default SearchBox;
