import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface WalletState {
  buttonText: string
  connected: boolean
  address: string
}
const initialState: WalletState = {
  buttonText: "Connect Wallet",
  connected: false,
  address: "",
}

const walletsSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    connectWallet: (state, action) => {
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
