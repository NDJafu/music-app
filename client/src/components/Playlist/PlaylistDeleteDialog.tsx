import React, { useContext } from 'react';
import {
  Modal,
  ModalContent,
  ModalContext,
  ModalTitle,
  ModalTrigger,
} from '../ui/Modal';
import { FullPlaylist } from '../../app/types';
import { useDeletePlaylistMutation } from '../../features/playlist/playlistApiSlice';
import { useNavigate } from 'react-router-dom';

const DialogButtons = (playlist: FullPlaylist) => {
  const { toggleModal, showModal } = useContext(ModalContext);
  const [deletePlaylist] = useDeletePlaylistMutation();
  const navigate = useNavigate();

  function handleDeletePlaylist() {
    deletePlaylist(playlist.id)
      .unwrap()
      .then(() => {
        toggleModal();
        navigate('/');
      });
  }

  return (
    <div className="flex items-center justify-end gap-4 font-semibold">
      <button onClick={toggleModal}>Cancel</button>
      <button
        className="rounded-full bg-jarcata px-6 py-2"
        onClick={handleDeletePlaylist}
      >
        Delete
      </button>
    </div>
  );
};

const PlaylistDeleteDialog = (playlist: FullPlaylist) => {
  return (
    <Modal>
      <ModalTrigger className="flex w-full items-center gap-2 rounded-sm p-2 hover:bg-white/5">
        Delete
      </ModalTrigger>
      <ModalContent className="fixed inset-0 m-auto h-fit w-96 rounded-lg bg-neutral-900">
        <ModalTitle>Delete playlist</ModalTitle>
        <div className="flex h-24 pt-4">
          Are you sure you wanna delete this playlist?
        </div>
        <DialogButtons {...playlist} />
      </ModalContent>
    </Modal>
  );
};

export default PlaylistDeleteDialog;
