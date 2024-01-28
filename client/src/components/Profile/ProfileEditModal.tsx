import { BsPencil } from "react-icons/bs"
import { User } from "../../app/types"
import { Modal, ModalTrigger, ModalContent, ModalTitle } from "../ui/Modal"
import ProfileEditForm from "./ProfileEditForm"

const ProfileEditModal = (user: User) => {
  return (
    <Modal>
      <div className="w-60 h-60 absolute top-0 rounded-full hidden bg-black/50 group-hover:flex flex-col justify-center items-center">
        <BsPencil size={60} />
        <ModalTrigger className="hover:underline">Choose photo</ModalTrigger>
      </div>
      <ModalContent className="fixed w-1/3 h-96 inset-0 m-auto bg-neutral-900 rounded-lg">
        <ModalTitle>Edit profile</ModalTitle>
        <ProfileEditForm user={user} />
      </ModalContent>
    </Modal>
  )
}

export default ProfileEditModal
