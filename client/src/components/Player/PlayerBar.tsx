import { useEffect, useRef } from "react"
import TrackDetail from "./TrackDetail"
import TrackControls from "./TrackControls"
import ReactPlayer from "react-player"
import VolumeSlider from "./VolumeSlider"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  playerDuration,
  playerMute,
  playerProgress,
  setPause,
  setPlay,
  setVolume,
  toggleLoopSingleTrack,
  nextTrack,
  previousTrack,
} from "../../features/player/playerSlice"
import { OnProgressProps } from "react-player/base"

const PlayerBar = () => {
  const playerRef = useRef<ReactPlayer | null>(null)
  const {
    progress,
    duration,
    playing,
    volume,
    muted,
    loopTrack,
    queue,
    playerQueue,
    currentSong,
  } = useAppSelector((state) => state.player)
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    localStorage.setItem(
      "lastHeard",
      JSON.stringify(currentSong ? [currentSong] : []),
    )
  }, [queue])

  const handlePlay = () => {
    dispatch(setPlay())
  }

  const handlePause = () => {
    dispatch(setPause())
  }

  const handleVolumeChange = (newVolume: number) => {
    dispatch(setVolume(newVolume))
  }

  const toggleMute = () => {
    dispatch(playerMute())
  }

  const handleProgress = (state: OnProgressProps) => {
    dispatch(playerProgress(state))
  }

  const handleDuration = (duration: number) => {
    dispatch(playerDuration(duration))
  }

  const toggleLoop = () => {
    dispatch(toggleLoopSingleTrack())
  }

  const handleNextSong = () => {
    if (queue >= playerQueue.length - 1) return
    dispatch(nextTrack())
  }

  const handlePreviousSong = () => {
    if (queue == 0) return
    dispatch(previousTrack())
  }
  const handleEnded = () => {
    if (queue >= playerQueue.length - 1) return
    dispatch(nextTrack())
    dispatch(setPlay())
  }

  if (!currentUser)
    return (
      <div className="bg-jarcata-500 h-fit inset-x-2 text-linkwater p-4 flex flex-col gap-2 rounded-lg">
        <h2 className="text-2xl font-bold">It's just a preview</h2>
        <p>
          <a className="font-bold hover:underline" href="/signup">
            Sign up
          </a>{" "}
          to Unicord now to join in, and explore the wide-range of musics our
          community creates & share.
        </p>
      </div>
    )

  return (
    <div className="bg-black text-linkwater mb-0 py-4 flex items-center justify-between">
      <ReactPlayer
        ref={playerRef}
        url={currentSong?.audio}
        playing={playing}
        volume={volume}
        muted={muted}
        loop={loopTrack}
        onPlay={handlePlay}
        onPause={handlePause}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={handleEnded}
        style={{ display: "none" }}
      />
      {currentSong ? (
        <TrackDetail track={currentSong} />
      ) : (
        <div className="w-1/3"></div>
      )}
      <TrackControls
        playerRef={playerRef}
        playing={playing}
        loop={loopTrack}
        volume={volume}
        muted={muted}
        progress={progress}
        duration={duration}
        handlePlay={handlePlay}
        handlePause={handlePause}
        toggleLoop={toggleLoop}
        handleNext={handleNextSong}
        handlePrevious={handlePreviousSong}
      />
      <VolumeSlider
        volume={volume}
        muted={muted}
        toggleMute={toggleMute}
        handleVolumeChange={handleVolumeChange}
      />
    </div>
  )
}

export default PlayerBar
