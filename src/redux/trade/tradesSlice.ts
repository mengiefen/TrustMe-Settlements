import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { TrustMe } from "typechain"
import { getTradesIDsByUser, getTrade } from "../../helpers/getterHelpers"
import trades from "@/components/TransactionList/data"

// export const fetchUserTrades = createAsyncThunk(
//   "trades/fetchUserTrades",
//   async (address: string) => {
//     const userIds = await getTradesIDsByUser(address)
//     const trades: Trade[] = []
//     userIds.forEach(async (id: number) => {
//       const trade = await getTrade(id)
//       trades.push(trade)
//     })

//     return trades
//   }
// )

export const fetchUserTrades = (address: string) => {
  return {
    type: "trades/fetchUserTrades",
    payload: trades,
  }
}

// export const getTradesFromContract = async (address: string) => {
//   const userIds = await getTradesIDsByUser(address)
//   const trades: Trade[] = []
//   userIds.forEach(async (id: number) => {
//     const trade = await getTrade(id)
//     trades.push(trade)
//   })

//   return trades
// }

/*
  id   number :  1
  seller   string :  0x7E14DcB55f6D5C2259e616ff254F566117dbdE5C
  buyer   string :  0x8dBBEE719736970DffE9a64D1804499e3A99d5e0
  tokenToSell   string :  0x92126D49096A8b898DD84ff1518EdD27009f4c79
  tokenToBuy   string :  0xee0240DCa0C5bF8B34B4242265230fad6B180c13
  amountOfTokenToSell   number :  100000000000000000000
  amountOfTokenToBuy   number :  100000000000000000000
  deadline   number :  1674918588
  status   number :  3
  */

type Trade = {
  id: number
  seller: string
  buyer: string
  tokenToSell: string
  tokenToBuy: string
  amountOfTokenToSell: number
  amountOfTokenToBuy: number
  deadline: number
  status: number
}

const initialState: Trade[] = []

const tradesSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    fetchTrades: (state, action) => {
      getTradesIDsByUser(action.payload).then((trades) => {
        console.log("trades", trades)
      })
    },
  },
})

export const { fetchTrades } = tradesSlice.actions

export default tradesSlice.reducer
