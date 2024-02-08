import { BsSearch, BsThreeDots } from 'react-icons/bs';
import { SidebarPlaylist, Track } from '../../app/types';
import { useAppDispatch } from '../../app/hooks';
import { addToQueue } from '../../features/player/playerSlice';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownSubMenu,
  DropdownSubMenuContent,
  DropdownSubMenuTrigger,
  DropdownTrigger,
} from '../ui/Dropdown';
import { useState } from 'react';
import { useAddTrackToPlaylistMutation } from '../../features/playlist/playlistApiSlice';

type Props = {
  track: Track;
  playlists: SidebarPlaylist[];
};

const TrackDropdown = ({ track, playlists }: Props) => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const [addTrackToPlaylist] = useAddTrackToPlaylistMutation();

  const likedMusic = playlists.find(
    (playlist) => playlist.title == 'Liked Music'
  );

  const handleAddTrackToPlaylist = (id: string) => {
    addTrackToPlaylist({ playlist_id: id, track_id: track.id });
  };
  const handleAddToQueue = () => {
    dispatch(addToQueue(track));
  };

  return (
    <Dropdown>
      <DropdownTrigger className="flex items-center">
        <BsThreeDots size={32} />
      </DropdownTrigger>
      <DropdownContent rightSide>
        <DropdownSubMenu menu="playlist">
          <DropdownSubMenuTrigger>Add to playlist</DropdownSubMenuTrigger>
          <DropdownSubMenuContent rightSide>
            <div className="relative flex items-center p-0.5">
              <input
                type="text"
                value={query}
                className="w-full bg-neutral-800 p-2 pl-8 text-sm outline-none"
                placeholder="Find your playlist"
                onChange={(e) => setQuery(e.target.value)}
              />
              <BsSearch size={16} className="absolute left-2.5" />
            </div>
            <DropdownItem onClick={() => {}}>Create new playlist</DropdownItem>
            <DropdownSeparator />
            {playlists
              .filter(
                (p) =>
                  p.title.toLowerCase().startsWith(query) &&
                  p.title != 'Liked Music'
              )
              .map((playlist) => (
                <DropdownItem
                  onClick={() => handleAddTrackToPlaylist(playlist.id)}
                >
                  {playlist.title}
                </DropdownItem>
              ))}
          </DropdownSubMenuContent>
        </DropdownSubMenu>
        <DropdownItem onClick={handleAddToQueue}>Add to queue</DropdownItem>
        <DropdownItem onClick={() => handleAddTrackToPlaylist(likedMusic!.id)}>
          Save to your Liked Musics
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};

export default TrackDropdown;
