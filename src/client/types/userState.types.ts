import { KJSON } from "./helper.types"

export interface UserNotif {
  [key: string]: number
}
export interface UserLocked {
  currtab: boolean
  currcenter: boolean
  currcontent: boolean
}

export type Destroyable = void | string | number | boolean | KJSON
export interface PrimaryClass {
  readonly id: string
  isLocked: boolean
  createElement?(): void
  destroy(): Promise<void>
  update(): void | Promise<void>
  run(): void | Promise<void>
}
