import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BigNumber } from "ethers"
import { TrustMe } from "typechain"
import { getTradesIDsByUser, getTrade } from "../../helpers/getterHelpers"
import { Trade } from "@/components/TransactionList/type"

type TradesState = {
  data: Trade[]
  status: "loading" | "succeeded" | "failed"
}

const initialState = {
  data: [],
  status: "loading",
} as TradesState

const tradesSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    fetchTradesPending: (state) => {
      state.status = "loading"
    },

    fetchTrades: (state, action: PayloadAction<Trade[]>) => {
      state.data = [...action.payload]
      state.status = "succeeded"
    },
    fetchTradesFailed: (state) => {
      state.status = "failed"
    },

    updateCanceledTrade: (state, action: PayloadAction<number>) => {
      const id = Number(action.payload)
      if (!id) return
      const index = state.data.findIndex((t) => t.id === id)
      state.data[index].status = "Canceled"
    },

    updateExpiredTrade: (state, action: PayloadAction<number>) => {
      const id = Number(action.payload)
      if (!id) return
      const index = state.data.findIndex((t) => t.id === id)
      state.data[index].status = "Expired"
    },

    updateConfirmedTrade: (state, action: PayloadAction<number>) => {
      const id = Number(action.payload)
      if (!id) return
      const index = state.data.findIndex((t) => t.id === id)
      state.data[index].status = "Confirmed"
    },

    updateCreatedTrade: (state, action: PayloadAction<Trade>) => {
      const trade = action.payload
      if (state.data.find((t) => t.id === trade.id)) return
      state.data.push(trade)
    },

    updateWithdrawnTrade: (state, action: PayloadAction<number>) => {
      const id = action.payload
      if (!id) return
      const index = state.data.findIndex((t) => t.id === id)
      state.data[index].status = "Withdrawn"
    },
  },
})

export const {
  fetchTrades,
  fetchTradesFailed,
  fetchTradesPending,
  updateCanceledTrade,
  updateConfirmedTrade,
  updateCreatedTrade,
  updateExpiredTrade,
  updateWithdrawnTrade,
} = tradesSlice.actions

export default tradesSlice.reducer
