import { createSelector } from "@reduxjs/toolkit"
import { Trade } from "@/components/TransactionList/type"

const getTrade = (state: any) => state.trades.data

export const getTradeByIdFromStore = createSelector(
  [getTrade, (state, tradeId) => tradeId],
  (data, tradeId) => data.find((trade: Trade) => trade.id === tradeId)
)
