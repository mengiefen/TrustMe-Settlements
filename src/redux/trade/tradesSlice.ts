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
  trades: Trade[]
  status: "loading" | "succeeded" | "failed"
}

const initialState = {
  trades: [],
  status: "loading",
} as TradesState

const tradesSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    updateTrades: (state, action: PayloadAction<Trade[]>) => {
      console.log("action.payload", action.payload)
      state.trades = [...action.payload]
      state.status = "succeeded"
    },
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUserTrades.pending, (state, action) => {
  //       state.status = "loading"
  //     })
  //     .addCase(fetchUserTrades.fulfilled, (state, action: PayloadAction<TrustMe[]>) => {
  //       state.status = "succeeded"
  //       // state.trades = action.payload
  //     })

  //     .addCase(fetchUserTrades.rejected, (state, action) => {
  //       state.status = "failed"
  //     })
  // },
})

export const { updateTrades } = tradesSlice.actions

export default tradesSlice.reducer
