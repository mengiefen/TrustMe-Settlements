import React, { useEffect } from "react"
import TableRow from "@/components/TransactionList/TableRow"
import SearchBox from "@/components/TransactionList/SearchBox"
import UserDetail from "./UserDetail"
import Button from "../elements/Button"
import Pagination from "./Pagination"
import { getLastTransactions, getTradeList } from "./fetchTrades"
import { Trade } from "./type"
import { useFormatAddress } from "@/hooks/hooks"
import { useAccount } from "wagmi"
import Spinner from "../elements/Spinner"
import { useDispatch, useSelector } from "react-redux"
import { fetchTradesPending, fetchTrades } from "@/redux/trade/tradesSlice"

const TradeList = () => {
  const [pendingTrades, setPendingTrades] = React.useState([]) as any
  const tradeList = useSelector((state: any) => state.trades.data)
  const [isLoading, setLoading] = React.useState(true)
  const { address } = useAccount()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchTradeList = async () => {
      dispatch(fetchTradesPending())
      const data = await getTradeList(tradeList, address)
      dispatch(fetchTrades(data))
      setPendingTrades(data.filter((trade: Trade) => trade.status === "Pending"))
      setLoading(false)
    }

    fetchTradeList()
  }, [dispatch, tradeList, address])

  return (
    <div className="w-screen px-5 md:px-10">
      <UserDetail userAddress={useFormatAddress(address)} transactionCount={tradeList.length} />

      {isLoading ? (
        <div className="flex justify-center items-center h-full mt-10">
          <Spinner />
        </div>
      ) : (
        <>
          <SearchBox />

          <div className="flex justify-between mb-2 mt-3">
            <h2 className="text-lg font-semibold text-secondary-900 ">
              {pendingTrades.length > 0 ? "Action Required" : "No pending trades"}
            </h2>
            <Button
              label="View All"
              size="medium"
              bg="bg-bg flex flex-row gap-2 items-center justify-center px-5 text-sm"
              variant="secondary"
            />
          </div>

          <div className="flex flex-col gap-2 my-2 text-[14px] md:text-lg">
            <div className="flex flex-col border  border-secondary-400 rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 p-2 items-center gap-1 shadow bg-secondary-50">
                <div className="col-span-2 text-secondary-900 md:text-lg md:uppercase md:font-semibold">
                  CP
                </div>
                <div className="col-span-3 overflow-clip  text-secondary-900 md:text-lg md:uppercase md:font-semibold">
                  Receiver
                </div>
                <div className="col-span-3 text-secondary-900 flex-col md:text-lg md:uppercase md:font-semibold">
                  Sender
                </div>
                <div className="col-span-3 text-secondary-900 overflow-hidden text-center md:text-lg md:uppercase md:font-semibold">
                  Status
                </div>
                <div className="col-span-1 overflow-hidden"></div>
              </div>
            </div>
          </div>

          {pendingTrades.map((trade: Trade, index: number) => {
            return (
              <TableRow
                key={index}
                buyerAddress={trade.buyer}
                amountOfTokenToBuy={trade.amountOfTokenToBuy}
                amountOfTokenToSell={trade.amountOfTokenToSell}
                status={trade.status}
                TransferTokenId={trade.symbolToSell}
                ReceiveTokenId={trade.symbolToBuy}
                txId={trade.id}
              />
            )
          })}

          <h2 className="text-lg font-semibold text-secondary-900 my-2">Other Settlements</h2>

          {getLastTransactions(tradeList, 5).map((trade: Trade, index: number) => {
            if (trade.status !== "Pending") {
              return (
                <TableRow
                  key={index}
                  buyerAddress={trade.buyer}
                  amountOfTokenToBuy={trade.amountOfTokenToBuy}
                  amountOfTokenToSell={trade.amountOfTokenToSell}
                  status={trade.status}
                  TransferTokenId={trade.symbolToSell}
                  ReceiveTokenId={trade.symbolToBuy}
                  txId={trade.id}
                />
              )
            }
          })}
          {tradeList.length > 5 && <Pagination />}
        </>
      )}
    </div>
  )
}

export default TradeList
