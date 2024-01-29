import { FullPlaylist } from '../../app/types';
import { Modal, ModalTrigger, ModalContent, ModalTitle } from '../ui/Modal';
import PlaylistEditForm from './PlaylistEditForm';

const PlaylistEditModal = (playlist: FullPlaylist) => {
  return (
    <Modal>
      <ModalTrigger className="flex w-full items-center gap-2 rounded-sm p-2 hover:bg-white/5">
        Edit playlist
      </ModalTrigger>
      <ModalContent className="fixed inset-0 m-auto h-96 w-1/3 rounded-lg bg-neutral-900">
        <ModalTitle>Edit details</ModalTitle>
        <PlaylistEditForm playlist={playlist} />
      </ModalContent>
    </Modal>
  );
};

export default PlaylistEditModal;
