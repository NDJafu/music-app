import { BsPencil } from 'react-icons/bs';
import { User } from '../../app/types';
import { Modal, ModalTrigger, ModalContent, ModalTitle } from '../ui/Modal';
import ProfileEditForm from './ProfileEditForm';

const ProfileEditModal = (user: User) => {
  return (
    <Modal>
      <div className="absolute top-0 hidden h-60 w-60 flex-col items-center justify-center rounded-full bg-black/50 group-hover:flex">
        <BsPencil size={60} />
        <ModalTrigger className="hover:underline">Choose photo</ModalTrigger>
      </div>
      <ModalContent className="fixed inset-0 m-auto h-96 w-1/3 rounded-lg bg-neutral-900">
        <ModalTitle>Edit profile</ModalTitle>
        <ProfileEditForm user={user} />
      </ModalContent>
    </Modal>
  );
};

export default ProfileEditModal;
