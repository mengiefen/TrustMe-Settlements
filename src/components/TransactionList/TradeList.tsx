import React from "react"
import TableRow from "@/components/TransactionList/TableRow"
import SearchBox from "@/components/TransactionList/SearchBox"
import UserDetail from "./UserDetail"
import trades from "./data"
import Button from "../elements/Button"
import Pagination from "./Pagination"

const TradeList = () => {
  const PendingTrades = trades.filter((trade) => trade.status === "Pending")
  return (
    <>
      <UserDetail />
      <SearchBox />
      <div className="flex justify-between mb-2 mt-3">
        <h2 className="text-lg font-semibold text-secondary-900 ">Action Required</h2>
        <Button
          label="View All"
          size="medium"
          bg="bg-bg flex flex-row gap-2 items-center justify-center px-5 text-sm"
          variant="secondary"
        />
      </div>

      <div className="flex flex-col gap-2 my-2 text-[14px] md:text-lg">
        <div className="flex flex-col border  border-secondary-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 p-2 items-center gap-1 shadow">
            <div className="col-span-2">CP</div>
            <div className="col-span-3 overflow-clip  text-secondary-900">Receiver</div>
            <div className="col-span-3 text-secondary-900 flex-col">Sender</div>
            <div className="col-span-3 overflow-hidden text-center">Status</div>
            <div className="col-span-1 overflow-hidden"></div>
          </div>
        </div>
      </div>

      {PendingTrades.map((trade, index) => {
        return <TableRow key={index} {...trade} />
      })}

      <h2 className="text-lg font-semibold text-secondary-900 my-2">Other Settlements</h2>

      {trades.map((trade, index) => {
        if (trade.status !== "Pending") {
          return <TableRow key={index} {...trade} />
        }
      })}

      <Pagination />
    </>
  )
}

export default TradeList
