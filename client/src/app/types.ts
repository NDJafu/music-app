export interface User {
  id: string
  email: string
  username: string
  birthday: Date
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
  image: string
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
  userId: Pick<User, "id" | "username">
  image: string
}
export interface SidebarPlaylist extends Playlist {
  trackId: string[]
}
export interface FullPlaylist extends Playlist {
  trackId: Track[]
}
