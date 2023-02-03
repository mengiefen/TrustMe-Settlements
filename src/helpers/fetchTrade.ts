import { getTrade } from "./getterHelpers"
import { getResolvedTokens, getResolvedUserAddress } from "./resolveData"

export const fetchTrade = async (userAddress: string, id: number) => {
  const trade = await getTrade(id)

  const { seller, buyer, isOutgoing } = getResolvedUserAddress(
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
    ...data,
  }
  return tradeObj
}
