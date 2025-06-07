// import fs from "fs"
import { IMessageWriter } from "../../client/types/message.types"
// import db from "../main/db"
// import cfg from "../main/cfg"
import { IRepBackRec } from "../types/validate.types"

export function sendMessage(uid: string, s: IMessageWriter): IRepBackRec {
  console.log(uid)
  console.log(s)
  return { code: 200 }
}
