import fs from "fs"

export function userFile(imgsrc: string) {
  if (!fs.existsSync(`./server/stg/user/${imgsrc}`)) return null
  return `./server/stg/user/${imgsrc}`
}
