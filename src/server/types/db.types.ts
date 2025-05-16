import { PossibleData, SessionUserDatum, TempUserData, TempUserDatum, UserUID } from "./binder.types"

export interface TemporaryAuth {
  email: string
  otp: {
    code: string | number
    expiry: number
  }
  rate: number
  cd?: number
}

export interface UserProcess {
  id?: string
  data: TempUserData
}

export interface UserTemp {
  id: string
  data: TempUserDatum
  peer?: string
  zzz?: PossibleData[]
}

export interface UserFixed extends UserTemp {
  id: string
  uname: string
  email: string
  dname: string
  data: SessionUserDatum
  b?: number[]
  bio?: string
  req?: UserUID[]
  img?: string
  lu?: number
  ld?: number
  lb?: number
}

interface ChatObject {
  u: UserUID
  ts: string
  w?: string[]
  txt?: string
  e?: string
  i?: string
  d?: string
  r?: string
  v?: string
  vc?: 1 | 0
  rj?: 1 | 0
  dur?: string
}

export interface Chat {
  u: UserUID[]
  f?: 1 | 0
  c?: { [key: string]: ChatObject }
}

export interface Group extends Chat {
  o: string
  n: string
  i?: string
  t?: string
  b?: number[]
  l?: string
}

interface PostCommentObject {
  u: UserUID
  txt: string
  ts: string
}

export interface Post {
  u: UserUID
  ts: string
  i: string
  l?: string[]
  txt?: string
  c?: { [key: string]: PostCommentObject }
}

export interface Call {
  t: 1 | 0
  o: number
  st: 0
  u: Array<{ id: UserUID; j: boolean }>
}

export type Databases = {
  u: { [key: string]: UserFixed | UserTemp }
  t: { [key: string]: TemporaryAuth }
  c: { [key: string]: Chat }
  g: { [key: string]: Group }
  p: { [key: string]: Post }
  v: { [key: string]: Call }
}
