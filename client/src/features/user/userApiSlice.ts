import { apiSlice } from "../../app/apiSlice"
import { User } from "../../app/types"

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => ({
        url: `/user/${id}`,
      }),
      transformResponse: (response: { message: string; user: any }) => {
        const { _id, likedMusic, image, ...rest } = response.user
        const transformedData: User = {
          id: _id,
          avatar: image,
          ...rest,
        }
        return transformedData
      },
      providesTags: ["User"],
    }),
    editUser: builder.mutation<void, Partial<User & { image: string }>>({
      query: (user) => ({
        url: `/user/${user.id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
  }),
})

export const { useGetUserQuery, useEditUserMutation } = userApiSlice
