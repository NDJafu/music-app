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
      transformResponse: async (response: { track: any[] }) => {
        const result = response.track[0]
        const trackFromThirdPartyAPI = await searchTracks(
          result.title,
          result.artist,
        )
        const lyrics = await getLyrics(trackFromThirdPartyAPI)
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
  }),
})

export const { useGetTrackQuery } = trackApiSlice
