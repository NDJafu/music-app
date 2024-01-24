import React, { useRef, useState } from "react"
import { BsPencil, BsX } from "react-icons/bs"
import { useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { updateUserById } from "../../features/user/userSlice"
import { uploadFile } from "../../utils/uploadfile"
import { DynamicBackground } from "../ui/DynamicBackground"
import { useGetUserQuery } from "../../features/user/userApiSlice"

type EditForm = {
  image: File | undefined
  name: string
}

const ProfileBanner = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  // fetching user
  const { data: user, isLoading } = useGetUserQuery(id!)
  const currentUser = useAppSelector((state) => state.auth.currentUser)

  const isCurrentUser = id == currentUser?.id

  //edit profile modal
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState<string>()
  const [editProfileForm, setEditProfileForm] = useState<EditForm>({
    image: undefined,
    name: "",
  })

  const imageRef = useRef<HTMLInputElement>(null)

  const handleFormChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    switch (target.name) {
      case "avatar":
        const newAvatar = e.target.files
        setEditProfileForm({ ...editProfileForm, image: newAvatar?.[0] })
        if (newAvatar && newAvatar.length > 0) {
          const reader = new FileReader()
          reader.onload = (e) => {
            setPreview(e.target?.result as string)
          }
          reader.readAsDataURL(newAvatar[0])
        }
        e.target.value = ""
        return
      case "username":
        setEditProfileForm({ ...editProfileForm, name: e.target.value })
        return
    }
  }

  const handleChangeOnClick = () => {
    setTimeout(() => imageRef.current?.click(), 10)
    setPreview(undefined)
    setEditProfileForm({ ...editProfileForm, name: user?.username! })
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
  }
  const submitUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()

    let avatarURL = user?.avatar ?? null

    if (editProfileForm.image) {
      const response = await uploadFile(editProfileForm.image)
      avatarURL = response.fileURL
    }

    dispatch(
      updateUserById({
        id: user?.id,
        username: editProfileForm.name,
        avatar: avatarURL as string,
      }),
    )
  }

  return (
    <>
      <div className="w-full text-linkwater">
        {!isLoading && (
          <DynamicBackground
            image={currentUser?.avatar ?? ""}
            topOpacity={0}
            bottomOpacity={0.5}
            className="h-88 relative px-9"
          >
            <div className="absolute flex bottom-9 items-center gap-4">
              <div className="relative group">
                <img
                  src={currentUser?.avatar ?? ""}
                  alt="avatar"
                  className="w-60 h-60 rounded-full object-cover shadow-lg shadow-black/50"
                  loading="lazy"
                />
                {isCurrentUser && (
                  <div className="absolute top-0 w-60 h-60 hidden group-hover:flex flex-col items-center justify-center bg-black/50 rounded-full">
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
            className="bg-black/50 fixed inset-0 z-20"
            onClick={closeModal}
          ></div>
          <div className="fixed w-1/3 h-fit inset-0 m-auto z-30">
            <div className="bg-neutral-900 p-8 rounded-lg relative">
              <h3 className="text-2xl font-bold">Profiles details</h3>
              <button className="absolute right-8 top-8" onClick={closeModal}>
                <BsX size={32} />
              </button>
              <div className="flex py-6 items-center gap-4">
                <div className="relative group">
                  <img
                    src={preview ?? user?.avatar}
                    alt="preview"
                    className="w-52 h-52 rounded-full object-cover shadow-lg shadow-black/50"
                  />
                  <div className="absolute top-0 w-52 h-52 hidden group-hover:flex flex-col items-center justify-center bg-black/50 rounded-full gap-2">
                    <button
                      className="hover:underline"
                      onClick={handleChangeOnClick}
                    >
                      Choose photo
                    </button>
                    <BsPencil size={48} />
                    <button
                      className="hover:underline"
                      onClick={() => setPreview("")}
                    >
                      Remove photo
                    </button>
                  </div>
                </div>
                <form
                  className="flex flex-col gap-2 flex-grow items-end"
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
                    className="bg-neutral-800 p-2 focus:border-neutral-500 focus:outline-none focus:border rounded w-full"
                  />
                  <button
                    type="submit"
                    className="bg-jarcata rounded-full text-lg font-bold text-linkwater p-2 w-1/3"
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
  )
}

export default ProfileBanner
