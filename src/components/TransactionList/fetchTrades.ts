import { formatEther } from "ethers/lib/utils.js"
import { getStatus, getSymbol } from "@/utils"
import { BigNumber } from "ethers"
import { Trade } from "./type"
import { getTradesIDsByUser, getTrade } from "@/helpers/getterHelpers"
import { fetchTrade } from "@/helpers/fetchTrade"

export const getTradeList = async (tradeList: Trade[], address: `0x${string}` | undefined) => {
  const trades: Trade[] = [...tradeList]
  const tradeIds = await getTradesIDsByUser(address as string)
  if (tradeIds.length === trades.length) return trades

  await Promise.all(
    tradeIds.slice(tradeList.length - 10, tradeIds.length).map(async (tradeId: BigNumber) => {
      const trade = (await fetchTrade(address as string, Number(tradeId._hex))) as Trade
      trades.push(trade)
    })
  )

  return trades
}

export const getTradesFromStorage = async () => {
  const trades = JSON.parse(
    JSON.parse(sessionStorage.getItem("persist:trustMe") || "[]").trades
  ).data

  return trades
}
