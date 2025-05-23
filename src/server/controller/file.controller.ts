import fs from "fs"

export function user(imgsrc: string) {
  if (!fs.existsSync(`./server/stg/user/${imgsrc}`)) return null
  return `./server/stg/user/${imgsrc}`
}
