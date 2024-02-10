import { BsCollection, BsPlus } from 'react-icons/bs';
import { useAppSelector } from '../../app/hooks';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '../ui/Dropdown';
import {
  useCreatePlaylistMutation,
  useGetPlaylistByUserQuery,
} from '../../features/playlist/playlistApiSlice';
import { useMemo } from 'react';

const PlaylistDropdown = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const { data: playlists } = useGetPlaylistByUserQuery(currentUser?.id!, {
    skip: !currentUser,
  });
  const [createPlaylist] = useCreatePlaylistMutation();

  const handleCreatePlaylist = () => {
    const playlistsAmount = playlists?.filter(
      (playlist) => playlist.userId.id == currentUser?.id
    ).length;

    createPlaylist({
      title: `New Playlist #${playlistsAmount}`,
    });
  };

  return (
    <Dropdown>
      <DropdownTrigger className="flex items-center">
        <BsPlus size={32} />
      </DropdownTrigger>
      <DropdownContent rightSide>
        <DropdownItem onClick={handleCreatePlaylist}>
          <div className="flex items-center gap-2">
            <BsCollection size={16} />
            Create new playlist
          </div>
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};

export default PlaylistDropdown;
