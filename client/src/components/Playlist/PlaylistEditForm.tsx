import React, { useContext, useRef, useState } from 'react';
import { FullPlaylist } from '../../app/types';
import { BsPencil } from 'react-icons/bs';
import { ModalContext } from '../ui/Modal';
import { useEditPlaylistMutation } from '../../features/playlist/playlistApiSlice';
import { uploadFile } from '../../utils/uploadfile';
import ImageInput from '../ui/ImageInput';

const PlaylistEditForm = ({
  playlist,
}: {
  openExplorerOnRender?: boolean;
  playlist: FullPlaylist;
}) => {
  const { toggleModal } = useContext(ModalContext);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [newPlaylistTitle, setNewPlaylistTitle] = useState(playlist.title);
  const [editPlaylist] = useEditPlaylistMutation();
  const [isLoading, setIsLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedImage(event.target.files?.[0]);
  }

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    let newPlaylistImage = playlist.image;

    if (selectedImage) {
      const response = await uploadFile(selectedImage).catch(() => {
        setIsLoading(false);
        return;
      });
      newPlaylistImage = response.fileURL;
    }

    await editPlaylist({
      id: playlist.id,
      title: newPlaylistTitle,
      image: newPlaylistImage,
    })
      .unwrap()
      .then(() => {
        toggleModal();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      className="mt-8 flex items-center justify-between gap-4"
      onSubmit={submitForm}
    >
      <ImageInput ref={imageInputRef} onChange={handleImageChange} />
      <div className="group relative">
        <img
          className="h-52 w-52 object-cover shadow-lg shadow-black/50 group-hover:brightness-50"
          src={
            selectedImage ? URL.createObjectURL(selectedImage) : playlist?.image
          }
        />
        <div className="absolute inset-0 hidden flex-col items-center justify-center group-hover:flex ">
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
          value={newPlaylistTitle}
          onChange={(e) => {
            setNewPlaylistTitle(e.target.value);
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

export default PlaylistEditForm;
