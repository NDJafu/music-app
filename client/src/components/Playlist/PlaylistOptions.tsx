import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import PlaylistEditModal from './PlaylistEditModal';
import { FullPlaylist } from '../../app/types';
import { addPlaylistToQueue } from '../../features/player/playerSlice';
import { useNavigate } from 'react-router-dom';
import { deletePlaylistById } from '../../features/playlist/playlistSlice';

type OptionProps = {
  bottomBorder?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

const OptionButton = ({
  bottomBorder = false,
  onClick,
  children,
}: OptionProps) => (
  <button
    className={`flex w-full items-center gap-2 rounded-sm p-2 hover:bg-white/5 ${
      bottomBorder && 'border-b border-white/5'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const PlaylistOptions = (playlist: FullPlaylist) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const dropdownRef: React.RefObject<HTMLDivElement> = useRef(null);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setToggleDropdown((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!dropdownRef.current?.contains(event.target as Node)) {
      setToggleDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="relative h-8 w-8">
      <button onClick={handleToggleDropdown}>
        <BsThreeDots size={32} />
      </button>
      {toggleDropdown && (
        <div
          className="absolute left-0 top-10 z-10 w-48 rounded bg-neutral-800 p-1 text-base font-normal shadow-lg shadow-black/50"
          ref={dropdownRef}
        >
          {currentUser?.id == playlist.userId.id && (
            <PlaylistEditModal {...playlist} />
          )}
          <OptionButton
            bottomBorder
            onClick={() => dispatch(addPlaylistToQueue(playlist))}
          >
            Add to queue
          </OptionButton>
          <OptionButton
            onClick={() => {
              dispatch(deletePlaylistById(playlist.id));
              navigate('/');
            }}
          >
            Delete
          </OptionButton>
        </div>
      )}
    </div>
  );
};

export default PlaylistOptions;
