import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Track } from "../app/types"
import TrackCard from "../components/Track/TrackCard"
import TrackCardSkeleton from "../components/Skeletons/TrackCardSkeleton"
import { getNewUpload } from "../features/track/trackSlice"

const Homepage = () => {
  const dispatch = useAppDispatch()
  const newSong = useAppSelector((state) => state.track.newUpload)
  const loading = useAppSelector((state) => state.track.loading)
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  const sortedNewSong = newSong
    .filter((track) => {
      if (currentUser?.id == track.uploader) return track
      else return track.privacy == true
    })
    .reverse()
  useEffect(() => {
    dispatch(getNewUpload())
  }, [])

  return (
    <div className="pt-20 px-9 text-linkwater h-[5000px]">
      {/* Actual content */}
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold">New releases</h2>
        <div className="grid 2xl:grid-cols-7 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 my-4 gap-2">
          {loading ? (
            <TrackCardSkeleton itemCount={7} />
          ) : (
            <>
              {sortedNewSong.slice(0, 7).map((track: Track, index) => (
                <TrackCard track={track} key={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Homepage
