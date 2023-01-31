import { formatEther } from "ethers/lib/utils.js"
import { getStatus, getSymbol } from "@/utils"
import { BigNumber } from "ethers"
import { Trade } from "./type"
import { getTradesIDsByUser, getTrade } from "@/helpers/getterHelpers"

export const getTradeList = async (amount: number) => {
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

  // setTradeList(trades)
  return trades
}
