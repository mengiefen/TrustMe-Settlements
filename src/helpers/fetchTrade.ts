import { getTrade } from "./getterHelpers";
import {
  getResolvedTokens,
  getResolvedUserAddress,
} from "./resolveData";

export const fetchTrade = async (
  userAddress: string,
  id: number,
) => {
  const trade = await getTrade(id);

  const { buyer, seller, isCreatedByYou } =
    getResolvedUserAddress(
      userAddress,
      trade.buyer,
      trade.seller,
    );

  const data = await getResolvedTokens(
    isCreatedByYou,
    trade.tokenToBuy,
    trade.tokenToSell,
    trade.amountOfTokenToBuy,
    trade.amountOfTokenToSell,
  );

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
    isCreatedByYou: data.isCreatedByYou,
  };
  return tradeObj;
};
