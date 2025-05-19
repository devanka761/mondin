export type ChatType = "text" | "audio" | "image" | "video" | "call" | "file" | "deleted"
export interface ChatUser {
  username: string
  userid: string
  photo?: string
  badges?: string[]
}
export interface ChatLastChat {
  userid: string
  text?: string
  type: ChatType
  timestamp: number
  watch: string[]
}
export interface ChatCard {
  user: ChatUser
  lastchat: ChatLastChat
  unread: number
}
