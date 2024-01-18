import { apiSlice } from "../../app/apiSlice"
import { Track } from "../../app/types"
import { getLyrics, searchTracks } from "../../utils/musixmatchAPI"

export const trackApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTrack: builder.query<Track, string>({
      query: (id) => ({
        url: `/track/${id}`,
        method: "GET",
      }),
      transformResponse: async (response: { track: any }) => {
        const result = response.track
        const trackFromMusixmatch = await searchTracks(
          result.title,
          result.artist,
        )
        const lyrics = await getLyrics(trackFromMusixmatch)
        const transformedData: Track = {
          ...result,
          id: result._id,
          thumbnail: result.image,
          uploader: result.userId,
          lyrics: lyrics,
          privacy: result.isPublic,
          banned: result.isBanned,
        }
        return transformedData
      },
    }),
    getTrackByUser: builder.query<Track[], string>({
      query: (id) => ({
        url: `/track/alltrack/user/${id}`,
        method: "GET",
      }),
      transformResponse: async (response: { allTracks: any[] }) => {
        const transformedData: Track[] = response.allTracks.map((track) => {
          return {
            ...track,
            id: track._id,
            thumbnail: track.image,
            uploader: track.userId,
            privacy: track.isPublic,
            banned: track.isBanned,
          }
        })

        return transformedData
      },
    }),
  }),
})

export const { useGetTrackQuery, useGetTrackByUserQuery } = trackApiSlice
