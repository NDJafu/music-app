import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getCurrentUserPlaylist } from "../../features/playlist/playlistSlice"
import PlaylistItem from "./PlaylistItem"
import PlaylistItemSkeleton from "./PlaylistItemSkeleton"

const PlaylistList = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  const currentUserPlaylists = useAppSelector(
    (state) => state.playlist.currentUserPlaylist,
  )
  const loading = useAppSelector((state) => state.playlist.loading)

  useEffect(() => {
    if (!currentUser) return

    dispatch(getCurrentUserPlaylist(currentUser.id))
  }, [currentUser])

  const ifLikedMusicIsEmpty =
    currentUserPlaylists.find((playlist) => playlist.title == "Liked Music")
      ?.trackIds.length == 0

  const onlyPlaylistIsLikedMusic =
    currentUserPlaylists.filter((playlist) => playlist.title != "Liked Music")
      .length == 0

  if (!currentUser || (ifLikedMusicIsEmpty && onlyPlaylistIsLikedMusic))
    return (
      <div className="w-full bg-jarcata h-fit rounded px-4 py-3 flex flex-col gap-4">
        <h3 className="text-base">Create your first playlist</h3>
        <button className="bg-white text-jarcata text-sm w-fit font-semibold px-2 py-1 rounded-full">
          Create playlist
        </button>
      </div>
    )

  if (loading) return <PlaylistItemSkeleton itemCount={7} />

  return (
    <div className="flex flex-col mb-28 gap-2">
      {currentUserPlaylists.map((playlist, index) => (
        <PlaylistItem key={index} playlist={playlist} />
      ))}
    </div>
  )
}

export default PlaylistList
