import { FullPlaylist } from "../../app/types"
import { Modal, ModalTrigger, ModalContent, ModalTitle } from "../ui/Modal"
import PlaylistEditForm from "./PlaylistEditForm"

const PlaylistEditModal = (playlist: FullPlaylist) => {
  return (
    <Modal>
      <ModalTrigger className="flex items-center gap-2 hover:bg-white/5 p-2 rounded-sm w-full">
        Edit playlist
      </ModalTrigger>
      <ModalContent className="fixed w-1/3 h-96 inset-0 m-auto bg-neutral-900 rounded-lg">
        <ModalTitle>Edit details</ModalTitle>
        <PlaylistEditForm playlist={playlist} />
      </ModalContent>
    </Modal>
  )
}

export default PlaylistEditModal
