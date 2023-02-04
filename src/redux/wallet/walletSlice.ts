import { TokenListType } from "@/components/TransactionList/type"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface WalletState {
  buttonText: string
  connected: boolean
  address: string
  tokens: TokenListType[]
}
const initialState: WalletState = {
  buttonText: "Connect Wallet",
  connected: false,
  address: "",
  tokens: [],
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

    updateTokens: (state, action) => {
      state.tokens = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const { connectWallet, disconnectWallet, updateTokens } = walletsSlice.actions

export default walletsSlice.reducer
