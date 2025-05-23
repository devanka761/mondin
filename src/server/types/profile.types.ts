export interface UserProfile {
  id: string
  image?: string
  username: string
  displayname: string
  bio?: string
  badges?: number[]
  isFriend?: number
}
