import { createSlice, createAsyncThunk, PayloadAction, AsyncThunkAction } from "@reduxjs/toolkit"
import { BigNumber } from "ethers"
import { TrustMe } from "typechain"
import { getTradesIDsByUser, getTrade } from "../../helpers/getterHelpers"
import { Trade } from "@/components/TransactionList/type"

// export const fetchUserTrades = createAsyncThunk(
//   "trades/fetchUserTrades",
//   async ({ address }: { address: string }, { rejectWithValue }) => {
//     const userIds = await getTradesIDsByUser(address)

//     let trades: TrustMe[] = []

//     if (userIds.length === 0) {
//       rejectWithValue("No trades found")
//       return []
//     }

//     trades = userIds.map(async (id: BigNumber) => {
//       return await getTrade(Number(id._hex)).then((trade) => console.log("trade", trade))
//     })

//     console.log("trades", trades)

//     return trades
//   }
// )

// export const getTradesFromContract = async (address: string) => {
//   const userIds = await getTradesIDsByUser("0x2306dA564868c47bb2C0123A25943cD54e6e8e2F")
//   console.log("userIds", userIds)
//   const trades: TrustMe[] = []
//   userIds.forEach(async (id: number) => {
//     const trade = await getTrade(id)
//     trades.push(trade)
//   })

//   return trades
// }

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

    updateCanceledTrade: (state, action: PayloadAction<Trade>) => {
      const trade = action.payload
      const index = state.data.findIndex((t) => t.id === trade.id)
      state.data[index].status = "Canceled"
    },

    updateExpiredTrade: (state, action: PayloadAction<Trade>) => {
      const trade = action.payload
      const index = state.data.findIndex((t) => t.id === trade.id)
      state.data[index].status = "Expired"
    },

    updateConfirmedTrade: (state, action: PayloadAction<Trade>) => {
      const trade = action.payload
      const index = state.data.findIndex((t) => t.id === trade.id)
      state.data[index].status = "Confirmed"
    },

    updateCreatedTrade: (state, action: PayloadAction<Trade>) => {
      const trade = action.payload
      state.data.push(trade)
    },

    updateWithdrawnTrade: (state, action: PayloadAction<Trade>) => {
      const trade = action.payload
      const index = state.data.findIndex((t) => t.id === trade.id)
      state.data[index] = trade
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
