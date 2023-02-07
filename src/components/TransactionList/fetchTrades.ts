import { BigNumber } from "ethers";
import { TradeData } from "./type";
import { getTradesIDsByUser, getTrade } from "@/helpers/getterHelpers";
import { fetchTrade } from "@/helpers/fetchTrade";

export const getTradeList = async (
  tradeList: TradeData[],
  address: `0x${string}` | undefined,
) => {
  const trades: TradeData[] = [...tradeList];

  const tradeIds = await getTradesIDsByUser(address as string);
  if (tradeIds.length === trades.length) return trades;
  if (tradeIds.length > tradeList.length) {
    await Promise.all(
      tradeIds
        .slice(tradeList.length, tradeIds.length)
        .map(async (tradeId: BigNumber) => {
          const trade: TradeData = (await fetchTrade(
            address as string,
            Number(tradeId._hex),
          )) as TradeData;
          trades.push(trade);
        }),
    );
  }

  return trades;
};

export const getLastTransactions = (tradeList: TradeData[], amount: number) => {
  const trades = [...tradeList];
  if (trades.length > 10) {
    return trades
      .filter((trade) => trade.status !== "Pending" || trade.isCreatedByYou)
      .sort((a: TradeData, b: TradeData) => b.id - a.id)
      .slice(0, amount);
  }

  return trades;
};
