import React, { useState } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import { Track } from '../../app/types';
import { useAppDispatch } from '../../app/hooks';
import { addToQueue, playNewSong } from '../../features/player/playerSlice';
import { useNavigate } from 'react-router-dom';

type Props = {
  track: Track;
};

const TrackCard = ({ track }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOnPlayButton, setIsOnPlayButton] = useState(false);
  const handlePlaySong = () => {
    dispatch(addToQueue(track));
    dispatch(playNewSong());
  };
  const handleViewSong = () => {
    if (isOnPlayButton) return;
    navigate(`/track/${track.id}`);
  };
  return (
    <div
      className="group hidden h-fit cursor-pointer overflow-hidden rounded-md bg-neutral-900 p-4 transition-colors
       duration-500
       hover:bg-neutral-800
       2xl:block
       sm:[&:nth-child(-n+2)]:block
       md:[&:nth-child(-n+3)]:block
       lg:[&:nth-child(-n+4)]:block
       xl:[&:nth-child(-n+5)]:block
       "
      onClick={handleViewSong}
    >
      <div className="relative">
        <img
          src={track.image}
          alt=""
          className="aspect-square w-full rounded object-cover"
        />
        <button
          className="absolute -bottom-2 right-1 flex aspect-square w-12 items-center justify-center rounded-full bg-jarcata-500 opacity-0 transition-all duration-500 group-hover:bottom-1 group-hover:opacity-100"
          onClick={handlePlaySong}
          onMouseOver={() => setIsOnPlayButton(true)}
          onMouseLeave={() => setIsOnPlayButton(false)}
        >
          <BsPlayFill size={28} />
        </button>
      </div>
      <div className="my-2">
        <p className="truncate font-extrabold">{track.title}</p>
        <p className="truncate text-sm opacity-60">{track.artist}</p>
      </div>
    </div>
  );
};

export default TrackCard;
