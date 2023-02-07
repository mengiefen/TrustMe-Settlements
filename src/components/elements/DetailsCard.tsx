import { useFormatAddress } from "@/hooks/hooks";
import React from "react";
import { BsLink } from "react-icons/bs";
import { RiExchangeDollarLine } from "react-icons/ri";

type DetailsCardProps = {
  address: `0x${string}` | string | undefined;
  amount: string;
  symbol: any;
};

const DetailsCard = (props: DetailsCardProps) => {
  return (
    <div className="w-11/12 h-[175px] bg-text py-3 border-[1px] border-secondary-100 rounded-md shadow ">
      <div className="flex flex-row justify-start items-center">
        <BsLink className="mx-2 text-xl" />
        <h5 className="text-dark font-bold tracking-wide">
          {" "}
          Connected address{" "}
        </h5>
      </div>

      <div className="flex flex-row pl-9">
        <span className="text-light text-md mt-[4px]">
          {useFormatAddress(props.address)}
        </span>
      </div>

      <div className="flex flex-row items-center mt-5">
        <RiExchangeDollarLine className="mx-2" />
        <h5 className="text-dark font-bold tracking-wide ml-1">
          {" "}
          Token{" "}
        </h5>
        <span className="ml-4 text-xl justify-center pt-[2px]">
          &#45;
        </span>
        <span className="text-md pt-[2px] ml-4">
          {props.amount} {props.symbol}
        </span>
      </div>
    </div>
  );
};

export default DetailsCard;
