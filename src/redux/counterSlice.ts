import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  count: 0,
}

export interface CounterState {
  counter: {
    count: number
  }
}

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1
    },

    decrement: (state) => {
      state.count -= 1
    },
  },
})

export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer
