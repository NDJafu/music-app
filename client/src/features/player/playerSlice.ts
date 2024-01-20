import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { FullPlaylist, Track } from "../../app/types"
import { OnProgressProps } from "react-player/base"
import { toast } from "react-toastify"

interface PlayerState {
  currentSong: Track | null
  progress: number
  duration: number
  playing: boolean
  volume: number
  muted: boolean
  shuffle: boolean
  loopTrack: boolean
  loopPlaylist: boolean
  playerQueue: Track[]
  queue: number
  error: string | null
}
const lastHeard = localStorage.getItem("lastHeard")

const initialState: PlayerState = {
  currentSong: lastHeard ? JSON.parse(lastHeard)[0] : null,
  progress: 0,
  duration: 0,
  playing: false,
  volume: Number(localStorage.getItem("volume")),
  muted: false,
  shuffle: false,
  loopTrack: false,
  loopPlaylist: false,
  playerQueue: lastHeard ? JSON.parse(lastHeard) : [],
  queue: 0,
  error: null,
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlay: (state) => {
      state.playing = true
    },
    setPause: (state) => {
      state.playing = false
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
      localStorage.setItem("volume", action.payload.toString())
    },
    playerMute: (state) => {
      state.muted = !state.muted
    },
    playerProgress: (state, action: PayloadAction<OnProgressProps>) => {
      state.progress = action.payload.played
    },
    playerDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload
    },
    toggleLoopSingleTrack: (state) => {
      state.loopTrack = !state.loopTrack
      state.loopPlaylist = false
    },
    addToQueue: (state, action: PayloadAction<Track>) => {
      if (state.currentSong?.id != action.payload.id)
        state.playerQueue.push(action.payload)
    },
    addPlaylistToQueue: (state, action: PayloadAction<FullPlaylist>) => {
      for (const Track of action.payload.trackId) {
        state.playerQueue.push(Track)
      }
      toast("Added to queue!")
    },
    playNewSong: (state) => {
      state.currentSong = state.playerQueue.at(-1) as Track
      state.queue = state.playerQueue.length - 1
      state.playing = true
    },
    playEntirePlaylist: (state, action: PayloadAction<FullPlaylist>) => {
      state.currentSong = action.payload.trackId[0]
      state.playerQueue = action.payload.trackId
      state.queue = 0
      state.playing = true
    },
    previousTrack: (state) => {
      state.queue -= 1
      state.currentSong = state.playerQueue[state.queue]
    },
    nextTrack: (state) => {
      state.queue += 1
      state.progress = 0
      state.currentSong = state.playerQueue[state.queue]
    },
  },
})

export const {
  setPlay,
  setPause,
  setVolume,
  playerMute,
  playerProgress,
  playerDuration,
  toggleLoopSingleTrack,
  addToQueue,
  addPlaylistToQueue,
  playNewSong,
  playEntirePlaylist,
  previousTrack,
  nextTrack,
} = playerSlice.actions

export default playerSlice.reducer
