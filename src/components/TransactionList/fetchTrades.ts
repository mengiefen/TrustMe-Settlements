import { formatEther } from "ethers/lib/utils.js";
import { getStatus, getSymbol } from "@/utils";
import { BigNumber } from "ethers";
import { Trade } from "./type";
import { getTradesIDsByUser, getTrade } from "@/helpers/getterHelpers";
import { fetchTrade } from "@/helpers/fetchTrade";

export const getTradeList = async (
  tradeList: Trade[],
  address: `0x${string}` | undefined,
) => {
  const trades: Trade[] = [...tradeList];
  const tradeIds = await getTradesIDsByUser(address as string);
  if (tradeIds.length === trades.length) return trades;
  if (tradeIds.length > tradeList.length) {
    await Promise.all(
      tradeIds
        .slice(tradeList.length, tradeIds.length)
        .map(async (tradeId: BigNumber) => {
          const trade = (await fetchTrade(
            address as string,
            Number(tradeId._hex),
          )) as Trade;
          trades.push(trade);
        }),
    );
  }

  return trades;
};

export const getLastTransactions = (tradeList: Trade[], amount: number) => {
  const trades = [...tradeList];
  if (trades.length > 10) {
    return trades
      .filter((trade) => trade.status !== "Pending" || trade.isCreatedByYou)
      .sort((a: Trade, b: Trade) => b.id - a.id)
      .slice(0, amount);
  }

  return trades;
};
