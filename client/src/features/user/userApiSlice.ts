import { apiSlice } from "../../app/apiSlice"
import { User } from "../../app/types"

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => ({
        url: `/user/${id}`,
      }),
      transformResponse: (response: { message: string; user: any }) => {
        const { _id, likedMusic, ...rest } = response.user
        const transformedData: User = {
          id: _id,
          ...rest,
        }
        return transformedData
      },
    }),
  }),
})

export const { useGetUserQuery } = userApiSlice
