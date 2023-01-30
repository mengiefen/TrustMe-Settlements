import { configureStore, combineReducers } from "@reduxjs/toolkit"
import tradesReducer from "./trade/tradesSlice"
import walletsReducer from "./wallet/walletSlice"

const rootReducer = combineReducers({
  trades: tradesReducer,
  wallets: walletsReducer,
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  })
}

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
