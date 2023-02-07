import React from "react";
import {
  BiSkipNext,
  BiSkipPrevious,
  BiDotsHorizontal,
} from "react-icons/bi";
import {
  BsSkipBackward,
  BsSkipForward,
} from "react-icons/bs";

const Pagination = () => {
  return (
    <div className="w-full flex flex-row gap-2 my-2 ">
      <div className="flex flex-row gap-2 items-center ml-auto">
        <BiSkipPrevious className="text-2xl text-secondary-900 border rounded-full border-secondary-900" />
        <div className="flex flex-row gap-2 items-center">
          <button className="outline-none text-sm text-white bg-secondary-800 w-6 h-6 rounded-full p-2 border border-secondary-900 flex justify-center items-center">
            1
          </button>
          <button className="outline-none text-sm text-gray-600 w-6 h-6 rounded-full p-2 border border-secondary-900 flex justify-center items-center">
            2
          </button>
          <button className="outline-none text-sm text-gray-600  w-6 h-6 rounded-full p-2 border border-secondary-900 flex justify-center items-center">
            3
          </button>

          <BiDotsHorizontal className="text-2xl text-gray-600" />
          <BiSkipNext className="text-2xl text-secondary-900 border border-secondary-900 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
