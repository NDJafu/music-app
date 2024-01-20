import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { FullPlaylist, Track } from "../app/types"
import { playEntirePlaylist } from "../features/player/playerSlice"
import { getColor } from "../utils/colorthief"
import { BsClock, BsPauseFill, BsPlayFill } from "react-icons/bs"
import TrackInPlaylist from "../components/Playlist/TrackInPlaylist"
import PlaylistOptions from "../components/Playlist/PlaylistOptions"
import { useGetPlaylistByIdQuery } from "../features/playlist/playlistApiSlice"
import PlaylistDetail from "../components/Playlist/PlaylistDetails"

const PlaylistPage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const player = useAppSelector((state) => state.player)
  const { data: playlist, isLoading } = useGetPlaylistByIdQuery(id!)

  // fetching user
  const [bgColor, setBgColor] = useState("#777777")

  const setPlaylistBackgroundColor = async (image: string) => {
    const color = await getColor(image)
    setBgColor(`${color[0]},${color[1]},${color[2]}`)
  }

  // Để check xem state viewedPlaylist có gì thay đổi khi cập nhật
  useEffect(() => {
    if (!playlist) return
    setPlaylistBackgroundColor(playlist?.image)
  }, [playlist])

  const ifSameSongIsPlaying = (track: Track) => {
    return player.playing && track.id == player.currentSong?.id
  }

  const handlePlayPlaylist = () => {
    dispatch(playEntirePlaylist(playlist as FullPlaylist))
  }
  if (!isLoading && playlist)
    return (
      <div className="w-full text-linkwater">
        <div
          style={{
            backgroundColor: `rgba(${bgColor},0.4)`,
            boxShadow: `0 120px 120px 20px rgba(${bgColor},0.2)`,
          }}
          className="h-88 shadow-2xl shadow-neutral-500/8 relative px-9"
        >
          <div className="absolute flex bottom-9 items-end gap-4">
            <div className="relative">
              <img
                src={playlist?.image}
                alt="avatar"
                className="w-60 h-60 object-cover shadow-lg shadow-black/50"
              />
            </div>
            <div className="font-bold flex flex-col gap-2">
              <p className="text-sm">Playlist</p>
              <h1 className="text-6xl">{playlist?.title}</h1>
              <PlaylistDetail {...playlist} />
            </div>
          </div>
        </div>
        <div className="mx-9 my-4">
          <div className="flex items-center gap-8">
            <button
              className="rounded-full w-16 h-16 bg-jarcata-500 flex justify-center items-center hover:brightness-105"
              onClick={handlePlayPlaylist}
            >
              {player.playing && playlist?.id == player.currentSong?.id ? (
                <BsPauseFill size={42} />
              ) : (
                <BsPlayFill size={42} />
              )}
            </button>
            {playlist.title != "Liked Music" && (
              <PlaylistOptions {...playlist} />
            )}
          </div>
          {playlist?.trackId.length > 0 && (
            <div className="flex my-4 text-linkwater/50 items-center justify-between gap-4 px-4 py-4 border-b border-white/5 font-light">
              <span>#</span>
              <span className="flex-grow">Title</span>
              <span className="mr-4">
                <BsClock />
              </span>
            </div>
          )}
          {playlist?.trackId.map((track, index) => (
            <TrackInPlaylist key={index} track={track} index={index} />
          ))}
        </div>
      </div>
    )
}

export default PlaylistPage
