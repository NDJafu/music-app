import { apiSlice } from "../../app/apiSlice"
import { Track } from "../../app/types"
import { getLyrics, searchTracks } from "../../utils/musixmatchAPI"

export const trackApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTrack: builder.query<Track[], void>({
      query: () => ({
        url: "/track",
      }),
      transformResponse: (response: {
        message: string
        length: number
        allTracks: any[]
      }) => {
        const transformedData: Track[] = response.allTracks.map((track) => {
          const { _id, __v, isPublic, isBanned, userId, ...rest } = track
          return {
            ...rest,
            id: _id,
            uploader: userId,
            privacy: isPublic,
            banned: isBanned,
          }
        })
        return transformedData
      },
    }),
    getTrack: builder.query<Track, string>({
      query: (id) => ({
        url: `/track/${id}`,
      }),
      transformResponse: async (response: { message: string; track: any }) => {
        const { _id, __v, isPublic, isBanned, userId, ...rest } = response.track
        const trackFromMusixmatch = await searchTracks(rest.title, rest.artist)
        const lyrics = await getLyrics(trackFromMusixmatch)
        const transformedData: Track = {
          ...rest,
          id: _id,
          uploader: userId,
          lyrics: lyrics,
          privacy: isPublic,
          banned: isBanned,
        }
        return transformedData
      },
    }),
    getTrackByUser: builder.query<Track[], string>({
      query: (id) => ({
        url: `/track/alltrack/user/${id}`,
      }),
      transformResponse: (response: { allTracks: any[] }) => {
        const transformedData: Track[] = response.allTracks.map((track) => {
          const { _id, __v, isPublic, isBanned, userId, ...rest } = track
          return {
            ...rest,
            id: _id,
            uploader: userId,
            privacy: isPublic,
            banned: isBanned,
          }
        })

        return transformedData
      },
    }),
  }),
})

export const { useGetAllTrackQuery, useGetTrackQuery, useGetTrackByUserQuery } =
  trackApiSlice
