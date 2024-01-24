import { useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import {
  addToQueue,
  playNewSong,
  setPause,
} from "../features/player/playerSlice"
import { Track } from "../app/types"
import { BsHeart, BsHeartFill, BsPauseFill, BsPlayFill } from "react-icons/bs"
import { duration } from "../utils/utils"
import TrackDropdown from "../components/Track/TrackDropdown"
import {
  addTrackToLikedMusic,
  removeTrackFromLikedMusic,
} from "../features/playlist/playlistSlice"
import { useGetTrackQuery } from "../features/track/trackApiSlice"
import { DynamicBackground } from "../components/ui/DynamicBackground"

const TrackPage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const player = useAppSelector((state) => state.player)
  const { currentUserPlaylist } = useAppSelector((state) => state.playlist)
  const likedMusic = currentUserPlaylist.find(
    (playlist) => playlist.title == "Liked Music",
  )
  const ifSongIsLiked = likedMusic?.trackIds.includes(id!)

  const { data: track, isLoading } = useGetTrackQuery(id!)
  // fetching track
  const publicDate = new Date(track?.publicDate as Date)
  const year = publicDate.getFullYear()

  const handlePlaySong = () => {
    if (player.playing && track?.id == player.currentSong?.id) {
      dispatch(setPause())
    } else {
      dispatch(addToQueue(track as Track))
      dispatch(playNewSong())
    }
  }
  const handleLikedSong = () => {
    if (ifSongIsLiked) {
      dispatch(removeTrackFromLikedMusic(track as Track))
    } else {
      dispatch(addTrackToLikedMusic(track as Track))
    }
  }

  if (!isLoading && track)
    return (
      <div className="w-full text-linkwater">
        <DynamicBackground
          image={track.image}
          topOpacity={0}
          bottomOpacity={0.5}
          className="h-88 shadow-2xl shadow-neutral-500/8 relative px-9"
        >
          <div className="absolute flex bottom-9 items-end gap-4">
            <div className="relative">
              <img
                src={track.image}
                alt="avatar"
                className="w-60 h-60 object-cover shadow-lg shadow-black/50"
              />
            </div>
            <div className="font-bold flex flex-col gap-2">
              <p className="text-sm">Song</p>
              <h1 className="text-6xl">{track?.title}</h1>
              <p className="text-sm mt-10">
                {track.artist} &#8226;{" "}
                <span className="font-normal">
                  {track.title} &#8226; {year} &#8226; {duration(track)}
                </span>
              </p>
            </div>
          </div>
        </DynamicBackground>
        <div className="mx-9 my-4">
          <div className="flex items-center gap-8">
            <button
              className="rounded-full w-16 h-16 bg-jarcata-500 flex justify-center items-center hover:brightness-105"
              onClick={handlePlaySong}
            >
              {player.playing && track?.id == player.currentSong?.id ? (
                <BsPauseFill size={42} />
              ) : (
                <BsPlayFill size={42} />
              )}
            </button>
            <button onClick={handleLikedSong}>
              {ifSongIsLiked ? (
                <BsHeartFill size={32} />
              ) : (
                <BsHeart size={32} />
              )}
            </button>
            <TrackDropdown track={track} />
          </div>
          <h2 className="font-bold text-2xl my-4">Lyrics</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: track?.lyrics?.replace(/\n/g, "<br/>") as string,
            }}
            className="text-linkwater/50"
          ></div>
          quite obvious since this shit ain't free
        </div>
      </div>
    )
}

export default TrackPage
