// userSlice.js (redux store)
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  role: "user",  
  isLogin: false,
  email: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload
      state.isLogin = true
      state.role = action.payload.role  
    },
    removeUser: (state) => {
      state.data = {}
      state.isLogin = false
      state.role = "user"  
    },
  },
})

export const { addUser, removeUser } = userSlice.actions

export default userSlice.reducer
