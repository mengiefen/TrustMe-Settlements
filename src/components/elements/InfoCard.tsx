import React from "react";

type InfoCardProps = {
  label: string;
  value: string;
};

const InfoCard = (props: InfoCardProps) => {
  const { label, value } = props;

  return (
    <div
      className={`flex flex-col px-[10px] border-b-4 shadow-[0px_1px_2px_0px] shadow-secondary-600 bg-menu-dark items-start justify-between rounded-md w-full h-full py-5 md:py-6  ${
        value == "Expired"
          ? " border-gray-500 "
          : value == "Completed"
          ? " border-green-500 "
          : value == "Pending"
          ? " border-yellow-500 "
          : value == "Canceled"
          ? " border-red-500 "
          : value == "Withdrawn"
          ? "border-secondary-500"
          : "border-slate-600 "
      }`}
    >
      <div className="flex items-center justify-start">
        <span className="text-gray-300 text-xs md:text-sm md:text-gray-300">
          {label}
        </span>
      </div>
      <div className="flex items-center justify-start mt-2">
        <span className="flex flex-row items-center text-secondary-700  text-sm font-normal md:text-sm md:font-medium md:tracking-wider">
          {/* <span><AiOutlineCopy className='w-1/10 h-11/12 pr-1'/></span> */}
          {value}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
