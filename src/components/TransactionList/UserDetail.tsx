import React from "react";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { BsLink, BsPlus } from "react-icons/bs";
import Link from "next/link";
import { useIsMounted } from "@/hooks/useIsMounted";
import { UserDetailProps } from "./type";

const UserDetail = ({ userAddress, transactionCount }: UserDetailProps) => {
  const isMounted = useIsMounted();

  return (
    <div className="flex flex-row justify-between items-center mt-3">
      <div className="flex flex-col gap-5 shadow-[0px_5px_15px_0px] shadow-purplish-900 p-3 rounded bg-menu-dark border-[0.2px] border-slate-800 md:w-[60%] md:text-md md:mb-5">
        <div className="flex flex-row gap-5">
          <CgArrowsExchangeAlt className="text-2xl md:text-3xl text-secondary-900" />
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="text-text">Connected Address</h3>
            {isMounted && (
              <h4 className="text-sm text-secondary-600 tracking-wider">
                {userAddress}
              </h4>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-5 items-center">
          <BsLink className="text-2xl md:text-3xl text-secondary-600" />
          <h3 className="text-text">
            Transactions - <span>{transactionCount}</span>
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-center items-center my-auto md:w-[30%] ">
        <button
          type="button"
          className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-full p-[3px]
           bg-secondary-800 text-white outline-none border-none hover:outline-none hover:shadow-[0px_0px_30px_0px]
            hover:shadow-purplish-800 hover:bg-none focus:outline-none focus:bg-none flex flex-col items-center
             justify-center hover:bg-secondary-900 transition duration-300 ease-in-out"
        >
          <Link href="/addTrade">
            <BsPlus className="text-5xl md:text-7xl" />
          </Link>
        </button>
        <span className="font-semibold md:uppercase md:text-lg md:tracking-widest">
          Create Trade
        </span>
      </div>
    </div>
  );
};

export default UserDetail;
