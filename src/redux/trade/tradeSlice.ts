import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../store"

const initialState = [] as any

const tradesSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

// export {} = tradesSlice.actions

export default tradesSlice.reducer
