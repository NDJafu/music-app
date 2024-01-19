import { apiSlice } from "../../app/apiSlice"
import { FullPlaylist, Track, User } from "../../app/types"

export const playlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlaylistById: builder.query<FullPlaylist, string>({
      query: (id) => ({
        url: `/playlist/${id}`,
      }),
      transformResponse: (response: { message: string; playlist: any }) => {
        const { userId, _id, __v, trackId, ...rest } = response.playlist

        const transformedUser: Pick<User, "id" | "username"> = {
          id: userId._id,
          username: userId.username,
        }

        const transformedTracks: Track[] = trackId.map((track: any) => {
          const { _id, __v, isPublic, isBanned, userId, ...rest } = track
          return {
            ...rest,
            id: _id,
            uploader: userId,
            privacy: isPublic,
            banned: isBanned,
          }
        })

        const transformedData: FullPlaylist = {
          id: _id,
          userId: transformedUser,
          trackId: transformedTracks,
          ...rest,
        }

        return transformedData
      },
    }),
    addTrackToPlaylist: builder.mutation<
      void,
      { playlist_id: string; track_id: string }
    >({
      query: ({ playlist_id, track_id }) => ({
        url: `/playlist/${playlist_id}/add/${track_id}`,
        method: "POST",
      }),
    }),
    removeTrackFromPlaylist: builder.mutation<
      void,
      { playlist_id: string; track_id: string }
    >({
      query: ({ playlist_id, track_id }) => ({
        url: `/playlist/${playlist_id}/remove/${track_id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useGetPlaylistByIdQuery,
  useAddTrackToPlaylistMutation,
  useRemoveTrackFromPlaylistMutation,
} = playlistApiSlice
