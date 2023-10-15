export interface User {
  id: string
  email: string
  username: string
  birthday: string
  password: string
  gender: string
  role: string
  follower: number
  avatar: string
}

export type CurrentUser = Pick<User, "id" | "email" | "avatar" | "role">

export interface Track {
  id: string
  title: string
  artist: string
  thumbnail: string
  uploader: string
  audio: string
  lyrics: string
  publicDate: Date
  duration: number
  privacy: boolean
  banned: boolean
}

export interface Playlist {
  id: string
  title: string
  creator: string
  thumbnail: string
}
export interface IncompletePlaylist extends Playlist {
  trackIds: string[]
}
export interface FullPlaylist extends Playlist {
  trackList: Track[]
}
