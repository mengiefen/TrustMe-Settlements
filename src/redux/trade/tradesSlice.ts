import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TradeData } from "@/components/TransactionList/type";

type TradesState = {
  data: TradeData[];
  status: "loading" | "succeeded" | "failed";
};

const initialState = {
  data: [],
  status: "loading",
} as TradesState;

const tradesSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    fetchTradesPending: (state) => {
      if (state.status === "succeeded") return;
      state.status = "loading";
    },

    fetchTrades: (state, action: PayloadAction<TradeData[]>) => {
      if (state.status === "succeeded") return;
      state.data = action.payload;
      state.status = "succeeded";
    },
    fetchTradesFailed: (state) => {
      state.status = "failed";
    },

    updateCanceledTrade: (state, action: PayloadAction<number>) => {
      const id = Number(action.payload);
      if (!id) return;
      const index = state.data.findIndex((t) => t.id === id);
      state.data[index].status = "Canceled";
    },

    updateExpiredTrade: (state, action: PayloadAction<number>) => {
      const id = Number(action.payload);
      if (!id) return;
      const index = state.data.findIndex((t) => t.id === id);
      state.data[index].status = "Expired";
    },

    updateConfirmedTrade: (state, action: PayloadAction<number>) => {
      const id = Number(action.payload);
      if (!id) return;
      const index = state.data.findIndex((t) => t.id === id);
      state.data[index].status = "Confirmed";
    },

    updateCreatedTrade: (state, action: PayloadAction<TradeData>) => {
      const trade = action.payload;
      if (state.data.find((t) => t.id === trade.id)) return;
      state.data.push(trade);
    },

    updateWithdrawnTrade: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (!id) return;
      const index = state.data.findIndex((t) => t.id === id);
      state.data[index].status = "Withdrawn";
    },

    clearTrades: (state) => {
      state = initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase("persist/PURGE", (state) => {
      return initialState;
    });
  },
});

export const {
  fetchTrades,
  fetchTradesFailed,
  fetchTradesPending,
  updateCanceledTrade,
  updateConfirmedTrade,
  updateCreatedTrade,
  updateExpiredTrade,
  updateWithdrawnTrade,
  clearTrades,
} = tradesSlice.actions;

export default tradesSlice.reducer;
