import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "../../app/store"
import { CurrentUser } from "../../app/types"
import { apiSlice } from "../../app/apiSlice"
import jwtDecode from "jwt-decode"

interface AuthState {
  currentUser: CurrentUser | null
  token: string | null
}

const initialState: AuthState = {
  currentUser: null,
  token: null,
}

//RTK Query
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { accessToken } = data as unknown as { accessToken: string }

          const user = jwtDecode<CurrentUser>(accessToken)

          dispatch(setCredentials({ user, accessToken }))
        } catch (err) {
          console.log(err)
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          dispatch(logOut())
          dispatch(apiSlice.util.resetApiState())
        } catch (err) {
          console.log(err)
        }
      },
    }),
    refresh: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { accessToken } = data

          const user = jwtDecode<CurrentUser>(accessToken)

          dispatch(setCredentials({ user, accessToken }))
        } catch (err) {
          console.log(err)
        }
      },
    }),
  }),
})

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
    logOut: (state) => {
      state.currentUser = null
      state.token = null
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } =
  authApiSlice

export default authSlice.reducer
