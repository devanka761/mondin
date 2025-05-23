import db from "../main/db"
import { UserProfile } from "../types/profile.types"

function isFriend(uid: string, userid: string): number {
  const cdb = db.ref.c
  const isfriend = Object.values(cdb).find(ch => ch.u.includes(uid) && ch.u.includes(userid))
  if (isfriend) return 1
  const udb = db.ref.u
  if (udb[userid].req?.includes(uid)) return 2
  if (udb[uid].req?.includes(userid)) return 3
  return 0
}

export function getUser(uid: string, userid: string) {
  const udb = db.ref.u[userid]
  const data: UserProfile = {
    id: udb.id,
    username: <string>udb.uname,
    displayname: <string>udb.dname,
    isFriend: isFriend(uid, userid)
  }
  if (udb.b) data.badges = udb.b
  if (udb.bio) data.bio = udb.bio
  if (udb.img) data.image = udb.img
  return data
}

export function searchUser(uid: string, userid: string) {
  const udb = db.ref.u
  const users = Object.values(udb)
    .filter(usr => {
      return usr.id !== uid && (usr.id === userid || usr.uname?.includes(userid))
    })
    .map(usr => getUser(uid, usr.id))

  if (users.length < 1) return { code: 404, msg: "FIND_NOTFOUND" }
  return { code: 200, data: { users } }
}
