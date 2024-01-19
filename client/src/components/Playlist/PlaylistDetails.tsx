import { Link } from "react-router-dom"
import { FullPlaylist } from "../../app/types"

const PlaylistDetail = (playlist: FullPlaylist) => {
  const playlistDuration = () => {
    const durationInSeconds = playlist?.trackId.reduce(
      (totalDuration, track) => totalDuration + track.duration,
      0,
    )

    if (!durationInSeconds) return ""

    const durationInHours = Math.floor(durationInSeconds / 3600)
    const durationInMinutes = Math.floor(durationInSeconds / 60)
    const durationLeft = Math.ceil(durationInSeconds % 60)

    if (durationInHours >= 5) return `${durationInHours} hours`

    if (durationInHours >= 1)
      return `${durationInHours} hours, ${
        durationInMinutes - durationInHours * 60
      } mins`

    return `${durationInMinutes} mins, ${durationLeft} secs`
  }

  return (
    <p className="text-sm mt-10">
      <Link to={`/user/${playlist.userId.id}`} className="hover:underline">
        {playlist.userId.username}
      </Link>{" "}
      {playlist?.trackId.length > 0 && (
        <span className="font-normal">
          &#8226; {`${playlist?.trackId.length} songs, `}
          <span className="opacity-75">About {playlistDuration()}</span>
        </span>
      )}
    </p>
  )
}

export default PlaylistDetail
