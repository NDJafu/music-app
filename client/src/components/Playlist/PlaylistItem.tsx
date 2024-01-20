import { SidebarPlaylist } from "../../app/types"
import { useNavigate } from "react-router-dom"

type Props = {
  playlist: SidebarPlaylist
}

const PlaylistItem = ({ playlist }: Props) => {
  const navigate = useNavigate()

  if (playlist.title == "Liked Music" && playlist.trackId.length == 0) return

  return (
    <div
      className="flex h-16 p-1 gap-2 cursor-pointer"
      onClick={() => navigate(`playlist/${playlist.id}`)}
    >
      <img
        src={playlist.image}
        alt={playlist.title}
        className="rounded-sm aspect-square h-full object-cover"
      />
      <div className="flex flex-col">
        <span className="font-medium text-base">{playlist.title}</span>
        <span className="font-normal text-sm text-linkwater/50">
          Playlist &#8226;{" "}
          {playlist.title == "Liked Music"
            ? `${playlist.trackId.length} songs`
            : playlist.userId.username}
        </span>
      </div>
    </div>
  )
}

export default PlaylistItem
