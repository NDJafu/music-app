import { SidebarPlaylist } from '../../app/types';
import { useNavigate } from 'react-router-dom';

type Props = {
  playlist: SidebarPlaylist;
};

const PlaylistItem = ({ playlist }: Props) => {
  const navigate = useNavigate();

  if (playlist.title == 'Liked Music' && playlist.trackId.length == 0) return;

  return (
    <div
      className="flex h-16 cursor-pointer gap-2 p-1"
      onClick={() => navigate(`playlist/${playlist.id}`)}
    >
      <img
        src={playlist.image}
        alt={playlist.title}
        className="aspect-square h-full rounded-sm object-cover"
      />
      <div className="flex flex-col">
        <span className="text-base font-medium">{playlist.title}</span>
        <span className="text-sm font-normal text-linkwater/50">
          Playlist &#8226;{' '}
          {playlist.title == 'Liked Music'
            ? `${playlist.trackId.length} songs`
            : playlist.userId.username}
        </span>
      </div>
    </div>
  );
};

export default PlaylistItem;
