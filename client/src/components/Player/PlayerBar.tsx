import { useEffect, useMemo, useRef } from 'react';
import TrackDetail from './TrackDetail';
import TrackControls from './TrackControls';
import ReactPlayer from 'react-player';
import VolumeSlider from './VolumeSlider';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  playerDuration,
  toggleMute,
  playerProgress,
  setPause,
  setPlay,
  setVolume,
  toggleLoopSingleTrack,
  nextTrack,
  previousTrack,
} from '../../features/player/playerSlice';
import { OnProgressProps } from 'react-player/base';
import { Link } from 'react-router-dom';

const PlayerBar = () => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const {
    progress,
    duration,
    playing,
    volume,
    muted,
    loopTrack,
    queue,
    playerQueue,
  } = useAppSelector((state) => state.player);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem(
      'lastHeard',
      JSON.stringify(playerQueue[queue] ? [playerQueue[queue]] : [])
    );
  }, [queue]);

  const currentSong = useMemo(() => playerQueue[queue], [queue]);

  const handlePlay = () => {
    dispatch(setPlay());
  };

  const handlePause = () => {
    dispatch(setPause());
  };

  const handleVolumeChange = (newVolume: number) => {
    dispatch(setVolume(newVolume));
  };

  const handleMute = () => {
    dispatch(toggleMute());
  };

  const handleProgress = (state: OnProgressProps) => {
    dispatch(playerProgress(state));
  };

  const handleDuration = (duration: number) => {
    dispatch(playerDuration(duration));
  };

  const toggleLoop = () => {
    dispatch(toggleLoopSingleTrack());
  };

  const handleNextSong = () => {
    if (queue >= playerQueue.length - 1) return;
    dispatch(nextTrack());
  };

  const handlePreviousSong = () => {
    if (queue == 0) return;
    dispatch(previousTrack());
  };
  const handleEnded = () => {
    if (queue >= playerQueue.length - 1) return;
    dispatch(nextTrack());
    dispatch(setPlay());
  };

  if (!currentUser)
    return (
      <div className="mx-2 mb-2 flex h-fit flex-col gap-2 rounded-lg bg-jarcata-500 p-4 text-linkwater">
        <h2 className="text-2xl font-bold">It's just a preview</h2>
        <p>
          <Link className="font-bold hover:underline" to="/signup">
            Sign up
          </Link>{' '}
          to Unicord now to join in, and explore the wide-range of musics our
          community creates & share.
        </p>
      </div>
    );

  return (
    <div className="mb-0 flex items-center justify-between bg-black py-4 text-linkwater">
      <ReactPlayer
        ref={playerRef}
        url={currentSong.audio}
        playing={playing}
        volume={volume}
        muted={muted}
        loop={loopTrack}
        onPlay={handlePlay}
        onPause={handlePause}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={handleEnded}
        style={{ display: 'none' }}
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
        toggleMute={handleMute}
        handleVolumeChange={handleVolumeChange}
      />
    </div>
  );
};

export default PlayerBar;
