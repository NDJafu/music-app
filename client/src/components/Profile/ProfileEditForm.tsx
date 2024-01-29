import React, { useContext, useRef, useState } from 'react';
import { User } from '../../app/types';
import { BsPencil } from 'react-icons/bs';
import { ModalContext } from '../ui/Modal';
import { uploadFile } from '../../utils/uploadfile';
import ImageInput from '../ui/ImageInput';
import { useEditUserMutation } from '../../features/user/userApiSlice';
import { useAppDispatch } from '../../app/hooks';
import { setCredentials } from '../../features/auth/authSlice';
import { useRefreshMutation } from '../../features/auth/authApiSlice';

const ProfileEditForm = ({ user }: { user: User }) => {
  const { toggleModal } = useContext(ModalContext);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [newUsername, setNewUsername] = useState(user.username);
  const [editUser] = useEditUserMutation();
  const [refresh] = useRefreshMutation();
  const [isLoading, setIsLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedImage(event.target.files?.[0]);
  }

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    let newUserAvatar = user.avatar;

    if (selectedImage) {
      const response = await uploadFile(selectedImage).catch(() => {
        setIsLoading(false);
        return;
      });
      newUserAvatar = response.fileURL;
    }

    await editUser({
      id: user.id,
      username: newUsername,
      image: newUserAvatar,
    })
      .unwrap()
      .then(() => {
        toggleModal();
        refresh();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      className="mt-8 flex items-center justify-between gap-4"
      onSubmit={submitForm}
    >
      <ImageInput
        ref={imageInputRef}
        onChange={handleImageChange}
        openExplorerOnRender
      />
      <div className="group/in-modal relative">
        <img
          className="h-52 w-52 rounded-full object-cover shadow-lg shadow-black/50 group-hover/in-modal:brightness-50"
          src={
            selectedImage ? URL.createObjectURL(selectedImage) : user?.avatar
          }
        />
        <div className="absolute inset-0 hidden flex-col items-center justify-center rounded-full group-hover/in-modal:flex">
          <BsPencil size={64} />
          <button
            type="button"
            className="hover:underline"
            onClick={() => {
              imageInputRef.current?.click();
            }}
          >
            Change image
          </button>
        </div>
      </div>
      <div className="flex flex-grow flex-col justify-center gap-2">
        <input
          type="text"
          value={newUsername}
          onChange={(e) => {
            setNewUsername(e.target.value);
          }}
          className="self-stretch rounded bg-neutral-800 p-2 outline-none outline-1 outline-offset-0 focus:outline-neutral-500"
        />
        <button
          type="submit"
          className="w-fit self-end rounded-full bg-jarcata px-8 py-2 text-lg font-bold text-linkwater disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
