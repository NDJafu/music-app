import { FullPlaylist } from '../../app/types';
import { duration } from '../../utils/utils';
import { BsThreeDots } from 'react-icons/bs';
import { useAppSelector } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from '../ui/Dropdown';
import { useRemoveTrackFromPlaylistMutation } from '../../features/playlist/playlistApiSlice';
import { toast } from 'react-toastify';

const PlaylistTracks = (playlist: FullPlaylist) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const [removeTrackFromPlaylist] = useRemoveTrackFromPlaylistMutation();

  function handleRemoveTrack(playlist_id: string, track_id: string) {
    removeTrackFromPlaylist({
      playlist_id,
      track_id,
    })
      .unwrap()
      .then(() => toast.success('Remove from playlist success'));
  }

  return (
    <>
      {playlist.trackId.map((track, index) => (
        <div className="flex items-center justify-between gap-4 rounded-md px-4 py-2 text-linkwater hover:bg-white/25">
          <span className="w-3">{index + 1}</span>
          <div className="flex flex-grow items-center gap-4">
            <img
              src={track.image}
              alt="thumbnail"
              className="h-10 w-10 object-cover"
            />
            <div className="overflow-hidden">
              <Link to={`/track/${track.id}`} className="hover:underline">
                {track.title}
              </Link>
              <p className="text-xs opacity-50">{track.artist}</p>
            </div>
          </div>
          <div className="mr-4 text-xs opacity-50">{duration(track)}</div>
          <Dropdown>
            <DropdownTrigger className="flex items-center">
              <BsThreeDots />
            </DropdownTrigger>
            <DropdownContent className="mt-4">
              <DropdownItem onClick={() => {}}>Add to queue</DropdownItem>
              <DropdownItem onClick={() => navigate(`/track/${track.id}`)}>
                Go to this track page
              </DropdownItem>
              <DropdownSeparator />
              {currentUser?.id == playlist.userId.id && (
                <DropdownItem
                  onClick={() => handleRemoveTrack(playlist.id, track.id)}
                >
                  Remove from this playlist
                </DropdownItem>
              )}
            </DropdownContent>
          </Dropdown>
        </div>
      ))}
    </>
  );
};

export default PlaylistTracks;
