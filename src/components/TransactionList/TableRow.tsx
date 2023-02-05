import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineArrowForward } from "react-icons/md";
import TradeStatus from "../elements/TradeStatus";
import Link from "next/link";
import {
  RiArrowLeftDownLine,
  RiArrowRightUpLine,
} from "react-icons/ri";
import { getFormatAddress } from "@/utils";

interface RowProps {
  userPic?: React.ReactNode | React.ReactElement;
  buyerAddress?: string;
  ReceiveTokenId?: string;
  TransferTokenId?: string;
  amountOfTokenToBuy: string;
  amountOfTokenToSell: string;
  status: string;
  txId: number;
}

const TableRow = ({
  userPic = (
    <FaUserCircle className="text-secondary-900 w-[40px] h-[40px]" />
  ),
  buyerAddress = "",
  amountOfTokenToBuy,
  ReceiveTokenId = "USDT",
  amountOfTokenToSell,
  TransferTokenId = "TKN",
  status,
  txId,
}: RowProps) => {
  return (
    <div className="flex flex-col gap-2 my-2 text-[14px] md:text-lg">
      <div className="flex flex-col border  border-secondary-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 p-2 md:p-1 items-center gap-1 shadow">
          <div className="col-span-2 text-start mr-auto">
            <a
              href={`https://goerli.etherscan.io/address/${buyerAddress}`}
              className="flex flex-col md:gap-1"
              target="_blank"
              rel="noreferrer"
            >
              {userPic}
              <span className="text-sm text-secondary-900 hidden md:block md:tracking-wid lg:tracking-wider">
                {getFormatAddress(buyerAddress)}
              </span>
            </a>
          </div>

          <div className="col-span-3 overflow-clip  text-secondary-900 flex items-center">
            {
              <RiArrowLeftDownLine className="text-green-500 inline-block mr-1 md:mr-2 border border-green-400 rounded-full bg-green-100" />
            }
            <div className="flex flex-col">
              {amountOfTokenToBuy}
              <span className="mr-1 text-gray-400 text-[20px]">
                {ReceiveTokenId}
              </span>
            </div>
          </div>
          <div className="col-span-3 text-secondary-900 flex items-center">
            {
              <RiArrowRightUpLine className="text-red-500 inline-block mr-1 md:mr-2 border border-red-400 bg-red-100 rounded-full" />
            }
            <div className="flex flex-col">
              {amountOfTokenToSell}
              <span className="mr-1 text-gray-400 text-[20px] ">
                {TransferTokenId}
              </span>
            </div>
          </div>

          <div className="col-span-3 overflow-hidden">
            <TradeStatus status={status} />
          </div>
          <div className="col-span-1 overflow-hidden mx-auto">
            <Link href={`/list/${txId}`}>
              <MdOutlineArrowForward className="text-secondary-900 hover:translate-x-[2px] transition duration-150 text-2xl md:text-2xl" />
            </Link>
          </div>
        </div>

        {status === "Pending" && (
          <Link
            href={`/list/${txId}`}
            className="outline-none border-none py-1 px-2 flex items-center justify-center bg-secondary-50 text-sm font-normal"
          >
            <span className="mr-2 text-orange-900">
              Confirmation required
            </span>

            <MdOutlineArrowForward className="hover:translate-x-1 transition duration-200 text-bg" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default TableRow;
