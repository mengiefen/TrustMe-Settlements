import React from "react"
import { FaSearch, FaUserCircle } from "react-icons/fa"
import { MdOutlineArrowForward } from "react-icons/md"
import TradeStatus from "../elements/TradeStatus"

type RowProps = {
  userPic?: React.ReactNode | React.ReactElement
  ReceiveAmount: string
  ReceiveTokenId?: string
  TransferAmount: string
  TransferTokenId?: string
  status: React.ReactNode | React.ReactElement
}

const TableRow = ({
  userPic = <FaUserCircle className="text-secondary-900 w-[40px] h-[40px]" />,
  ReceiveAmount,
  ReceiveTokenId = "USDT",
  TransferAmount,
  TransferTokenId = "TKN",
  status,
}: RowProps) => {
  return (
    <div className="flex flex-col gap-2 my-2 text-[14px] md:text-lg">
      <div className="flex flex-col border  border-secondary-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 p-2 items-center gap-1 shadow">
          <div className="col-span-2 text-start mr-auto">{userPic}</div>
          <div className="col-span-3 overflow-clip  text-secondary-900">
            <div className="flex flex-col">
              {ReceiveAmount}
              <span className="font-bold mr-1 text-gray-400 text-[10px]">{ReceiveTokenId}</span>
            </div>
          </div>
          <div className="col-span-3 text-secondary-900 flex-col">
            <div className="flex flex-col">
              {TransferAmount}
              <span className="font-bold mr-1 text-[10px] text-gray-400">{TransferTokenId}</span>
            </div>
          </div>
          <div className="col-span-3 overflow-hidden">
            <TradeStatus status={`${status}`} />
          </div>
          <div className="col-span-1 overflow-hidden mx-auto">
            <MdOutlineArrowForward className="text-secondary-900 hover:translate-x-[1px] transition duration-300" />
          </div>
        </div>
        {status === "Pending" && (
          <button className="outline-none border-none py-1 px-2 flex items-center justify-center bg-orange-100 text-md font-normal">
            <span className="text-bg mr-2">Pending Transaction </span>
            <MdOutlineArrowForward className="text-bg hover:translate-x-[1px] transition duration-300" />
          </button>
        )}
      </div>
    </div>
  )
}

export default TableRow
