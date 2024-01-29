import { useAppSelector } from '../../app/hooks';
import PlaylistItem from './PlaylistItem';
import PlaylistItemSkeleton from './PlaylistItemSkeleton';
import { useGetPlaylistByUserQuery } from '../../features/playlist/playlistApiSlice';

const PlaylistList = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const { data: userPlaylists, isLoading } = useGetPlaylistByUserQuery(
    currentUser?.id!,
    { skip: !currentUser }
  );

  if (isLoading) return <PlaylistItemSkeleton itemCount={7} />;

  if (!currentUser) return <div>Worthless bitch ass nigga</div>;

  if (userPlaylists?.length == 1 && userPlaylists[0].title == 'Liked Music')
    return (
      <div className="flex h-fit w-full flex-col gap-4 rounded bg-jarcata px-4 py-3">
        <h3 className="text-base">Create your first playlist</h3>
        <button className="w-fit rounded-full bg-white px-2 py-1 text-sm font-semibold text-jarcata">
          Create playlist
        </button>
      </div>
    );

  return (
    <div className="mb-28 flex flex-col gap-2">
      {userPlaylists?.map((playlist, index) => (
        <PlaylistItem key={index} playlist={playlist} />
      ))}
    </div>
  );
};

export default PlaylistList;
