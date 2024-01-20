import { useAppSelector } from "../../app/hooks"
import PlaylistItem from "./PlaylistItem"
import PlaylistItemSkeleton from "./PlaylistItemSkeleton"
import { useGetPlaylistByUserQuery } from "../../features/playlist/playlistApiSlice"

const PlaylistList = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser)

  const { data: userPlaylists, isLoading } = useGetPlaylistByUserQuery(
    currentUser?.id!,
    { skip: !currentUser },
  )

  if (isLoading) return <PlaylistItemSkeleton itemCount={7} />

  if (!currentUser) return <div>Worthless bitch ass nigga</div>

  if (userPlaylists?.length == 1 && userPlaylists[0].title == "Liked Music")
    return (
      <div className="w-full bg-jarcata h-fit rounded px-4 py-3 flex flex-col gap-4">
        <h3 className="text-base">Create your first playlist</h3>
        <button className="bg-white text-jarcata text-sm w-fit font-semibold px-2 py-1 rounded-full">
          Create playlist
        </button>
      </div>
    )

  return (
    <div className="flex flex-col mb-28 gap-2">
      {userPlaylists?.map((playlist, index) => (
        <PlaylistItem key={index} playlist={playlist} />
      ))}
    </div>
  )
}

export default PlaylistList
