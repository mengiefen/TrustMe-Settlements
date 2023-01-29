import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  buttonText: "Connect Wallet",
  connected: false,
  address: "",
} as any

const walletsSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    connectWallet: (state, action) => {
      console.log("action.payload", action.payload)
      state.buttonText = "Disconnect Wallet"
      state.connected = true
      state.address = action.payload
    },

    disconnectWallet: (state) => {
      state.buttonText = "Connect Wallet"
      state.connected = false
      state.address = ""
    },
  },
  extraReducers: (builder) => {},
})

export const { connectWallet, disconnectWallet } = walletsSlice.actions

export default walletsSlice.reducer
