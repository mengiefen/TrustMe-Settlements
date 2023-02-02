import { getTrade } from "./getterHelpers"
import { Trade } from "@/components/TransactionList/type"
import { formatEther } from "ethers/lib/utils"
import { getSymbol } from "@/utils"

export const fetchTrade = async (id: number) => {
  const trade = await getTrade(id)
  const tradeObj: Trade = {
    id: Number(trade.id),
    status:
      trade.status == 0
        ? "Pending"
        : trade.status == 1
        ? "Confirmed"
        : trade.status == 2
        ? "Canceled"
        : trade.status == 3
        ? "Expired"
        : "Withdrawn",
    seller: trade.seller.toString(),
    buyer: trade.buyer.toString(),
    deadline: Number(trade.deadline),
    amountOfTokenToSell: formatEther(trade.amountOfTokenToSell),
    amountOfTokenToBuy: formatEther(trade.amountOfTokenToBuy),
    tokenToSell: trade.tokenToSell,
    tokenToBuy: trade.tokenToBuy,
    symbolToSell: await getSymbol(trade.tokenToSell),
    symbolToBuy: await getSymbol(trade.tokenToBuy),
  }
  return tradeObj
}
