import { apiSlice } from '../../app/apiSlice';
import { store } from '../../app/store';
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
      providesTags: (result) => [{ type: 'Playlist', id: 'VIEWED' }],
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
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Playlist' as const, id })),
              { type: 'Playlist', id: 'LIST' },
            ]
          : [{ type: 'Playlist', id: 'LIST' }],
    }),
    createPlaylist: builder.mutation<void, Partial<SidebarPlaylist>>({
      query: ({ title, trackId = [] }) => ({
        url: `/playlist/create`,
        method: 'POST',
        body: { title, trackId },
      }),
      invalidatesTags: [{ type: 'Playlist', id: 'LIST' }],
    }),
    deletePlaylist: builder.mutation<void, string>({
      query: (id) => ({
        url: `/playlist/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Playlist', id: 'LIST' }],
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
      onQueryStarted: (
        { playlist_id, track_id },
        { dispatch, queryFulfilled }
      ) => {
        const userId = store.getState().auth.currentUser?.id;
        const patchResult = dispatch(
          playlistApiSlice.util.updateQueryData(
            'getPlaylistByUser',
            userId!,
            (draft) => {
              const index = draft.findIndex(({ id }) => id == playlist_id);
              if (index !== -1) {
                draft[index].trackId.push(track_id);
              }
            }
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
      invalidatesTags: [{ type: 'Playlist', id: 'VIEWED' }],
    }),
    removeTrackFromPlaylist: builder.mutation<
      void,
      { playlist_id: string; track_id: string }
    >({
      query: ({ playlist_id, track_id }) => ({
        url: `/playlist/${playlist_id}/remove/${track_id}`,
        method: 'DELETE',
      }),
      onQueryStarted: (
        { playlist_id, track_id },
        { dispatch, queryFulfilled }
      ) => {
        const userId = store.getState().auth.currentUser?.id;
        const patchResult = dispatch(
          playlistApiSlice.util.updateQueryData(
            'getPlaylistByUser',
            userId!,
            (draft) => {
              const index = draft.findIndex(({ id }) => id == playlist_id);

              if (index !== -1) {
                const trackIndex = draft[index].trackId.findIndex(
                  (id) => id == track_id
                );
                draft[index].trackId.splice(trackIndex, 1);
              }
            }
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
      invalidatesTags: [{ type: 'Playlist', id: 'VIEWED' }],
    }),
  }),
});

export const {
  useGetPlaylistByIdQuery,
  useGetPlaylistByUserQuery,
  useCreatePlaylistMutation,
  useEditPlaylistMutation,
  useDeletePlaylistMutation,
  useAddTrackToPlaylistMutation,
  useRemoveTrackFromPlaylistMutation,
} = playlistApiSlice;
