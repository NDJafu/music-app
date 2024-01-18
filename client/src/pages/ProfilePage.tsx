import { BsThreeDots } from "react-icons/bs"
import ProfileBanner from "../components/Profile/ProfileBanner"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import TrackCard from "../components/Track/TrackCard"
import { useEffect } from "react"
import { getUserUpload } from "../features/track/trackSlice"
import { useGetTrackByUserQuery } from "../features/track/trackApiSlice"

const ProfilePage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  const userUploads = useAppSelector((state) => state.track.trackByUser)
  const { data: uploads } = useGetTrackByUserQuery(id!)
  console.log(uploads)

  useEffect(() => {
    dispatch(getUserUpload(id as string))
  }, [id])

  return (
    <>
      <ProfileBanner />
      <div className="mx-9 my-4">
        <button>
          <BsThreeDots size={32} />
        </button>
        <div className="my-2 flex flex-col gap-2">
          <h3 className="text-2xl font-semibold">
            {currentUser?.id == id ? "Your uploads" : "Their uploads"}
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {userUploads
              .slice(0, 7)
              .reverse()
              .map((track, index) => (
                <TrackCard key={index} track={track} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
