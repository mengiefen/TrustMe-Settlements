import React, { useEffect } from "react"
import TableRow from "@/components/TransactionList/TableRow"
import SearchBox from "@/components/TransactionList/SearchBox"
import UserDetail from "./UserDetail"
import Button from "../elements/Button"
import Pagination from "./Pagination"
import { getTrade, getTradesIDsByUser, getTradesList } from "../../helpers/getterHelpers"
import { BigNumber } from "ethers"
import { getStatus, getSymbol } from "@/utils"
import { formatEther } from "ethers/lib/utils.js"
import { Trade } from "./type"
import { useFormatAddress } from "@/hooks/hooks"
import { useSelector, useDispatch } from "react-redux"
import { updateTrades } from "@/redux/trade/tradesSlice"
import { RootState } from "@/redux/store"

const TradeList = () => {
  const [pendingTrades, setPendingTrades] = React.useState([]) as any
  const [tradeList, setTradeList] = React.useState([]) as any

  // const trades = useSelector((state: RootState) => state.trades)
  // const dispatch = useDispatch()

  const getTradeList = async (amount: number) => {
    const userAddress = "0x2306dA564868c47bb2C0123A25943cD54e6e8e2F"
    const tradeIds = await getTradesIDsByUser(userAddress)

    const trades: Trade[] = []
    tradeIds.slice(0, amount).map(async (tradeId: BigNumber) => {
      const trade = await getTrade(Number(tradeId._hex))
      await trades.push({
        id: Number(trade.id),
        seller: trade.seller,
        buyer: trade.buyer,
        tokenToSell: await getSymbol(trade.tokenToSell),
        tokenToBuy: await getSymbol(trade.tokenToBuy),
        amountOfTokenToSell: formatEther(trade.amountOfTokenToSell),
        amountOfTokenToBuy: formatEther(trade.amountOfTokenToBuy),
        deadline: Number(trade.deadline),
        status: getStatus(trade.status),
      })
    })

    setTradeList(trades)
  }

  useEffect(() => {
    if (tradeList.length === 0) {
      //   getTradeList(6).then((trades) => {
      //     dispatch(updateTrades(trades))
      //   })
      getTradeList(6)

      setPendingTrades(tradeList.filter((trade: Trade) => trade.status === "Pending"))
    }
  }, [])

  return (
    <>
      <UserDetail
        userAddress={useFormatAddress("0x2306dA564868c47bb2C0123A25943cD54e6e8e2F")}
        transactionCount={tradeList.length}
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
        console.log(trade)
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

      <Pagination />
    </>
  )
}

export default TradeList
