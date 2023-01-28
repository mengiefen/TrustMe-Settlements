import { configureStore, combineReducers } from "@reduxjs/toolkit"
import counter from "./counterSlice"
import user from "./userSlice"
import { createWrapper } from "next-redux-wrapper"

const rootReducer = combineReducers({
  counter,
  user,
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
