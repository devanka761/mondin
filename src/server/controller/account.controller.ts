import { MeDB } from "../../client/types/db.types"
import db from "../main/db"
import { AccountDB } from "../types/account.types"

export function getMe(uid: string): { code: number; data?: AccountDB } {
  const udb = db.ref.u[uid]
  if (!udb) return { code: 400 }

  const meData: MeDB = {}
  meData.id = udb.id
  meData.image = udb.img
  meData.username = udb.uname
  meData.displayname = udb.dname
  meData.bio = udb.bio
  meData.badges = udb.b
  meData.email = udb.data.map((usr) => {
    return { email: <string>usr.email, provider: <string>usr.provider }
  })

  const data: AccountDB = {
    me: meData
  }
  return { code: 200, data }
}
