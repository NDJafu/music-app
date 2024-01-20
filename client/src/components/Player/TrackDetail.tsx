import { Link } from "react-router-dom"
import { Track } from "../../app/types"

type Props = {
  track: Track
}

const TrackDetail = ({ track }: Props) => {
  return (
    <div className="flex gap-4 px-4 w-1/3">
      <img
        src={track.image}
        alt="thumbnail"
        className="rounded-lg object-cover w-[72px] h-[72px]"
      />
      <div className="overflow-hidden">
        <Link
          to={`/track/${track.id}`}
          className="text-lg font-bold truncate hover:underline"
        >
          {track.title}
        </Link>
        <p className="text-sm text-neutral-500 truncate">{track.artist}</p>
      </div>
    </div>
  )
}

export default TrackDetail
