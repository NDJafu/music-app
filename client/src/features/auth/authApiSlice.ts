import { logout, setCredentials } from "./authSlice"
import { CurrentUser } from "../../app/types"
import { apiSlice } from "../../app/apiSlice"
import jwtDecode from "jwt-decode"

//RTK Query
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
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
          dispatch(logout())
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

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } =
  authApiSlice
