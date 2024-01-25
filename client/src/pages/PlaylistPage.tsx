import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { FullPlaylist, Track } from "../app/types"
import { playEntirePlaylist } from "../features/player/playerSlice"
import { BsClock, BsPauseFill, BsPlayFill } from "react-icons/bs"
import TrackInPlaylist from "../components/Playlist/TrackInPlaylist"
import PlaylistOptions from "../components/Playlist/PlaylistOptions"
import { useGetPlaylistByIdQuery } from "../features/playlist/playlistApiSlice"
import PlaylistDetail from "../components/Playlist/PlaylistDetails"
import { DynamicBackground } from "../components/ui/DynamicBackground"

const PlaylistPage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const player = useAppSelector((state) => state.player)
  const { data: playlist, isFetching } = useGetPlaylistByIdQuery(id!)

  // fetching user

  // Để check xem state viewedPlaylist có gì thay đổi khi cập nhật
  const handlePlayPlaylist = () => {
    dispatch(playEntirePlaylist(playlist as FullPlaylist))
  }

  if (!isFetching && playlist)
    return (
      <div className="w-full text-linkwater">
        <DynamicBackground
          image={playlist.image}
          topOpacity={0}
          bottomOpacity={0.6}
          className="h-88 px-9 relative"
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
        </DynamicBackground>
        <div className="relative">
          <DynamicBackground
            image={playlist.image}
            topOpacity={0.6}
            bottomOpacity={1}
            className="absolute top-0 h-56 w-full opacity-50"
          />
          <div className="relative pt-4 px-9">
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
      </div>
    )
}

export default PlaylistPage
