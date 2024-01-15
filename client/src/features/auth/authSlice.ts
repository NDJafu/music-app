import { createSlice } from "@reduxjs/toolkit"
import { CurrentUser } from "../../app/types"
import { api } from "../../utils/api"

interface AuthState {
  currentUser: CurrentUser | null
  token: string | null
}

const initialState: AuthState = {
  currentUser: null,
  token: null,
}

//RTK Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload
      state.currentUser = user
      state.token = accessToken
    },
    logout: (state) => {
      state.currentUser = null
      state.token = null
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
