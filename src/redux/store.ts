import storage from "redux-persist/lib/storage/session"
import { configureStore, combineReducers } from "@reduxjs/toolkit"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"

import tradesReducer from "./trade/tradesSlice"
import walletsReducer from "./wallet/walletSlice"

const rootReducer = combineReducers({
  trades: tradesReducer,
  wallets: walletsReducer,
})

const persistConfig = {
  key: "trustMe",
  version: 1,
  storage,
  whitelist: ["wallets", "trades"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
}

export const store = makeStore()
export const persister = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
