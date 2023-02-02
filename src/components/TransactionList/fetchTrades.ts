import { formatEther } from "ethers/lib/utils.js"
import { getStatus, getSymbol } from "@/utils"
import { BigNumber } from "ethers"
import { Trade } from "./type"
import { getTradesIDsByUser, getTrade } from "@/helpers/getterHelpers"

export const getTradeList = async (address: `0x${string}` | undefined) => {
  const tradeIds = await getTradesIDsByUser(address as string)
  const trades: Trade[] = await getTradesFromStorage()
  console.log("tradeIds", tradeIds.length)
  console.log("trades", trades.length)

  if (tradeIds.length !== trades.length) {
    await Promise.all(
      tradeIds.slice(trades.length, tradeIds.length).map(async (tradeId: BigNumber) => {
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
    )
  }

  return trades
}

export const getTradesFromStorage = async () => {
  const trades = JSON.parse(
    JSON.parse(localStorage.getItem("persist:trustMe") || "[]").trades
  ).trades

  return trades
}
