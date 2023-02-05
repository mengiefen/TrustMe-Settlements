import { useBalance } from "wagmi";
import { TokenListType } from "@/components/TransactionList/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface WalletState {
  buttonText: string;
  connected: boolean;
  address: string;
  userBalances: {
    connectedNetwork: string;
    currencyBalance: string;
    currencySymbol: string;
    tokens: TokenListType[];
  };
}
const initialState: WalletState = {
  buttonText: "Connect Wallet",
  connected: false,
  address: "",
  userBalances: {
    connectedNetwork: "",
    currencyBalance: "",
    currencySymbol: "",
    tokens: [],
  },
};

const walletsSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    connectWallet: (state, action) => {
      state.buttonText = "Disconnect Wallet";
      state.connected = true;
      state.address = action.payload;
    },

    disconnectWallet: (state) => {
      state.buttonText = "Connect Wallet";
      state.connected = false;
      state.address = "";
    },

    updateUseBalances: (state, action) => {
      state.userBalances = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { connectWallet, disconnectWallet, updateUseBalances } =
  walletsSlice.actions;

export default walletsSlice.reducer;
