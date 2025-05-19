export interface UserNotif {
  [key: string]: number
}
export interface UserLocked {
  currtab: boolean
  currcenter: boolean
  currcontent: boolean
}

export type UserInstance = object | null
