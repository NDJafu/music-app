import React, { useEffect, useRef, useState } from 'react';
import { BsCollection, BsPlus } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createNewPlaylist } from '../../features/playlist/playlistSlice';

const PlaylistDropdown = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const dialogRef: React.RefObject<HTMLDivElement> = useRef(null);
  const dispatch = useAppDispatch();
  const currentUserPlaylists = useAppSelector(
    (state) => state.playlist.currentUserPlaylist
  );

  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      setToggleModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleCreateNewPlaylist = () => {
    const numberOfPlaylists = currentUserPlaylists.length;
    const defaultNewPlaylistTitle = `My Playlist #${numberOfPlaylists}`;

    dispatch(createNewPlaylist(defaultNewPlaylistTitle));
  };
  return (
    <div className="relative -right-4 h-8 w-8">
      <button
        className="absolute inset-y-0 right-0"
        onClick={handleToggleModal}
      >
        <BsPlus size={32} />
      </button>
      {toggleModal && (
        <>
          <div
            className="absolute left-0 top-10 w-48 rounded bg-neutral-800 p-1 text-base font-normal shadow-lg shadow-black/50"
            ref={dialogRef}
          >
            <button
              className="flex w-full items-center gap-2 rounded-sm p-2 hover:bg-white/5"
              onClick={handleCreateNewPlaylist}
            >
              <BsCollection />
              Create new playlist
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PlaylistDropdown;
