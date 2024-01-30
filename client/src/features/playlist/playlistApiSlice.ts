import { apiSlice } from '../../app/apiSlice';
import {
  FullPlaylist,
  Playlist,
  SidebarPlaylist,
  Track,
  User,
} from '../../app/types';

export const playlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlaylistById: builder.query<FullPlaylist, string>({
      query: (id) => ({
        url: `/playlist/${id}`,
      }),
      providesTags: ['Playlist'],
      transformResponse: (response: { message: string; playlist: any }) => {
        const { userId, _id, __v, trackId, ...rest } = response.playlist;

        const transformedUser: Pick<User, 'id' | 'username'> = {
          id: userId._id,
          username: userId.username,
        };

        const transformedTracks: Track[] = trackId.map((track: any) => {
          const { _id, __v, isPublic, isBanned, userId, ...rest } = track;
          return {
            ...rest,
            id: _id,
            uploader: userId,
            privacy: isPublic,
            banned: isBanned,
          };
        });

        const transformedData: FullPlaylist = {
          id: _id,
          userId: transformedUser,
          trackId: transformedTracks,
          ...rest,
        };

        return transformedData;
      },
    }),
    getPlaylistByUser: builder.query<SidebarPlaylist[], string>({
      query: (userId) => ({
        url: `/playlist/all/${userId}`,
      }),
      providesTags: ['Playlist'],
      transformResponse: (response: { message: string; playlist: any[] }) => {
        const transformedData: SidebarPlaylist[] = response.playlist.map(
          (p) => {
            const { userId, _id, __v, ...rest } = p;

            const transformedUser: Pick<User, 'id' | 'username'> = {
              id: userId._id,
              username: userId.username,
            };

            const transformedPlaylist: SidebarPlaylist = {
              id: _id,
              userId: transformedUser,
              ...rest,
            };
            return transformedPlaylist;
          }
        );
        return transformedData;
      },
    }),
    editPlaylist: builder.mutation<void, Partial<Playlist>>({
      query: ({ id, title, image }) => ({
        url: `/playlist/${id}`,
        method: 'PATCH',
        body: { title, image },
      }),
      invalidatesTags: ['Playlist'],
    }),
    addTrackToPlaylist: builder.mutation<
      void,
      { playlist_id: string; track_id: string }
    >({
      query: ({ playlist_id, track_id }) => ({
        url: `/playlist/${playlist_id}/add/${track_id}`,
        method: 'POST',
      }),
    }),
    removeTrackFromPlaylist: builder.mutation<
      void,
      { playlist_id: string; track_id: string }
    >({
      query: ({ playlist_id, track_id }) => ({
        url: `/playlist/${playlist_id}/remove/${track_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Playlist'],
    }),
  }),
});

export const {
  useGetPlaylistByIdQuery,
  useGetPlaylistByUserQuery,
  useEditPlaylistMutation,
  useAddTrackToPlaylistMutation,
  useRemoveTrackFromPlaylistMutation,
} = playlistApiSlice;
