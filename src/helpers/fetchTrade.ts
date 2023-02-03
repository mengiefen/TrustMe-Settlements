import { getTrade } from "./getterHelpers"
import { getResolvedTokens, getResolvedUserAddress } from "./resolveData"

export const fetchTrade = async (userAddress: string, id: number) => {
  const trade = await getTrade(id)

  const { buyer, seller, isOutgoing } = getResolvedUserAddress(
    userAddress,
    trade.buyer,
    trade.seller
  )

  const data = await getResolvedTokens(
    isOutgoing,
    trade.tokenToBuy,
    trade.tokenToSell,
    trade.amountOfTokenToBuy,
    trade.amountOfTokenToSell
  )

  const tradeObj = {
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
    seller,
    buyer,
    deadline: Number(trade.deadline),
    tokenToSell: data.tokenToSell,
    tokenToBuy: data.tokenToBuy,
    amountOfTokenToSell: data.amountOfTokenToSell,
    amountOfTokenToBuy: data.amountOfTokenToBuy,
    symbolToBuy: data.symbolToBuy,
    symbolToSell: data.symbolToSell,
    isOutgoing: data.isOutgoing,
  }
  return tradeObj
}
