import { createSlice } from "@reduxjs/toolkit"
export interface User {
  id: number
  name: string
}

const initialState: User[] = []

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload)
    },
    // removeUser: (state, action) => {
    //   state.filter((user) => user.id !== action.payload.id)
    // },
  },
})

export const { addUser } = userSlice.actions

export default userSlice.reducer
