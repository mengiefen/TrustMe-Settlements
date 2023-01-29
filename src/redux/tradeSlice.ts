import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  trades: [],
  status: "",
  connected: false,
} as any

export const fetchTrades = createAsyncThunk("trades/fetchTrades", async () => {
  const response = await fetch("http://localhost:3000/api/trades")
  const data = await response.json()
  return data
})

export const addTrades = createAsyncThunk("trades/addTrades", async () => {
  const response = await fetch("http://localhost:3000/api/trades", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      symbol: "BTCUSD",
      price: 10000,
      quantity: 1,
      side: "buy",
      timestamp: new Date().toISOString(),
    }),
  })
  const data = await response.json()
  return data
})

export const tradeSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    getBalance: (state, action) => {
      state.trades.push(...action.payload)
    },

    addTrade: (state, action) => {
      state.trades.push(...action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrades.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchTrades.fulfilled, (state, action) => {
        state.status = "success"
        state.trades.push(...action.payload)
      })
      .addCase(fetchTrades.rejected, (state) => {
        state.status = "failed"
      })

      .addCase(addTrades.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addTrades.fulfilled, (state, action) => {
        state.status = "success"
        state.trades.push(...action.payload)
      })
      .addCase(addTrades.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { getBalance, addTrade } = tradeSlice.actions
export default tradeSlice.reducer
