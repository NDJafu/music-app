import { useAppSelector } from "../app/hooks"
import { Track } from "../app/types"
import TrackCard from "../components/Track/TrackCard"
import TrackCardSkeleton from "../components/Skeletons/TrackCardSkeleton"
import { useGetAllTrackQuery } from "../features/track/trackApiSlice"

const Homepage = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  const { data: tracks, isLoading } = useGetAllTrackQuery()

  const formattedTracks = tracks
    ?.filter((track) =>
      currentUser?.id != track.uploader ? track.privacy == true : track,
    )
    .reverse()
    .slice(0, 7)

  return (
    <div className="text-linkwater relative">
      {/* Actual content */}
      <div className="absolute h-88 w-full bg-gradient-to-b from-martinique to-neutral-950" />
      <div className="top-20 px-9 relative h-[5000px]">
        <h2 className="text-3xl font-bold">New releases</h2>
        <div className="grid 2xl:grid-cols-7 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 my-4 gap-2">
          {isLoading ? (
            <TrackCardSkeleton itemCount={7} />
          ) : (
            formattedTracks?.map((track: Track, index) => (
              <TrackCard track={track} key={index} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Homepage
