import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '../ui/Dropdown';
import { BsThreeDots } from 'react-icons/bs';
import { useAppSelector } from '../../app/hooks';
import ProfileEditForm from './ProfileEditForm';
import { Modal, ModalContent, ModalTitle, ModalTrigger } from '../ui/Modal';
import { User } from '../../app/types';

const ProfileOptions = (user: User) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  return (
    <div className="my-6 w-fit">
      <Dropdown>
        <DropdownTrigger className="flex items-center">
          <BsThreeDots size={32} />
        </DropdownTrigger>
        {user.id == currentUser?.id ? (
          <DropdownContent rightSide>
            <Modal>
              <ModalTrigger className="flex w-full items-center justify-between gap-2 rounded-sm p-2 text-start text-base font-normal hover:bg-white/5">
                Edit profile
              </ModalTrigger>
              <ModalContent className="fixed inset-0 m-auto h-96 w-1/3 rounded-lg bg-neutral-900">
                <ModalTitle>Edit profile</ModalTitle>
                <ProfileEditForm user={user} />
              </ModalContent>
            </Modal>
            <DropdownItem onClick={() => {}}>Copy link to profile</DropdownItem>
          </DropdownContent>
        ) : (
          <DropdownContent rightSide>
            <DropdownItem onClick={() => {}}>I ain't do nun</DropdownItem>
          </DropdownContent>
        )}
      </Dropdown>
    </div>
  );
};

export default ProfileOptions;
