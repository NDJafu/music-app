import React from 'react';
import { BsHeart, BsHeartFill, BsPauseFill, BsPlayFill } from 'react-icons/bs';
import TrackDropdown from './TrackDropdown';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Track } from '../../app/types';
import {
  setPause,
  addToQueue,
  playNewSong,
} from '../../features/player/playerSlice';
import {
  useAddTrackToPlaylistMutation,
  useGetPlaylistByUserQuery,
  useRemoveTrackFromPlaylistMutation,
} from '../../features/playlist/playlistApiSlice';

const TrackOptions = (track: Track) => {
  const { playing, currentSong } = useAppSelector((state) => state.player);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const { data: playlists } = useGetPlaylistByUserQuery(currentUser!.id, {
    skip: !currentUser,
  });
  const [removeTrackFromPlaylist] = useRemoveTrackFromPlaylistMutation();
  const [addTrackToPlaylist] = useAddTrackToPlaylistMutation();
  const dispatch = useAppDispatch();

  const handlePlaySong = () => {
    if (playing && track.id == currentSong?.id) {
      dispatch(setPause());
    } else {
      dispatch(addToQueue(track));
      dispatch(playNewSong());
    }
  };

  const likedMusic = playlists?.find(
    (playlist) => playlist.title == 'Liked Music'
  );

  const ifTrackIsLiked = likedMusic?.trackId.includes(track.id);

  const handleLikeTrack = () => {
    if (ifTrackIsLiked) {
      removeTrackFromPlaylist({
        playlist_id: likedMusic!.id,
        track_id: track.id,
      });
    } else {
      addTrackToPlaylist({
        playlist_id: likedMusic!.id,
        track_id: track.id,
      });
    }
  };

  return (
    <div className="flex items-center gap-8">
      <button
        className="flex h-16 w-16 items-center justify-center rounded-full bg-jarcata-500 hover:brightness-105"
        onClick={handlePlaySong}
      >
        {playing && track?.id == currentSong?.id ? (
          <BsPauseFill size={42} />
        ) : (
          <BsPlayFill size={42} />
        )}
      </button>
      <button onClick={handleLikeTrack} className="flex items-center">
        {ifTrackIsLiked ? <BsHeartFill size={32} /> : <BsHeart size={32} />}
      </button>
      <TrackDropdown track={track} playlists={playlists!} />
    </div>
  );
};

export default TrackOptions;
