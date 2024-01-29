import React, { useRef, useState } from 'react';
import { BsPencil, BsX } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { updateUserById } from '../../features/user/userSlice';
import { uploadFile } from '../../utils/uploadfile';
import { DynamicBackground } from '../ui/DynamicBackground';
import { useGetUserQuery } from '../../features/user/userApiSlice';

type EditForm = {
  image: File | undefined;
  name: string;
};

const ProfileBanner = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  // fetching user
  const { data: user, isLoading } = useGetUserQuery(id!);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const isCurrentUser = id == currentUser?.id;

  //edit profile modal
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState<string>();
  const [editProfileForm, setEditProfileForm] = useState<EditForm>({
    image: undefined,
    name: '',
  });

  const imageRef = useRef<HTMLInputElement>(null);

  const handleFormChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    switch (target.name) {
      case 'avatar':
        const newAvatar = e.target.files;
        setEditProfileForm({ ...editProfileForm, image: newAvatar?.[0] });
        if (newAvatar && newAvatar.length > 0) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreview(e.target?.result as string);
          };
          reader.readAsDataURL(newAvatar[0]);
        }
        e.target.value = '';
        return;
      case 'username':
        setEditProfileForm({ ...editProfileForm, name: e.target.value });
        return;
    }
  };

  const handleChangeOnClick = () => {
    setTimeout(() => imageRef.current?.click(), 10);
    setPreview(undefined);
    setEditProfileForm({ ...editProfileForm, name: user?.username! });
    setShowModal(true);
  };

  function closeModal() {
    setShowModal(false);
  }
  const submitUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    let avatarURL = user?.avatar ?? null;

    if (editProfileForm.image) {
      const response = await uploadFile(editProfileForm.image);
      avatarURL = response.fileURL;
    }

    dispatch(
      updateUserById({
        id: user?.id,
        username: editProfileForm.name,
        avatar: avatarURL as string,
      })
    );
  };

  return (
    <>
      <div className="w-full text-linkwater">
        {!isLoading && (
          <DynamicBackground
            image={currentUser?.avatar ?? ''}
            topOpacity={0}
            bottomOpacity={0.5}
            className="relative h-88 px-9"
          >
            <div className="absolute bottom-9 flex items-center gap-4">
              <div className="group relative">
                <img
                  src={currentUser?.avatar ?? ''}
                  alt="avatar"
                  className="h-60 w-60 rounded-full object-cover shadow-lg shadow-black/50"
                  loading="lazy"
                />
                {isCurrentUser && (
                  <div className="absolute top-0 hidden h-60 w-60 flex-col items-center justify-center rounded-full bg-black/50 group-hover:flex">
                    <BsPencil size={60} />
                    <button
                      className="hover:underline"
                      onClick={handleChangeOnClick}
                    >
                      Choose photo
                    </button>
                  </div>
                )}
              </div>
              <div className="font-bold">
                <p className="text-sm">Profile</p>
                <h1 className="text-6xl">{user?.username}</h1>
              </div>
            </div>
          </DynamicBackground>
        )}
      </div>
      {showModal && (
        <>
          <div
            className="fixed inset-0 z-20 bg-black/50"
            onClick={closeModal}
          ></div>
          <div className="fixed inset-0 z-30 m-auto h-fit w-1/3">
            <div className="relative rounded-lg bg-neutral-900 p-8">
              <h3 className="text-2xl font-bold">Profiles details</h3>
              <button className="absolute right-8 top-8" onClick={closeModal}>
                <BsX size={32} />
              </button>
              <div className="flex items-center gap-4 py-6">
                <div className="group relative">
                  <img
                    src={preview ?? user?.avatar}
                    alt="preview"
                    className="h-52 w-52 rounded-full object-cover shadow-lg shadow-black/50"
                  />
                  <div className="absolute top-0 hidden h-52 w-52 flex-col items-center justify-center gap-2 rounded-full bg-black/50 group-hover:flex">
                    <button
                      className="hover:underline"
                      onClick={handleChangeOnClick}
                    >
                      Choose photo
                    </button>
                    <BsPencil size={48} />
                    <button
                      className="hover:underline"
                      onClick={() => setPreview('')}
                    >
                      Remove photo
                    </button>
                  </div>
                </div>
                <form
                  className="flex flex-grow flex-col items-end gap-2"
                  onSubmit={submitUpdateProfile}
                >
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/*"
                    ref={imageRef}
                    onChange={handleFormChanges}
                    className="hidden"
                  />
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={editProfileForm.name}
                    onChange={handleFormChanges}
                    className="w-full rounded bg-neutral-800 p-2 focus:border focus:border-neutral-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-1/3 rounded-full bg-jarcata p-2 text-lg font-bold text-linkwater"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileBanner;
