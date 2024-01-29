import React, { useEffect, useRef, useState } from 'react';
import { Track } from '../../app/types';
import { duration } from '../../utils/utils';
import { BsThreeDots } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeTrackFromPlaylist } from '../../features/playlist/playlistSlice';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  track: Track;
  index: number;
};

const TrackInPlaylist = ({ index, track }: Props) => {
  const viewedPlaylist = useAppSelector(
    (state) => state.playlist.viewedPlaylist
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setToggleDropdown((prev) => !prev);
  };
  const dropdownRef: React.RefObject<HTMLDivElement> = useRef(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setToggleDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleRemoveFromPlaylist = () => {
    dispatch(
      removeTrackFromPlaylist(viewedPlaylist?.id as string, track, index)
    );
    setToggleDropdown(false);
  };

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-md px-4 py-2 text-linkwater ${
        toggleDropdown ? 'bg-white/25' : 'hover:bg-white/5'
      }`}
    >
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
      <button
        className="absolute right-2 opacity-50"
        onClick={handleToggleDropdown}
      >
        <BsThreeDots />
      </button>
      {toggleDropdown && (
        <div
          className="absolute right-0 top-10 z-10 w-48 rounded bg-neutral-800 p-1 text-sm font-normal shadow-lg shadow-black/50"
          ref={dropdownRef}
        >
          <button className="flex w-full items-center gap-2 rounded-sm border-b border-white/5 p-2 hover:bg-white/5">
            Add to queue
          </button>
          <button
            className="flex w-full items-center gap-2 rounded-sm p-2 hover:bg-white/5"
            onClick={() => navigate(`/track/${track.id}`)}
          >
            Go to this track page
          </button>
          {viewedPlaylist && (
            <button
              className="flex w-full items-center gap-2 rounded-sm p-2 hover:bg-white/5"
              onClick={handleRemoveFromPlaylist}
            >
              Remove from this playlist
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackInPlaylist;
