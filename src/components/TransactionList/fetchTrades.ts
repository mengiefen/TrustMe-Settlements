import { formatEther } from "ethers/lib/utils.js"
import { getStatus, getSymbol } from "@/utils"
import { BigNumber } from "ethers"
import { Trade } from "./type"
import { getTradesIDsByUser, getTrade } from "@/helpers/getterHelpers"

export const getTradeList = async (amount: number, address: `0x${string}` | undefined) => {
  const tradeIds = await getTradesIDsByUser(address as string)

  const trades: Trade[] = []
  await Promise.all(
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
  )

  return trades
}
