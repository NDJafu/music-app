import React, { useContext, useEffect, useRef, useState } from "react"
import { FullPlaylist } from "../../app/types"
import { BsPencil } from "react-icons/bs"
import { ModalContext } from "../ui/Modal"
import { useEditPlaylistMutation } from "../../features/playlist/playlistApiSlice"
import { uploadFile } from "../../utils/uploadfile"

const PlaylistEditForm = ({
  openExplorerOnRender = false,
  playlist,
}: {
  openExplorerOnRender?: boolean
  playlist: FullPlaylist
}) => {
  const { toggleModal } = useContext(ModalContext)
  const [selectedImage, setSelectedImage] = useState<File>()
  const [newPlaylistTitle, setNewPlaylistTitle] = useState(playlist.title)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [editPlaylist] = useEditPlaylistMutation()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (openExplorerOnRender) imageInputRef.current?.click()
  }, [])

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedImage(event.target.files?.[0])
  }

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    let newPlaylistImage = playlist.image

    if (selectedImage) {
      const response = await uploadFile(selectedImage).catch(() => {
        setIsLoading(false)
        return
      })
      newPlaylistImage = response.fileURL
    }

    await editPlaylist({
      id: playlist.id,
      title: newPlaylistTitle,
      image: newPlaylistImage,
    })
      .unwrap()
      .then(() => {
        toggleModal()
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <form
      className="flex items-center justify-between gap-4 mt-8"
      onSubmit={submitForm}
    >
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      <div className="relative group">
        <img
          className="w-52 h-52 object-cover shadow-lg shadow-black/50 group-hover:brightness-50"
          src={
            selectedImage ? URL.createObjectURL(selectedImage) : playlist?.image
          }
        />
        <div className="absolute inset-0 hidden group-hover:flex flex-col justify-center items-center ">
          <BsPencil size={64} />
          <button
            type="button"
            className="hover:underline"
            onClick={() => {
              imageInputRef.current?.click()
            }}
          >
            Change image
          </button>
        </div>
      </div>
      <div className="flex-grow flex flex-col gap-2 justify-center">
        <input
          type="text"
          value={newPlaylistTitle}
          onChange={(e) => {
            setNewPlaylistTitle(e.target.value)
          }}
          className="bg-neutral-800 self-stretch p-2 rounded focus:outline-neutral-500 outline-1 outline-none outline-offset-0"
        />
        <button
          type="submit"
          className="bg-jarcata rounded-full text-lg font-bold text-linkwater px-8 py-2 w-fit self-end disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default PlaylistEditForm
