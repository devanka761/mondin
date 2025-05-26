import { UserProfile } from "../../server/types/profile.types"

export interface EmailProvider {
  provider: string
  email: string
}

export interface PeerDB {
  peerid: string
  peerConfig: {
    host: string
    port?: number
    key: string
    path: string
    config?: {
      iceServers: [
        { urls: string },
        {
          urls: string
          username: string
          credential: string
        }
      ]
    }
  }
}

export interface MeDB {
  id?: string
  username?: string
  displayname?: string
  email?: EmailProvider[]
  badges?: number[]
  bio?: string
  image?: string
  req?: UserProfile[]
}

export type ChatType = "text" | "image" | "video" | "audio" | "file" | "deleted" | "call"
export interface UserDB {
  id: string
  username: string
  displayname: string
  badges?: number[]
  bio?: string
  image?: string
  isFriend?: number
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
  unread: {
    g?: { [key: string]: string | number | boolean }
    c?: { [key: string]: string | number | boolean }
    r?: { [key: string]: string | number | boolean }
  }
}
