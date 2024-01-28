import { BsPencil, BsThreeDots } from "react-icons/bs"
import ProfileBanner from "../components/Profile/ProfileBanner"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import TrackCard from "../components/Track/TrackCard"
import { useGetTrackByUserQuery } from "../features/track/trackApiSlice"
import { useGetUserQuery } from "../features/user/userApiSlice"
import { DynamicBackground } from "../components/ui/DynamicBackground"
import ProfileEditModal from "../components/Profile/ProfileEditModal"

const ProfilePage = () => {
  const { id } = useParams()
  const { data: uploads } = useGetTrackByUserQuery(id!)
  const { data: user } = useGetUserQuery(id!)
  const currentUser = useAppSelector((state) => state.auth.currentUser)

  if (user)
    return (
      <>
        <DynamicBackground
          image={user.avatar}
          topOpacity={0}
          bottomOpacity={0.6}
          className="w-full h-88 relative px-9"
        >
          <div className="absolute bottom-9 flex items-center gap-4">
            <div className="group">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-60 h-60 rounded-full object-cover shadow-lg shadow-black/50"
                loading="lazy"
              />
              <ProfileEditModal {...user} />
            </div>
            <div className="font-bold">
              <p className="text-sm">Profile</p>
              <h1 className="text-6xl">{user.username}</h1>
            </div>
          </div>
        </DynamicBackground>
        <div className="relative">
          <DynamicBackground
            topOpacity={0.6}
            bottomOpacity={1}
            image={user.avatar}
            className="w-full h-56 absolute opacity-50"
          />
          <div className="px-9 py-4 relative">
            <button>
              <BsThreeDots size={32} />
            </button>
            <div className="my-2 flex flex-col gap-2">
              <h3 className="text-2xl font-semibold">
                {currentUser?.id == id ? "Your uploads" : "Their uploads"}
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {!!uploads &&
                  uploads
                    .slice(0, 7)
                    .reverse()
                    .map((track, index) => (
                      <TrackCard key={index} track={track} />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default ProfilePage
