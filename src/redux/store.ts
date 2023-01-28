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

export type AppStore = ReturnType<typeof makeStore>

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })

export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
