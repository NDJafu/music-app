import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"
import { setCredentials, logOut } from "../features/auth/authSliceV2"
import { RootState } from "./store"

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const token = state.auth.token
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error) {
    console.log("sending refresh token")

    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions)

    console.log(refreshResult)

    if (refreshResult?.data) {
      const state = api.getState() as RootState
      const user = state.auth.currentUser

      api.dispatch(setCredentials({ ...refreshResult.data, user }))

      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
})
