export interface EmailProvider {
  provider: string
  email: string
}

export interface MeDB {
  id?: string
  username?: string
  displayname?: string
  email?: EmailProvider[]
  badges?: number[]
  bio?: string
  image?: string
}

export type ChatType = "text" | "image" | "video" | "audio" | "file" | "deleted" | "call"
export interface UserDB {
  id: string
  username: string
  displayname: string
  badges?: number[]
  bio?: string
  image?: string
}
export interface ChatDB {
  userid: string
  timestamp: number
  watch?: string[]
  text?: string
  edit?: string
  type?: ChatType
  reply?: string
  url?: string
}
export interface ChatsDB {
  u: UserDB
  c: {
    [key: string]: ChatDB
  }
}
export interface Databases {
  me: MeDB
  c: { [key: string]: ChatsDB }
}
