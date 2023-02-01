import React, { useEffect } from "react"
import TableRow from "@/components/TransactionList/TableRow"
import SearchBox from "@/components/TransactionList/SearchBox"
import UserDetail from "./UserDetail"
import Button from "../elements/Button"
import Pagination from "./Pagination"
import { getTradeList } from "./fetchTrades"
import { Trade } from "./type"
import { useFormatAddress } from "@/hooks/hooks"
import { useAccount } from "wagmi"

const TradeList = () => {
  const [pendingTrades, setPendingTrades] = React.useState([]) as any
  const [tradeList, setTradeList] = React.useState([]) as any
  const [isLoading, setLoading] = React.useState(true)
  const { address } = useAccount()

  useEffect(() => {
    if (isLoading === true) {
      setLoading(false);
      (async () => {
        Promise.all(await getTradeList(9, address)).then((trades) => {
            setTradeList(trades);
            setPendingTrades(
                trades.filter(
                    (trade: Trade) => trade.status === "Pending"
                )
            );
        });
      })
    }
  }, [isLoading])

  // getTradeList(9, address).then((trades) => {
  //   setTradeList(trades)
  //   setPendingTrades(tradeList.filter((trade: Trade) => trade.status === "Pending"))
  // })

  return (
    <>
      <UserDetail
        userAddress={useFormatAddress(address)}
        transactionCount={tradeList.length + pendingTrades.length}
      />
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

      {pendingTrades.map((trade: Trade) => {
        return (
          <TableRow
            key={trade.id}
            amountOfTokenToBuy={trade.amountOfTokenToBuy}
            amountOfTokenToSell={trade.amountOfTokenToSell}
            status={trade.status}
            TransferTokenId={trade.tokenToSell}
            ReceiveTokenId={trade.tokenToBuy}
          />
        )
      })}

      <h2 className="text-lg font-semibold text-secondary-900 my-2">Other Settlements</h2>

      {tradeList.map((trade: Trade) => {
        if (trade.status !== "Pending") {
          return (
            <TableRow
              key={trade.id}
              amountOfTokenToBuy={trade.amountOfTokenToBuy}
              amountOfTokenToSell={trade.amountOfTokenToSell}
              status={trade.status}
              TransferTokenId={trade.tokenToSell}
              ReceiveTokenId={trade.tokenToBuy}
            />
          )
        }
      })}
      {tradeList.length > 5 && <Pagination />}
    </>
  )
}

export default TradeList
